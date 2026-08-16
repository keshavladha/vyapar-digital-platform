// Vyapar Digital - Admin Command Center Controller
import { db, isFirebaseReady, saveOrder, updateOrderStage, fetchOrders } from './services/firebase.js';
import { 
  collection, 
  onSnapshot, 
  getDocs, 
  query, 
  orderBy 
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

const ADMIN_PIN = '1234';

let allOrders = [];
let allQuotes = [];
let currentView = 'kanban'; // 'kanban', 'table', 'quotes'

// ═══════════════ BOOT ═══════════════
function boot() {
  initAdminAuth();
  if (window.lucide) window.lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// ═══════════════ AUTHENTICATION ═══════════════
function initAdminAuth() {
  const isAuth = sessionStorage.getItem('vyapar_admin_auth') === 'true';
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');

  if (isAuth) {
    if (loginView) loginView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'flex';
    loadDashboard();
  } else {
    if (loginView) loginView.style.display = 'flex';
    if (dashboardView) dashboardView.style.display = 'none';
    setupLoginForm();
  }

  // Logout handler
  document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem('vyapar_admin_auth');
    location.reload();
  });

  if (window.lucide) window.lucide.createIcons();
}

function setupLoginForm() {
  const form = document.getElementById('pin-form');
  const pinInput = document.getElementById('admin-pin-input');
  const errorEl = document.getElementById('login-error');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const pin = pinInput ? pinInput.value.trim() : '';

    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('vyapar_admin_auth', 'true');
      const loginView = document.getElementById('login-view');
      const dashboardView = document.getElementById('dashboard-view');
      if (loginView) loginView.style.display = 'none';
      if (dashboardView) dashboardView.style.display = 'flex';
      loadDashboard();
      if (window.lucide) window.lucide.createIcons();
    } else {
      if (errorEl) {
        errorEl.style.display = 'block';
        errorEl.textContent = '❌ गलत पिन! कृपया सही 4-अंकों का पिन (1234) डालें।';
      }
      if (pinInput) {
        pinInput.value = '';
        pinInput.focus();
      }
    }
  };

  form?.addEventListener('submit', handleLogin);
}

// ═══════════════ DASHBOARD CONTROLLER ═══════════════
function loadDashboard() {
  setupTabs();
  setupManualOrderModal();
  setupTableSearch();

  // Listen to Firestore Orders Collection in Real-Time
  if (isFirebaseReady && db) {
    try {
      const ordersCol = collection(db, 'orders');
      onSnapshot(ordersCol, (snapshot) => {
        const cloudOrders = [];
        snapshot.forEach(docSnap => {
          cloudOrders.push(docSnap.data());
        });
        allOrders = cloudOrders;
        // Mirror in local storage
        localStorage.setItem('vyapar_digital_orders', JSON.stringify(cloudOrders));
        renderMetrics();
        renderActiveView();
      }, (err) => {
        console.warn('Firestore snapshot error:', err);
        fallbackToLocalStorage();
      });

      // Fetch Quotes
      const quotesCol = collection(db, 'quotes');
      onSnapshot(quotesCol, (snapshot) => {
        const quotes = [];
        snapshot.forEach(docSnap => quotes.push(docSnap.data()));
        allQuotes = quotes;
        renderQuotes();
      });
    } catch (e) {
      fallbackToLocalStorage();
    }
  } else {
    fallbackToLocalStorage();
  }
}

function fallbackToLocalStorage() {
  try {
    allOrders = JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
  } catch (e) {
    allOrders = [];
  }
  renderMetrics();
  renderActiveView();
}

// ═══════════════ METRICS ═══════════════
function renderMetrics() {
  const totalOrders = allOrders.length;
  const activeOrders = allOrders.filter(o => (o.stageIndex || 1) < 5).length;
  const deliveredOrders = allOrders.filter(o => (o.stageIndex || 1) === 5).length;
  const totalRevenue = allOrders.reduce((sum, o) => sum + (Number(o.estimatedPrice) || 0), 0);

  document.getElementById('stat-total-orders').textContent = totalOrders;
  document.getElementById('stat-active-orders').textContent = activeOrders;
  document.getElementById('stat-delivered-orders').textContent = deliveredOrders;
  document.getElementById('stat-total-rev').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
}

// ═══════════════ VIEWS / TABS ═══════════════
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentView = tab.getAttribute('data-view');
      renderActiveView();
    });
  });
}

