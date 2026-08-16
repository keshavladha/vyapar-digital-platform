// Vyapar Digital - Quick Intake & Project Booking Wizard
import { CONFIG } from '../data/config.js';

let currentLang = 'hi';
let currentStep = 1;
let orderData = {
  serviceId: 'web-dev',
  packageName: 'WhatsApp Catalog & Online Store',
  estimatedPrice: 4999,
  clientName: '',
  businessName: '',
  city: '',
  phone: '',
  gstin: '',
  details: '',
  assetLink: ''
};

export function initQuickOrder(lang = 'hi') {
  currentLang = lang;
  renderQuickOrder();

  // Listen for pre-fill events from Services or Calculator
  window.addEventListener('openIntakeWizard', (e) => {
    const detail = e.detail;
    if (detail) {
      if (detail.serviceId) orderData.serviceId = detail.serviceId;
      if (detail.pkgName) orderData.packageName = detail.pkgName;
      if (detail.pkgPrice) orderData.estimatedPrice = parseInt(detail.pkgPrice, 10);
      if (detail.businessType) orderData.businessName = detail.businessType;
      if (detail.items) orderData.details = `Calculated items: ${detail.items}`;
      if (detail.totalPrice) orderData.estimatedPrice = parseInt(detail.totalPrice, 10);
    }
    currentStep = 2; // Jump straight to contact info
    renderQuickOrder();
    document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

export function updateQuickOrderLang(lang) {
  currentLang = lang;
  renderQuickOrder();
}

function renderQuickOrder() {
  const container = document.getElementById('quick-order-container');
  if (!container) return;

  container.innerHTML = `
    <div class="intake-section" id="booking-section">
      <!-- Wizard Step Indicators -->
      <div class="wizard-steps-header">
        <div class="wizard-step-indicator ${currentStep >= 1 ? 'active' : ''}">
          <div class="step-num">1</div>
          <span>${currentLang === 'hi' ? 'सेवा का चयन' : 'Select Service'}</span>
        </div>
        <div class="wizard-step-indicator ${currentStep >= 2 ? 'active' : ''}">
          <div class="step-num">2</div>
          <span>${currentLang === 'hi' ? 'व्यापार & संपर्क' : 'Business Info'}</span>
        </div>
        <div class="wizard-step-indicator ${currentStep >= 3 ? 'active' : ''}">
          <div class="step-num">3</div>
          <span>${currentLang === 'hi' ? 'पुष्टि & व्हाट्सएप' : 'Confirm & WhatsApp'}</span>
        </div>
      </div>

      <!-- Step Content -->
      ${renderCurrentStepContent()}
    </div>
  `;

  attachStepEvents(container);
  if (window.lucide) window.lucide.createIcons();
}

function renderCurrentStepContent() {
  if (currentStep === 1) {
    return `
      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 20px;">
          ${currentLang === 'hi' ? 'आप अपने व्यापार के लिए क्या शुरू करना चाहते हैं?' : 'What would you like to start for your business?'}
        </h3>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'मुख्य सर्विस' : 'Primary Service'}</label>
            <select class="form-select" id="step1-service">
              ${CONFIG.services.map(s => `
                <option value="${s.id}" ${s.id === orderData.serviceId ? 'selected' : ''}>
                  ${currentLang === 'hi' ? s.titleHi : s.titleEn}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'पैकेज या प्लान' : 'Package'}</label>
            <input type="text" class="form-input" id="step1-package" value="${orderData.packageName}" placeholder="e.g. WhatsApp Store or Custom">
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'अनुमानित बजट (₹)' : 'Estimated Budget (₹)'}</label>
            <input type="number" class="form-input" id="step1-price" value="${orderData.estimatedPrice}">
          </div>
        </div>

        <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="step1-next-btn">
            <span>${currentLang === 'hi' ? 'अगला कदम (Next)' : 'Next Step'}</span>
            <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
          </button>
        </div>
      </div>
    `;
  }

  if (currentStep === 2) {
    return `
      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 20px;">
          ${currentLang === 'hi' ? 'अपने व्यापार और संपर्क की जानकारी भरें' : 'Enter your business & contact details'}
        </h3>

        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'आपका नाम *' : 'Your Name *'}</label>
            <input type="text" class="form-input" id="step2-name" value="${orderData.clientName}" placeholder="e.g. Rajesh Kumar" required>
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'दुकान / व्यापार का नाम *' : 'Shop / Business Name *'}</label>
            <input type="text" class="form-input" id="step2-biz" value="${orderData.businessName}" placeholder="e.g. Bikaner Sweets" required>
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'शहर / कस्बा *' : 'City / Town *'}</label>
            <input type="text" class="form-input" id="step2-city" value="${orderData.city}" placeholder="e.g. Alwar, Rohtak, Gorakhpur" required>
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'व्हाट्सएप मोबाइल नंबर *' : 'WhatsApp Phone Number *'}</label>
            <input type="tel" class="form-input" id="step2-phone" value="${orderData.phone}" placeholder="e.g. 7027340360" required>
          </div>

          <div class="form-group">
            <label class="form-label">${currentLang === 'hi' ? 'GSTIN नंबर (वैकल्पिक / Optional)' : 'GSTIN (Optional)'}</label>
            <input type="text" class="form-input" id="step2-gst" value="${orderData.gstin}" placeholder="07AAAAA0000A1Z5">
          </div>

          <div class="form-group full-width">
            <label class="form-label">${currentLang === 'hi' ? 'काम के बारे में कुछ खास निर्देश या फोटो लिंक' : 'Project Details or Asset Link'}</label>
            <textarea class="form-textarea" id="step2-details" rows="3" placeholder="${currentLang === 'hi' ? 'जैसे: दुकान का मेनू, लोगो, या गूगल ड्राइव लिंक...' : 'Provide specific instructions or Drive link...'}">${orderData.details}</textarea>
          </div>
        </div>

        <div style="margin-top: 30px; display: flex; justify-content: space-between;">
          <button class="btn btn-outline" id="step2-back-btn">
            <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
            <span>${currentLang === 'hi' ? 'पीछे (Back)' : 'Back'}</span>
          </button>
          <button class="btn btn-primary" id="step2-submit-btn">
            <i data-lucide="check" style="width: 16px; height: 16px;"></i>
            <span>${currentLang === 'hi' ? 'ऑर्डर दर्ज करें & WhatsApp पर भेजें' : 'Submit & Connect on WhatsApp'}</span>
          </button>
        </div>
      </div>
    `;
  }

  if (currentStep === 3) {
    const trackingId = orderData.trackingId || 'VD-IND-' + Math.floor(1000 + Math.random() * 9000);
    
    // Generate pre-filled WhatsApp link
    const waText = encodeURIComponent(
      `*Namaste Vyapar Digital!*\n\n` +
      `Maine abhi website par naya project order submit kiya hai:\n\n` +
      `📌 *Order Tracking ID:* ${trackingId}\n` +
      `👤 *Name:* ${orderData.clientName}\n` +
      `🏬 *Business:* ${orderData.businessName} (${orderData.city})\n` +
      `🛠️ *Service:* ${orderData.packageName}\n` +
      `💰 *Estimated Budget:* ₹${orderData.estimatedPrice.toLocaleString('en-IN')}\n` +
      (orderData.gstin ? `📄 *GSTIN:* ${orderData.gstin}\n` : '') +
      (orderData.details ? `📝 *Notes:* ${orderData.details}\n` : '') +
      `\nKripya is order ko verify karein aur bank/UPI details share karein.`
    );
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;

    return `
      <div style="text-align: center; padding: 20px 0;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid var(--whatsapp); color: var(--whatsapp); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <i data-lucide="check-circle" style="width: 36px; height: 36px;"></i>
        </div>

        <h3 style="font-size: 1.8rem; margin-bottom: 8px;">
          ${currentLang === 'hi' ? 'बधाई हो! आपका आर्डर दर्ज हो गया है' : 'Order Submitted Successfully!'}
        </h3>
        
        <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 20px;">
          ${currentLang === 'hi' 
            ? 'आपका प्रोजेक्ट ट्रैकिंग नंबर नीचे दिया गया है। त्वरित शुरुआत के लिए सीधे व्हाट्सएप पर संपर्क करें।' 
            : 'Your project tracking ID is generated below. Connect on WhatsApp to start immediately.'}
        </p>

        <div style="background: rgba(37, 99, 235, 0.1); border: 1px dashed var(--primary-light); padding: 16px; border-radius: var(--radius-md); max-width: 380px; margin: 0 auto 25px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${currentLang === 'hi' ? 'आपका ट्रैकिंग ID:' : 'Your Tracking ID:'}</div>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--saffron); letter-spacing: 0.05em;">${trackingId}</div>
        </div>

        <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
          <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-lg">
            <i data-lucide="message-circle" style="width: 20px; height: 20px;"></i>
            <span>${currentLang === 'hi' ? 'व्हाट्सएप पर आर्डर की पुष्टि करें' : 'Confirm on WhatsApp'}</span>
          </a>
          <button class="btn btn-outline track-now-btn" data-tracking-id="${trackingId}">
            <i data-lucide="activity" style="width: 18px; height: 18px;"></i>
            <span>${currentLang === 'hi' ? 'लाइव स्टेटस ट्रैक करें' : 'Track Live Status'}</span>
          </button>
        </div>
      </div>
    `;
  }
}

function attachStepEvents(container) {
  // Step 1 Next
  const step1Next = container.querySelector('#step1-next-btn');
  if (step1Next) {
    step1Next.addEventListener('click', () => {
      orderData.serviceId = container.querySelector('#step1-service').value;
      orderData.packageName = container.querySelector('#step1-package').value;
      orderData.estimatedPrice = parseInt(container.querySelector('#step1-price').value, 10) || 0;
      currentStep = 2;
      renderQuickOrder();
    });
  }

  // Step 2 Back
  const step2Back = container.querySelector('#step2-back-btn');
  if (step2Back) {
    step2Back.addEventListener('click', () => {
      currentStep = 1;
      renderQuickOrder();
    });
  }

  // Step 2 Submit
  const step2Submit = container.querySelector('#step2-submit-btn');
  if (step2Submit) {
    step2Submit.addEventListener('click', () => {
      const name = container.querySelector('#step2-name').value.trim();
      const biz = container.querySelector('#step2-biz').value.trim();
      const city = container.querySelector('#step2-city').value.trim();
      const phone = container.querySelector('#step2-phone').value.trim();

      if (!name || !biz || !phone) {
        alert(currentLang === 'hi' ? 'कृपया अपना नाम, दुकान का नाम और व्हाट्सएप नंबर भरें।' : 'Please enter your name, business name, and phone number.');
        return;
      }

      orderData.clientName = name;
      orderData.businessName = biz;
      orderData.city = city;
      orderData.phone = phone;
      orderData.gstin = container.querySelector('#step2-gst').value.trim();
      orderData.details = container.querySelector('#step2-details').value.trim();
      orderData.trackingId = 'VD-IND-' + Math.floor(1000 + Math.random() * 9000);
      orderData.createdAt = new Date().toISOString();
      orderData.status = 'Discovery & Requirement Brief';
      orderData.stageIndex = 1; // 1 to 5

      // Save to localStorage
      saveOrderToLocalStorage(orderData);

      currentStep = 3;
      renderQuickOrder();
    });
  }

  // Step 3 Track Now
  const trackBtn = container.querySelector('.track-now-btn');
  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      const tid = trackBtn.getAttribute('data-tracking-id');
      window.dispatchEvent(new CustomEvent('trackOrder', { detail: { trackingId: tid } }));
      document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function saveOrderToLocalStorage(order) {
  try {
    const existing = JSON.parse(localStorage.getItem('vyapar_digital_orders') || '[]');
    existing.unshift(order);
    localStorage.setItem('vyapar_digital_orders', JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}
