// Vyapar Digital - Quick Intake & Project Booking Wizard
import { CONFIG } from '../data/config.js';
import { saveOrder } from '../services/firebase.js';
import { notifyNewOrder } from '../services/emailService.js';

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
          <span class="step-txt">${currentLang === 'hi' ? 'सर्विस' : 'Service'}</span>
        </div>
        <div class="wizard-step-divider"></div>
        <div class="wizard-step-indicator ${currentStep >= 2 ? 'active' : ''}">
          <div class="step-num">2</div>
          <span class="step-txt">${currentLang === 'hi' ? 'विवरण' : 'Details'}</span>
        </div>
        <div class="wizard-step-divider"></div>
        <div class="wizard-step-indicator ${currentStep >= 3 ? 'active' : ''}">
          <div class="step-num">3</div>
          <span class="step-txt">${currentLang === 'hi' ? 'कन्फर्म' : 'Confirm'}</span>
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
    
    // Generate natural customer WhatsApp message
    const waText = encodeURIComponent(
      `*Namaste Vyapar Digital!*\n\n` +
      `Mujhe apne business ke liye project shuru karwana hai:\n\n` +
      `👤 *Naam:* ${orderData.clientName}\n` +
      `🏬 *Business / Dukan:* ${orderData.businessName}${orderData.city ? ` (${orderData.city})` : ''}\n` +
      `🛠️ *Service:* ${orderData.packageName}\n` +
      `💰 *Estimated Budget:* ₹${orderData.estimatedPrice.toLocaleString('en-IN')}\n` +
      (orderData.gstin ? `📄 *GSTIN:* ${orderData.gstin}\n` : '') +
      (orderData.details ? `📝 *Zaroorat / Details:* ${orderData.details}\n` : '') +
      `\nKripya aage ka process batayein aur shuru karein.`
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
            <svg class="wa-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
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

      // Save to Firebase Cloud & LocalStorage
      saveOrder(orderData);

      // Trigger Instant EmailJS Notification to Founder's Gmail
      notifyNewOrder({
        id: orderData.trackingId,
        trackingId: orderData.trackingId,
        clientName: orderData.clientName,
        businessName: orderData.businessName,
        city: orderData.city,
        clientPhone: orderData.phone,
        packageName: orderData.packageName,
        price: orderData.estimatedPrice,
        notes: `GSTIN: ${orderData.gstin || 'None'}\nDetails: ${orderData.details || 'None'}`
      });

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
