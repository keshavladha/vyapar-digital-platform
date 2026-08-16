// Vyapar Digital - Agency Command Center Controller (English / Sarvam Theme)
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
  restoreTheme();
  setupThemeToggle();
  initAdminAuth();
  if (window.lucide) window.lucide.createIcons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// ═══════════════ THEME TOGGLE ═══════════════
function restoreTheme() {
  const savedTheme = localStorage.getItem('vyapar_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  toggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('vyapar_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    if (window.lucide) window.lucide.createIcons();
  }
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
        errorEl.textContent = '❌ Invalid PIN. Please enter the correct 4-digit code (1234).';
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
  setupDrawerClose();

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

  const elTotal = document.getElementById('stat-total-orders');
  const elActive = document.getElementById('stat-active-orders');
  const elDelivered = document.getElementById('stat-delivered-orders');
  const elRev = document.getElementById('stat-total-rev');

  if (elTotal) elTotal.textContent = totalOrders;
  if (elActive) elActive.textContent = activeOrders;
  if (elDelivered) elDelivered.textContent = deliveredOrders;
  if (elRev) elRev.textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
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
      colList.innerHTML = `<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:0.8rem;">No projects in this stage</div>`;
      continue;
    }

    colList.innerHTML = stageOrders.map(order => {
      const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
      const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : (cleanPhone || '917027340360');
      const waMsg = encodeURIComponent(
        `*Namaste ${order.clientName || ''}!*\n\n` +
        `Thank you for choosing Vyapar Digital. Here is your project update for *"${order.businessName || ''}"*:\n\n` +
        `📌 *Official Tracking ID:* ${order.trackingId}\n` +
        `🛠️ *Package:* ${order.packageName}\n` +
        `💰 *Package Rate:* ₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}\n\n` +
        `Track live milestone progress anytime on our portal: https://vyapardigital.vercel.app/#tracker\n\n` +
        `Please confirm to proceed with the next milestone.`
      );

      return `
        <div class="kanban-card" data-tid="${order.trackingId}">
          <div class="card-top">
            <span class="card-tid">${order.trackingId}</span>
            <span class="card-price">₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}</span>
          </div>

          <div class="card-biz-name">${order.businessName || 'Client Project'}</div>
          
          <div class="card-client-meta">
            <span>👤 ${order.clientName || 'Client'}</span>
            <span>•</span>
            <span>📍 ${order.city || 'India'}</span>
          </div>

          <div class="card-badges-row">
            <span class="card-service-tag">${order.packageName || 'Web Package'}</span>
            ${order.revisions && order.revisions.length > 0 ? `
              <span class="rev-pill-badge" title="${order.revisions.length} Revision Requests">
                ⚡ ${order.revisions.length} Revision${order.revisions.length > 1 ? 's' : ''}
              </span>
            ` : ''}
            ${order.details ? `
              <span class="card-service-tag" style="background:var(--bg-main);color:var(--text-muted);border:1px solid var(--border);">
                📝 Note
              </span>
            ` : ''}
          </div>

          <div class="card-actions" onclick="event.stopPropagation()">
            <select class="stage-select-dropdown" data-tid="${order.trackingId}">
              <option value="1" ${order.stageIndex === 1 ? 'selected' : ''}>1. Brief</option>
              <option value="2" ${order.stageIndex === 2 ? 'selected' : ''}>2. Draft</option>
              <option value="3" ${order.stageIndex === 3 ? 'selected' : ''}>3. Build</option>
              <option value="4" ${order.stageIndex === 4 ? 'selected' : ''}>4. Review</option>
              <option value="5" ${order.stageIndex === 5 ? 'selected' : ''}>5. Live ✅</option>
            </select>

            <a href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" class="card-wa-btn" title="Send Official Tracking ID & Update on WhatsApp">
              <svg class="wa-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Attach card click event to open slide-out project drawer
  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('click', () => {
      const tid = card.getAttribute('data-tid');
      openProjectDrawer(tid);
    });
  });

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

// ═══════════════ PROJECT DETAILS DRAWER ═══════════════
function openProjectDrawer(trackingId) {
  const order = allOrders.find(o => o.trackingId === trackingId);
  if (!order) return;

  const overlay = document.getElementById('project-drawer-overlay');
  const body = document.getElementById('drawer-body-content');
  const tidEl = document.getElementById('drawer-tid');
  const nameEl = document.getElementById('drawer-biz-name');

  if (tidEl) tidEl.textContent = order.trackingId;
  if (nameEl) nameEl.textContent = order.businessName || 'Client Project';

  const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
  const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : (cleanPhone || '917027340360');
  const waMsg = encodeURIComponent(
    `*Namaste ${order.clientName || ''}!*\n\n` +
    `Here is your project update for *"${order.businessName || ''}"*:\n\n` +
    `📌 *Official Tracking ID:* ${order.trackingId}\n` +
    `🛠️ *Package:* ${order.packageName}\n` +
    `💰 *Package Rate:* ₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}\n\n` +
    `Track live milestone progress anytime on our portal: https://vyapardigital.vercel.app/#tracker\n\n` +
    `Please confirm to proceed with the next milestone.`
  );

  body.innerHTML = `
    <!-- Client Info Summary Grid -->
    <div class="drawer-info-grid">
      <div class="drawer-info-item">
        <span class="drawer-info-label">Client Name</span>
        <span class="drawer-info-value">${order.clientName || 'Client'}</span>
      </div>
      <div class="drawer-info-item">
        <span class="drawer-info-label">WhatsApp Contact</span>
        <span class="drawer-info-value" style="color:var(--primary);">📞 ${order.phone || '-'}</span>
      </div>
      <div class="drawer-info-item">
        <span class="drawer-info-label">Location</span>
        <span class="drawer-info-value">${order.city || 'India'}</span>
      </div>
      <div class="drawer-info-item">
        <span class="drawer-info-label">Agreed Budget</span>
        <span class="drawer-info-value" style="color:var(--whatsapp);">₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}</span>
      </div>
      <div class="drawer-info-item" style="grid-column: span 2;">
        <span class="drawer-info-label">Service Package</span>
        <span class="drawer-info-value">${order.packageName || 'Web Package'}</span>
      </div>
    </div>

    <!-- Original Project Requirements -->
    <div class="drawer-section">
      <div class="drawer-section-title">
        <i data-lucide="file-text" style="width: 16px; height: 16px; color: var(--primary);"></i>
        <span>Original Project Requirements & Brief</span>
      </div>
      <div class="drawer-notes-box">
        ${order.details || 'No special instructions submitted by client.'}
      </div>
    </div>

    <!-- Client Revisions Timeline -->
    <div class="drawer-section">
      <div class="drawer-section-title">
        <i data-lucide="bell-ring" style="width: 16px; height: 16px; color: var(--saffron);"></i>
        <span>Client Revision Requests (${order.revisions ? order.revisions.length : 0})</span>
      </div>
      <div class="drawer-revisions-container">
        ${order.revisions && order.revisions.length > 0 ? order.revisions.map((rev, i) => `
          <div class="drawer-rev-card">
            <div class="drawer-rev-header">
              <span>REVISION REQUEST #${i + 1}</span>
            </div>
            <div class="drawer-rev-text">${rev}</div>
          </div>
        `).join('') : `
          <div style="background:var(--bg-main);border:1px dashed var(--border);border-radius:var(--radius-sm);padding:16px;text-align:center;font-size:0.8rem;color:var(--text-muted);">
            ✓ No pending revisions from client.
          </div>
        `}
      </div>
    </div>

    <!-- Quick WhatsApp Action Button -->
    <div style="display:flex;gap:10px;margin-top:auto;padding-top:14px;">
      <a href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" class="btn-login" style="flex:1;text-decoration:none;background:var(--whatsapp);gap:8px;">
        <svg class="wa-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
        <span>Send WhatsApp Update</span>
      </a>
    </div>
  `;

  overlay?.classList.add('active');
  if (window.lucide) window.lucide.createIcons();
}

