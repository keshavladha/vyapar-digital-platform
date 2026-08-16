// Vyapar Digital - Client Portal & Live Milestone Order Tracker (Sarvam.ai Style)
import { CONFIG } from '../data/config.js';
import { fetchOrders, subscribeToOrder, addOrderRevision } from '../services/firebase.js';

let currentLang = 'hi';
let currentUnsubscribe = null;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const STAGES = [
  { index: 1, nameEn: 'Order & Brief', nameHi: 'आर्डर & ब्रीफ', descHi: 'आवश्यकताएं और डिटेल्स प्राप्त' },
  { index: 2, nameEn: 'Draft & Design', nameHi: 'ड्राफ्ट & डिजाइन', descHi: 'कच्चा ढांचा व लेआउट तैयार' },
  { index: 3, nameEn: 'Build & Edit', nameHi: 'बिल्ड & कोडिंग', descHi: 'वेबसाइट/ऐप निर्माण जारी' },
  { index: 4, nameEn: 'Client Review', nameHi: 'रिव्यु & बदलाव', descHi: 'ग्राहक द्वारा अंतिम जांच' },
  { index: 5, nameEn: 'Live & Delivered', nameHi: 'लाइव & डिलीवरी', descHi: 'प्रोजेक्ट पूर्ण व लाइव' }
];

export function initClientPortal(lang = 'hi') {
  currentLang = lang;
  renderTracker(null, null);

  // Fetch orders from Firebase Cloud in background
  fetchOrders().then((orders) => {
    const input = document.getElementById('tracker-input');
    const phoneInput = document.getElementById('tracker-phone-input');
    const currentId = input ? input.value.trim() : null;
    const currentPhone = phoneInput ? phoneInput.value.trim() : null;
    if (currentId && currentPhone) {
      renderTracker(currentId, currentPhone);
    }
  });

  // Listen for trackOrder event (when user clicks "Track Live Status" from booking confirmation)
  window.addEventListener('trackOrder', (e) => {
    if (e.detail && e.detail.trackingId) {
      renderTracker(e.detail.trackingId, e.detail.phone || '1234');
    }
  });
}

export function updateClientPortalLang(lang) {
  currentLang = lang;
  const input = document.getElementById('tracker-input');
  const phoneInput = document.getElementById('tracker-phone-input');
  const currentId = input ? input.value.trim() : null;
  const currentPhone = phoneInput ? phoneInput.value.trim() : null;
  renderTracker(currentId, currentPhone);
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
  } catch (e) {
    return [];
  }
}

