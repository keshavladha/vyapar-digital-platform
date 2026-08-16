// Vyapar Digital - Client Portal & Live Milestone Order Tracker (Sarvam.ai Style)
import { CONFIG } from '../data/config.js';
import { fetchOrders, subscribeToOrder, addOrderRevision } from '../services/firebase.js';

let currentLang = 'hi';
let currentUnsubscribe = null;

const DEFAULT_ORDERS = [
  {
    trackingId: 'VD-IND-8421',
    clientName: 'Rajesh Agarwal',
    businessName: 'Bikaner Sweets & Namkeen',
    city: 'Alwar',
    packageName: 'WhatsApp Catalog & Online Store',
    estimatedPrice: 4999,
    status: 'Final Polish & Review',
    stageIndex: 4, // 1 to 5
    createdAt: '2026-08-14',
    deliveryDate: '2026-08-18',
    revisions: ['Added new Gulab Jamun photos', 'Updated special festival discount price']
  },
  {
    trackingId: 'VD-IND-6190',
    clientName: 'Dharmendra Singh',
    businessName: 'Lakshya Defense Academy',
    city: 'Rohtak',
    packageName: 'Coaching & Test Series Android App',
    estimatedPrice: 14999,
    status: 'Play Store Review & Final Handover',
    stageIndex: 5,
    createdAt: '2026-08-05',
    deliveryDate: '2026-08-16',
    revisions: ['Added Haryana CET Mock Test 5 & 6']
  }
];

const STAGES = [
  { index: 1, nameEn: 'Order & Brief', nameHi: 'आर्डर & ब्रीफ', descHi: 'आवश्यकताएं और डिटेल्स प्राप्त' },
  { index: 2, nameEn: 'Draft & Design', nameHi: 'ड्राफ्ट & डिजाइन', descHi: 'कच्चा ढांचा व लेआउट तैयार' },
  { index: 3, nameEn: 'Build & Edit', nameHi: 'बिल्ड & कोडिंग', descHi: 'वेबसाइट/ऐप निर्माण जारी' },
  { index: 4, nameEn: 'Client Review', nameHi: 'रिव्यु & बदलाव', descHi: 'ग्राहक द्वारा अंतिम जांच' },
  { index: 5, nameEn: 'Live & Delivered', nameHi: 'लाइव & डिलीवरी', descHi: 'प्रोजेक्ट पूर्ण व लाइव' }
];

export function initClientPortal(lang = 'hi') {
  currentLang = lang;
  seedInitialOrders();
  renderTracker();

  // Fetch orders from Firebase Cloud
  fetchOrders().then((orders) => {
    if (orders && orders.length) {
      const input = document.getElementById('tracker-input');
      const currentId = input ? input.value : null;
      renderTracker(currentId);
    }
  });

  // Listen for trackOrder event
  window.addEventListener('trackOrder', (e) => {
    if (e.detail && e.detail.trackingId) {
      renderTracker(e.detail.trackingId);
    }
  });
}

export function updateClientPortalLang(lang) {
  currentLang = lang;
  const input = document.getElementById('tracker-input');
  const currentId = input ? input.value : null;
  renderTracker(currentId);
}

function seedInitialOrders() {
  const existing = localStorage.getItem('vyapar_digital_orders');
  if (!existing) {
    localStorage.setItem('vyapar_digital_orders', JSON.stringify(DEFAULT_ORDERS));
  }
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
  } catch (e) {
    return DEFAULT_ORDERS;
  }
}

function renderTracker(searchId = 'VD-IND-8421') {
  const container = document.getElementById('tracker-container');
  if (!container) return;

  const isHi = currentLang === 'hi';
  const orders = getOrders();
  const matchedOrder = orders.find(o => o.trackingId?.toUpperCase() === searchId?.toUpperCase()) || orders[0];

  container.innerHTML = `
    <div class="tracker-main-container">
      <!-- Tracker Search Header -->
      <div class="tracker-search-wrap">
        <div class="tracker-search-box">
          <i data-lucide="search" class="tracker-search-icon"></i>
          <input type="text" id="tracker-input" class="tracker-search-input" value="${matchedOrder ? matchedOrder.trackingId : (searchId || '')}" placeholder="${isHi ? 'अपना ट्रैकिंग ID डालें (उदा: VD-IND-8421)...' : 'Enter Tracking ID (e.g. VD-IND-8421)...'}">
          <button class="btn btn-saffron tracker-search-submit" id="tracker-search-btn">
            <span>${isHi ? 'ट्रैक करें' : 'Track Status'}</span> →
          </button>
        </div>
        <div class="tracker-sample-hint">
          <span>💡 ${isHi ? 'डेमो ट्रैकिंग ID क्लिक करें:' : 'Try Sample Tracking IDs:'}</span>
          <button class="tracker-chip-btn" data-demo-id="VD-IND-8421">VD-IND-8421 (मिठाई स्टोर)</button>
          <button class="tracker-chip-btn" data-demo-id="VD-IND-6190">VD-IND-6190 (एकेडमी ऐप)</button>
        </div>
      </div>

      <!-- Order Details Live Card -->
      ${matchedOrder ? renderOrderDetails(matchedOrder) : `
        <div class="tracker-empty-state">
          <div class="tracker-empty-icon">🔍</div>
          <h3>${isHi ? 'कोई प्रोजेक्ट नहीं मिला' : 'No Project Found'}</h3>
          <p>${isHi ? 'कृपया सही ट्रैकिंग ID दर्ज करें या व्हाट्सएप पर संपर्क करें।' : 'Please enter a valid Tracking ID or contact support on WhatsApp.'}</p>
        </div>
      `}
    </div>
  `;

  // Attach search events
  const searchBtn = container.querySelector('#tracker-search-btn');
  const input = container.querySelector('#tracker-input');
  if (searchBtn && input) {
    searchBtn.addEventListener('click', () => {
      renderTracker(input.value.trim());
    });
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        renderTracker(input.value.trim());
      }
    });
  }

  // Sample ID chips click
  container.querySelectorAll('.tracker-chip-btn').forEach(chip => {
    chip.addEventListener('click', () => {
      const demoId = chip.getAttribute('data-demo-id');
      renderTracker(demoId);
    });
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
            <span>${isHi ? 'लाइव स्टेटस:' : 'Status:'} <strong>${order.status}</strong></span>
          </div>
          <h3 class="tracker-biz-name">${order.businessName || order.clientName}</h3>
          <div class="tracker-pkg-title">
            <span class="t-icon">📦</span>
            <span>${order.packageName} (${order.city ? order.city : 'India'})</span>
          </div>
        </div>

        <div class="tracker-header-right">
          <div class="tracker-id-label">${isHi ? 'ऑर्डर ट्रैकिंग कोड' : 'Tracking Code'}</div>
          <div class="tracker-id-pill">${order.trackingId}</div>
          <div class="tracker-date-sub">${isHi ? 'डिलीवरी अनुमानित:' : 'Est. Delivery:'} <strong>${order.deliveryDate || '48 Hours'}</strong></div>
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
                <span class="h-text">${r}</span>
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