function setupDrawerClose() {
  const overlay = document.getElementById('project-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');

  closeBtn?.addEventListener('click', () => overlay?.classList.remove('active'));
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('active')) {
      overlay.classList.remove('active');
    }
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
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:36px;color:var(--text-muted);">No records found matching your search.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(order => {
    const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? '91' + cleanPhone : (cleanPhone || '917027340360');

    return `
      <tr>
        <td><span class="card-tid">${order.trackingId}</span></td>
        <td>
          <div style="font-weight:800;color:var(--text-primary);">${order.businessName || 'Business'}</div>
          <div style="font-size:0.76rem;color:var(--text-muted);">${order.city || 'India'}</div>
        </td>
        <td>
          <div style="font-weight:600;">${order.clientName || 'Client'}</div>
          <div style="font-size:0.76rem;color:var(--primary);">📞 ${order.phone || '-'}</div>
        </td>
        <td><span class="card-service-tag">${order.packageName}</span></td>
        <td style="font-weight:800;color:var(--whatsapp);">₹${(Number(order.estimatedPrice) || 0).toLocaleString('en-IN')}</td>
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
          ${order.revisions && order.revisions.length > 0 
            ? `<span class="rev-badge" title="${order.revisions.join(' | ')}">⚡ ${order.revisions.length} Request${order.revisions.length > 1 ? 's' : ''}</span>` 
            : `<span style="color:var(--text-muted);font-size:0.8rem;">None</span>`}
        </td>
        <td style="text-align: center;">
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
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted);">No rate calculator leads recorded yet.</div>`;
    return;
  }

  container.innerHTML = allQuotes.map(q => `
    <div class="quote-card">
      <div class="quote-card-header">
        <span class="quote-biz-pill">${q.businessType || 'Local Business'}</span>
        <span style="font-weight:800;color:var(--whatsapp);">₹${(Number(q.totalEstimatedPrice) || 0).toLocaleString('en-IN')}</span>
      </div>
      <div style="font-size:0.8rem;color:var(--text-muted);">${q.quoteId || 'Calculator Inquiry'}</div>
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
    alert(`✓ Project created and synced successfully! Tracking ID: ${newOrder.trackingId}`);
  });
}
