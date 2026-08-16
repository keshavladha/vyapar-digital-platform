// Vyapar Digital - Admin CRM & Agency Management Dashboard
let currentLang = 'hi';

export function initAdminDashboard(lang = 'hi') {
  currentLang = lang;
  renderAdminModal();

  window.addEventListener('openAdminModal', () => {
    const modal = document.getElementById('admin-modal-overlay');
    if (modal) {
      modal.classList.add('active');
      renderAdminContent();
    }
  });
}

export function updateAdminLang(lang) {
  currentLang = lang;
  renderAdminContent();
}

function renderAdminModal() {
  const container = document.getElementById('admin-modal-container');
  if (!container) return;

  container.innerHTML = `
    <div class="modal-overlay" id="admin-modal-overlay">
      <div class="modal-content">
        <button class="modal-close" id="admin-modal-close">
          <i data-lucide="x" style="width: 18px; height: 18px;"></i>
        </button>
        <div id="admin-modal-body"></div>
      </div>
    </div>
  `;

  const closeBtn = container.querySelector('#admin-modal-close');
  const overlay = container.querySelector('#admin-modal-overlay');
  
  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

function renderAdminContent() {
  const body = document.getElementById('admin-modal-body');
  if (!body) return;

  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.estimatedPrice || 0), 0);
  const activeCount = orders.filter(o => (o.stageIndex || 1) < 5).length;
  const completedCount = orders.filter(o => (o.stageIndex || 1) >= 5).length;

  body.innerHTML = `
    <div style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div>
        <span class="badge badge-saffron">Admin Panel</span>
        <h2 style="font-size: 1.8rem; margin-top: 6px;">${currentLang === 'hi' ? 'एजेंसी प्रबंधन & ऑर्डर्स CRM' : 'Agency Orders & Leads CRM'}</h2>
      </div>
      <button class="btn btn-outline btn-sm" id="reset-orders-btn">
        <i data-lucide="rotate-ccw" style="width: 14px; height: 14px;"></i>
        <span>Reset Demo Data</span>
      </button>
    </div>

    <!-- Stats Banner -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px;">
      <div style="background: rgba(37, 99, 235, 0.1); border: 1px solid var(--primary-glow); padding: 16px; border-radius: var(--radius-md);">
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${currentLang === 'hi' ? 'कुल पाइपलाइन रेवेन्यू' : 'Total Revenue'}</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--saffron);">₹${totalRevenue.toLocaleString('en-IN')}</div>
      </div>
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--whatsapp-glow); padding: 16px; border-radius: var(--radius-md);">
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${currentLang === 'hi' ? 'सक्रिय प्रोजेक्ट्स' : 'Active Projects'}</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--whatsapp);">${activeCount}</div>
      </div>
      <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); padding: 16px; border-radius: var(--radius-md);">
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${currentLang === 'hi' ? 'डिलीवर किए गए' : 'Delivered'}</div>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--purple);">${completedCount}</div>
      </div>
    </div>

    <!-- Orders Table -->
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--glass-border); color: var(--text-muted);">
            <th style="padding: 10px;">ID</th>
            <th style="padding: 10px;">Client / Business</th>
            <th style="padding: 10px;">Service</th>
            <th style="padding: 10px;">Amount</th>
            <th style="padding: 10px;">Stage Status</th>
            <th style="padding: 10px; text-align: center;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map((o, idx) => `
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
              <td style="padding: 12px 10px; font-weight: 700; font-family: monospace; color: var(--saffron);">${o.trackingId}</td>
              <td style="padding: 12px 10px;">
                <div style="font-weight: 700; color: #FFF;">${o.businessName || o.clientName}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${o.clientName} • ${o.city || 'India'}</div>
              </td>
              <td style="padding: 12px 10px; color: var(--text-secondary);">${o.packageName}</td>
              <td style="padding: 12px 10px; font-weight: 700; color: var(--text-primary);">₹${(o.estimatedPrice || 0).toLocaleString('en-IN')}</td>
              <td style="padding: 12px 10px;">
                <select class="form-select admin-stage-select" data-order-idx="${idx}" style="padding: 6px 10px; font-size: 0.8rem;">
                  <option value="1" ${(o.stageIndex || 1) === 1 ? 'selected' : ''}>1. Order & Brief</option>
                  <option value="2" ${(o.stageIndex || 1) === 2 ? 'selected' : ''}>2. Draft & Concept</option>
                  <option value="3" ${(o.stageIndex || 1) === 3 ? 'selected' : ''}>3. Build & Edit</option>
                  <option value="4" ${(o.stageIndex || 1) === 4 ? 'selected' : ''}>4. Client Review</option>
                  <option value="5" ${(o.stageIndex || 1) === 5 ? 'selected' : ''}>5. Live & Delivered</option>
                </select>
              </td>
              <td style="padding: 12px 10px; text-align: center;">
                <a href="https://wa.me/${o.phone ? '91' + o.phone : '917027340360'}" target="_blank" class="btn btn-whatsapp btn-sm" title="Chat with Client">
                  <svg class="wa-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
                </a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Attach stage change events
  body.querySelectorAll('.admin-stage-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const idx = parseInt(sel.getAttribute('data-order-idx'), 10);
      const newStage = parseInt(e.target.value, 10);
      orders[idx].stageIndex = newStage;
      localStorage.setItem('vyapar_digital_orders', JSON.stringify(orders));
      renderAdminContent();
    });
  });

  // Reset demo data
  body.querySelector('#reset-orders-btn')?.addEventListener('click', () => {
    localStorage.removeItem('vyapar_digital_orders');
    location.reload();
  });

  if (window.lucide) window.lucide.createIcons();
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
  } catch (e) {
    return [];
  }
}