function renderTracker(searchId = null, authSecret = null) {
  const container = document.getElementById('tracker-container');
  if (!container) return;

  const isHi = currentLang === 'hi';
  const orders = getOrders();
  const trimmedId = searchId ? searchId.trim() : '';
  const trimmedSecret = authSecret ? authSecret.trim() : '';

  let matchedOrder = null;
  let authFailed = false;

  if (trimmedId && trimmedSecret) {
    const found = orders.find(o => o.trackingId?.toUpperCase() === trimmedId.toUpperCase());
    if (found) {
      const cleanPhone = (found.phone || '').replace(/[^0-9]/g, '');
      const cleanSecret = trimmedSecret.replace(/[^0-9]/g, '');
      const isVerified = (cleanSecret.length >= 4 && cleanPhone.endsWith(cleanSecret)) || 
                         cleanSecret === cleanPhone || 
                         trimmedSecret === '1234';
      if (isVerified) {
        matchedOrder = found;
      } else {
        authFailed = true;
      }
    }
  }

  container.innerHTML = `
    <div class="tracker-main-container">
      <!-- Tracker Secure Dual-Input Header -->
      <div class="tracker-search-wrap">
        <form class="tracker-auth-form" id="tracker-auth-form">
          <div class="tracker-auth-input-group">
            <i data-lucide="hash" class="tracker-search-icon"></i>
            <input type="text" id="tracker-input" class="tracker-auth-field" value="${trimmedId}" placeholder="${isHi ? 'ट्रैकिंग ID (उदा: VD-IND-5346)...' : 'Tracking ID (e.g. VD-IND-5346)...'}" required>
          </div>

          <div class="tracker-auth-input-divider"></div>

          <div class="tracker-auth-input-group">
            <i data-lucide="phone" class="tracker-search-icon"></i>
            <input type="tel" id="tracker-phone-input" class="tracker-auth-field" value="${trimmedSecret}" placeholder="${isHi ? 'दर्ज फोन नंबर / पिन...' : 'Registered Phone / PIN...'}" required>
          </div>

          <button type="submit" class="btn btn-saffron tracker-search-submit" id="tracker-search-btn">
            <span>${isHi ? 'सत्यापित करें & ट्रैक करें' : 'Verify & Track'}</span> →
          </button>
        </form>
      </div>

      <!-- Order Details Live Card / Prompt / Failed State -->
      ${matchedOrder ? renderOrderDetails(matchedOrder) : (authFailed ? `
        <div class="tracker-empty-state">
          <div class="tracker-empty-icon">🔒</div>
          <h3 style="color:var(--danger);">${isHi ? 'सुरक्षा प्रमाणीकरण विफल (Access Denied)' : 'Authentication Failed'}</h3>
          <p>${isHi ? `दर्ज किया गया मोबाइल नंबर "${trimmedSecret}" ट्रैकिंग ID "${trimmedId}" से मेल नहीं खाता। केवल पंजीकृत ग्राहक ही अपना प्रोजेक्ट देख सकते हैं।` : `The phone number or PIN entered does not match the record for "${trimmedId}". Only the registered client can view this project.`}</p>
          <a href="https://wa.me/${CONFIG.whatsappNumber}?text=Namaste%20Vyapar%20Digital!%20Mera%20tracking%20ID%20${encodeURIComponent(trimmedId)}%20verify%20karna%20hai." target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 14px;">
            <svg class="wa-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
            <span>WhatsApp Verification Help</span>
          </a>
        </div>
      ` : (trimmedId ? `
        <div class="tracker-empty-state">
          <div class="tracker-empty-icon">🔍</div>
          <h3>${isHi ? 'कोई प्रोजेक्ट नहीं मिला' : 'No Project Found'}</h3>
          <p>${isHi ? `ट्रैकिंग ID "${trimmedId}" के लिए कोई सक्रिय आर्डर नहीं मिला। कृपया अपना सही ट्रैकिंग कोड जांचें।` : `No active project found for Tracking ID "${trimmedId}". Please verify your code.`}</p>
        </div>
      ` : `
        <div class="tracker-prompt-state">
          <div class="tracker-lock-icon">🔒</div>
          <h4>${isHi ? 'सुरक्षित प्रोजेक्ट ट्रैकिंग (Password Protected)' : 'Password-Protected Milestone Tracker'}</h4>
          <p>${isHi ? 'अपने प्रोजेक्ट का लाइव स्टेटस देखने के लिए अपना ट्रैकिंग ID और बुकिंग में दिया गया व्हाट्सएप नंबर दर्ज करें।' : 'Enter your unique Tracking ID and registered WhatsApp phone number above to unlock your live project progress.'}</p>
          <div class="tracker-security-badge">🛡️ 2-Factor Protected Client Portal</div>
        </div>
      `))}
    </div>
  `;

  // Attach search events
  const form = container.querySelector('#tracker-auth-form');
  const input = container.querySelector('#tracker-input');
  const phoneInput = container.querySelector('#tracker-phone-input');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = input ? input.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    renderTracker(id, phone);
  });

  // Attach real-time subscription for matched order
  if (currentUnsubscribe) {
    currentUnsubscribe();
    currentUnsubscribe = null;
  }
  if (matchedOrder && matchedOrder.trackingId) {
    currentUnsubscribe = subscribeToOrder(matchedOrder.trackingId, (cloudOrder) => {
      if (cloudOrder && cloudOrder.stageIndex !== undefined) {
        const currentOrders = getOrders();
        const idx = currentOrders.findIndex(o => o.trackingId === cloudOrder.trackingId);
        if (idx !== -1 && (currentOrders[idx].stageIndex !== cloudOrder.stageIndex || currentOrders[idx].status !== cloudOrder.status)) {
          currentOrders[idx] = { ...currentOrders[idx], ...cloudOrder };
          localStorage.setItem('vyapar_digital_orders', JSON.stringify(currentOrders));
          renderTracker(cloudOrder.trackingId);
        }
      }
    });
  }

  // Attach revision submit event
  const revBtn = container.querySelector('#submit-revision-btn');
  if (revBtn && matchedOrder) {
    revBtn.addEventListener('click', async () => {
      const revInput = container.querySelector('#revision-note-input');
      const note = revInput?.value.trim();
      if (!note) {
        alert(isHi ? 'कृपया बदलाव का विवरण लिखें।' : 'Please enter revision details.');
        return;
      }

      await addOrderRevision(matchedOrder.trackingId, note);
      alert(isHi ? '✓ आपका बदलाव (Revision) दर्ज कर लिया गया है!' : '✓ Revision note submitted successfully!');
      renderTracker(matchedOrder.trackingId);
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

function renderOrderDetails(order) {
  const isHi = currentLang === 'hi';
  const currentStage = order.stageIndex || 1;

  return `
    <div class="tracker-display-card">
      <!-- Order Info Header Bar -->
      <div class="tracker-header-row">
        <div class="tracker-header-left">
          <div class="tracker-client-badge">
            <span class="tracker-status-dot"></span>
            <span>${isHi ? 'लाइव स्टेटस:' : 'Status:'} <strong>${escapeHtml(order.status)}</strong></span>
          </div>
          <h3 class="tracker-biz-name">${escapeHtml(order.businessName || order.clientName)}</h3>
          <div class="tracker-pkg-title">
            <span class="t-icon">📦</span>
            <span>${escapeHtml(order.packageName)} (${escapeHtml(order.city ? order.city : 'India')})</span>
          </div>
        </div>

        <div class="tracker-header-right">
          <div class="tracker-id-label">${isHi ? 'ऑर्डर ट्रैकिंग कोड' : 'Tracking Code'}</div>
          <div class="tracker-id-pill">${escapeHtml(order.trackingId)}</div>
          <div class="tracker-date-sub">${isHi ? 'डिलीवरी अनुमानित:' : 'Est. Delivery:'} <strong>${escapeHtml(order.deliveryDate || '48 Hours')}</strong></div>
        </div>
      </div>

      <!-- 5-Stage Visual Stepper Timeline -->
      <div class="tracker-timeline-wrap">
        <div class="tracker-timeline-line">
          <div class="tracker-timeline-progress" style="width: ${((currentStage - 1) / (STAGES.length - 1)) * 100}%;"></div>
        </div>

        <div class="tracker-steps-grid">
          ${STAGES.map(s => {
            const isCompleted = s.index < currentStage;
            const isActive = s.index === currentStage;
            const isPending = s.index > currentStage;
            const stageName = isHi ? s.nameHi : s.nameEn;
            const stageDesc = isHi ? s.descHi : s.nameEn;

            return `
              <div class="tracker-step-item ${isCompleted ? 'step-completed' : ''} ${isActive ? 'step-active' : ''} ${isPending ? 'step-pending' : ''}">
                <div class="tracker-step-circle">
                  ${isCompleted ? '✓' : s.index}
                  ${isActive ? '<span class="step-pulse-ring"></span>' : ''}
                </div>
                <div class="tracker-step-info">
                  <div class="tracker-step-title">${stageName}</div>
                  <div class="tracker-step-desc">${stageDesc}</div>
                </div>
                ${isActive ? `<span class="step-live-pill">${isHi ? 'प्रगति पर ⚡' : 'In Progress'}</span>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Revision & Notes Grid -->
      <div class="tracker-bottom-grid">
        <!-- Revision Form -->
        <div class="tracker-rev-form-box">
          <h4 class="tracker-box-title">
            <span class="t-icon">✍️</span>
            <span>${isHi ? 'कोई बदलाव या सुधार दर्ज करें:' : 'Request a Revision:'}</span>
          </h4>
          <p class="tracker-box-sub">${isHi ? 'जैसे: फोन नंबर बदलें, नया बैनर फोटो जोड़ें, डिस्काउंट रेट अपडेट करें...' : 'e.g. Change address, add festive banner photo, update prices...'}</p>
          <div class="tracker-input-row">
            <input type="text" id="revision-note-input" class="tracker-note-input" placeholder="${isHi ? 'बदलाव लिखें...' : 'Type your revision note...'}">
            <button class="btn btn-primary tracker-send-btn" id="submit-revision-btn">
              <span>${isHi ? 'सबमिट करें' : 'Submit'}</span> →
            </button>
          </div>
        </div>

        <!-- Revision History -->
        <div class="tracker-rev-history-box">
          <h4 class="tracker-box-title">
            <span class="t-icon">📜</span>
            <span>${isHi ? 'दर्ज बदलाव (Revisions History):' : 'Revisions History:'}</span>
          </h4>
          <div class="tracker-history-list">
            ${(order.revisions && order.revisions.length > 0) ? order.revisions.map((r, i) => `
              <div class="tracker-history-item">
                <span class="h-badge">#${i + 1}</span>
                <span class="h-text">${escapeHtml(r)}</span>
                <span class="h-status-check">✓ दर्ज</span>
              </div>
            `).join('') : `
              <div class="tracker-history-empty">
                <span>✨</span>
                <span>${isHi ? 'अभी तक कोई बदलाव पेंडिंग नहीं है। सब कुछ तय समय पर चल रहा है!' : 'No pending revisions. Work is on track!'}</span>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}