function renderActiveView() {
  const kanbanBoard = document.getElementById('kanban-view');
  const tableView = document.getElementById('table-view');
  const quotesView = document.getElementById('quotes-view');

  if (kanbanBoard) kanbanBoard.style.display = currentView === 'kanban' ? 'grid' : 'none';
  if (tableView) tableView.style.display = currentView === 'table' ? 'block' : 'none';
  if (quotesView) quotesView.style.display = currentView === 'quotes' ? 'grid' : 'none';

  if (currentView === 'kanban') renderKanban();
  if (currentView === 'table') renderTable();
  if (currentView === 'quotes') renderQuotes();

  if (window.lucide) window.lucide.createIcons();
}

// ═══════════════ KANBAN BOARD ═══════════════
function renderKanban() {
  for (let stage = 1; stage <= 5; stage++) {
    const colList = document.getElementById(`kanban-col-${stage}`);
    const countEl = document.getElementById(`col-count-${stage}`);
    if (!colList) continue;

    const stageOrders = allOrders.filter(o => (o.stageIndex || 1) === stage);
    if (countEl) countEl.textContent = stageOrders.length;

    if (stageOrders.length === 0) {
      colList.innerHTML = `<div style="text-align:center;padding:20px;color:var(--text-muted-dark);font-size:0.78rem;">कोई आर्डर नहीं</div>`;
      continue;
    }

    colList.innerHTML = stageOrders.map(order => {
      const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : (cleanPhone || '917027340360');
      const waMsg = encodeURIComponent(
        `*Namaste ${order.clientName || ''} ji!*\n\n` +
        `Vyapar Digital se sampark karne ke liye dhanyawad. Aapke business *"${order.businessName || ''}"* ka project update:\n\n` +
        `📌 *Official Tracking ID:* ${order.trackingId}\n` +
        `🛠️ *Service:* ${order.packageName}\n` +
        `💰 *Package Rate:* ₹${(order.estimatedPrice || 0).toLocaleString('en-IN')}\n\n` +
        `Aap website par real-time progress dekh sakte hain: https://vyapardigital.vercel.app/#tracker\n\n` +
        `Kripya aage badhane ke liye confirm karein.`
      );

      return `
        <div class="kanban-card">
          <div class="card-top">
            <span class="card-tid">${order.trackingId}</span>
            <span class="card-price">₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}</span>
          </div>

          <div class="card-biz-name">${order.businessName || 'Business Project'}</div>
          
          <div class="card-client-meta">
            <span>👤 ${order.clientName || 'Client'}</span>
            <span>•</span>
            <span>📍 ${order.city || 'India'}</span>
          </div>

          <div class="card-service-tag">${order.packageName || 'Web Package'}</div>

          ${order.details ? `
            <div class="card-notes-preview" title="${order.details}">
              📝 ${order.details}
            </div>
          ` : ''}

          <div class="card-actions">
            <select class="stage-select-dropdown" data-tid="${order.trackingId}">
              <option value="1" ${order.stageIndex === 1 ? 'selected' : ''}>1. Brief</option>
              <option value="2" ${order.stageIndex === 2 ? 'selected' : ''}>2. Draft</option>
              <option value="3" ${order.stageIndex === 3 ? 'selected' : ''}>3. Build</option>
              <option value="4" ${order.stageIndex === 4 ? 'selected' : ''}>4. Review</option>
              <option value="5" ${order.stageIndex === 5 ? 'selected' : ''}>5. Live ✅</option>
            </select>

            <a href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" class="card-wa-btn" title="Send Official Tracking ID & Update on WhatsApp">
              <svg class="wa-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Attach stage change event handlers
  document.querySelectorAll('.stage-select-dropdown').forEach(sel => {
    sel.addEventListener('change', async (e) => {
      const tid = sel.getAttribute('data-tid');
      const newStage = Number(e.target.value);
      const stageMap = {
        1: 'Order & Brief Received',
        2: 'Draft & Design Ready',
        3: 'Build & Full-Stack Coding',
        4: 'Client Review & Feedback',
        5: 'Live & Delivered'
      };
      await updateOrderStage(tid, newStage, stageMap[newStage]);
      renderMetrics();
    });
  });
}

// ═══════════════ TABLE VIEW ═══════════════
function renderTable() {
  const tbody = document.getElementById('admin-table-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('table-search-input')?.value || '').toLowerCase();
  const filtered = allOrders.filter(o => 
    (o.trackingId || '').toLowerCase().includes(searchQuery) ||
    (o.businessName || '').toLowerCase().includes(searchQuery) ||
    (o.clientName || '').toLowerCase().includes(searchQuery) ||
    (o.phone || '').includes(searchQuery)
  );

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--text-muted-dark);">कोई रिकॉर्ड नहीं मिला</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : (cleanPhone || '917027340360');

    return `
      <tr>
        <td><span class="card-tid">${order.trackingId}</span></td>
        <td>
          <div style="font-weight:800;color:#FFF;">${order.businessName || 'Business'}</div>
          <div style="font-size:0.75rem;color:var(--text-muted-dark);">${order.city || 'India'}</div>
        </td>
        <td>
          <div>${order.clientName || 'Client'}</div>
          <div style="font-size:0.75rem;color:#60A5FA;">📞 ${order.phone || '-'}</div>
        </td>
        <td><span class="card-service-tag">${order.packageName}</span></td>
        <td style="font-weight:800;color:#34D399;">₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}</td>
        <td>
          <select class="stage-select-dropdown" data-tid="${order.trackingId}">
            <option value="1" ${order.stageIndex === 1 ? 'selected' : ''}>1. Brief</option>
            <option value="2" ${order.stageIndex === 2 ? 'selected' : ''}>2. Draft</option>
            <option value="3" ${order.stageIndex === 3 ? 'selected' : ''}>3. Build</option>
            <option value="4" ${order.stageIndex === 4 ? 'selected' : ''}>4. Review</option>
            <option value="5" ${order.stageIndex === 5 ? 'selected' : ''}>5. Live ✅</option>
          </select>
        </td>
        <td>
          <a href="https://wa.me/${waPhone}" target="_blank" class="card-wa-btn" style="margin: 0 auto;">
            <svg class="wa-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function setupTableSearch() {
  document.getElementById('table-search-input')?.addEventListener('input', () => {
    if (currentView === 'table') renderTable();
  });
}

// ═══════════════ QUOTES TAB ═══════════════
function renderQuotes() {
  const container = document.getElementById('quotes-view');
  if (!container) return;

  if (allQuotes.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted-dark);">अभी तक कोई कैलकुलेटर इन्क्वायरी नहीं है</div>`;
    return;
  }

  container.innerHTML = allQuotes.map(q => `
    <div class="quote-card">
      <div class="quote-card-header">
        <span class="quote-biz-pill">${q.businessType || 'Local Business'}</span>
        <span style="font-weight:800;color:#34D399;">₹${(Number(q.totalEstimatedPrice) || 0).toLocaleString('en-IN')}</span>
      </div>
      <div style="font-size:0.8rem;color:var(--text-muted-dark);">${q.quoteId || 'Quote Lead'}</div>
      <div class="quote-items-list">
        ${(q.selectedItems || []).map(item => `<span class="quote-item-chip">✓ ${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ═══════════════ ADD MANUAL ORDER MODAL ═══════════════
function setupManualOrderModal() {
  const openBtn = document.getElementById('btn-open-add-order');
  const modal = document.getElementById('add-order-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('manual-order-form');

  openBtn?.addEventListener('click', () => modal?.classList.add('active'));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const clientName = document.getElementById('manual-client-name').value.trim();
    const businessName = document.getElementById('manual-biz-name').value.trim();
    const phone = document.getElementById('manual-phone').value.trim();
    const city = document.getElementById('manual-city').value.trim() || 'India';
    const packageName = document.getElementById('manual-package').value;
    const price = Number(document.getElementById('manual-price').value) || 1999;
    const details = document.getElementById('manual-details').value.trim();

    const newOrder = {
      trackingId: `VD-IND-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName,
      businessName,
      phone,
      city,
      packageName,
      estimatedPrice: price,
      details,
      stageIndex: 1,
      status: 'Order & Brief Received',
      createdAt: new Date().toISOString().split('T')[0],
      deliveryDate: '48 Hours'
    };

    await saveOrder(newOrder);
    form.reset();
    modal.classList.remove('active');
    alert(`✓ नया आर्डर सफलतापूर्वक दर्ज हो गया! Tracking ID: ${newOrder.trackingId}`);
  });
}
