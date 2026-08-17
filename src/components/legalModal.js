// Vyapar Digital - Clean Dedicated Legal Modals (Separate & Standalone)
import { CONFIG } from '../data/config.js';

let activePolicy = 'privacy';
let currentLang = 'hi';

const LEGAL_CONTENT = {
  privacy: {
    titleHi: "गोपनीयता नीति",
    titleEn: "Privacy Policy",
    subtitleHi: "व्यापार डिजिटल द्वारा आपके डेटा की 100% सुरक्षा का वचन",
    subtitleEn: "Vyapar Digital's commitment to protect your personal and business data",
    icon: "shield-check",
    updatedHi: "अंतिम अपडेट: 17 अगस्त 2026",
    updatedEn: "Last Updated: 17 August 2026",
    bodyHi: `
      <div class="legal-section">
        <h4>1. हमारी प्रतिबद्धता</h4>
        <p>व्यापार डिजिटल (Vyapar Digital) में हम भारतीय व्यापारियों, दुकानदारों और हमारे ग्राहकों की व्यक्तिगत और व्यावसायिक जानकारी की गोपनीयता का 100% सम्मान करते हैं। यह नीति बताती है कि जब आप हमारी वेबसाइट या सेवाओं का उपयोग करते हैं, तो हम आपकी जानकारी को कैसे सुरक्षित रखते हैं।</p>
      </div>

      <div class="legal-section">
        <h4>2. एकत्रित की जाने वाली जानकारी</h4>
        <p>हम केवल वही जानकारी प्राप्त करते हैं जो आप स्वेच्छा से हमें प्रदान करते हैं:</p>
        <ul>
          <li><strong>संपर्क विवरण:</strong> आपका नाम, व्हाट्सएप फोन नंबर, ईमेल आईडी।</li>
          <li><strong>व्यावसायिक विवरण:</strong> आपकी दुकान/संस्थान का नाम, कार्य का प्रकार, शहर/पता, और प्रोजेक्ट आवश्यकताएं।</li>
          <li><strong>प्रोजेक्ट फाइल्स:</strong> आपके द्वारा भेजी गई लोगो, फोटो, रेट लिस्ट, मेनू और वीडियो।</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>3. जानकारी का उपयोग</h4>
        <p>आपकी जानकारी का उपयोग केवल निम्नलिखित कार्यों के लिए किया जाता है:</p>
        <ul>
          <li>आपकी वेबसाइट, व्हाट्सएप स्टोर, मोबाइल ऐप या पोस्टर्स तैयार करना।</li>
          <li>व्हाट्सएप या ईमेल के माध्यम से प्रोजेक्ट ड्राफ्ट और डिलीवरी स्टेटस अपडेट भेजना।</li>
          <li>भविष्य में वेबसाइट मेंटेनेंस और तकनीकी सहायता प्रदान करना।</li>
        </ul>
        <p><strong>शून्य स्पैम नीति:</strong> हम आपकी जानकारी को किसी भी तीसरे पक्ष, मार्केटिंग कंपनी या विज्ञापनदाताओं को कभी भी बेचते, किराए पर देते या साझा नहीं करते हैं।</p>
      </div>

      <div class="legal-section">
        <h4>4. डेटा सुरक्षा</h4>
        <p>हमारे सर्वर और डेटाबेस Google Firebase एन्क्रिप्शन और सुरक्षा प्रोटोकॉल से सुरक्षित हैं। ऑर्डर ट्रैकिंग सिस्टम ग्राहक के रजिस्टर्ड व्हाट्सएप नंबर के 2FA सत्यापन से सुरक्षित है।</p>
      </div>

      <div class="legal-section">
        <h4>5. संपर्क सूत्र</h4>
        <p>यदि इस गोपनीयता नीति के संबंध में आपका कोई प्रश्न है, तो आप सीधे हमारे संस्थापक से संपर्क कर सकते हैं:</p>
        <p><strong>संस्थापक:</strong> केशव लड्ढा (Keshav Ladha)<br>
        <strong>ईमेल:</strong> <a href="mailto:keshavladha24@gmail.com" style="color:var(--primary);">keshavladha24@gmail.com</a><br>
        <strong>व्हाट्सएप:</strong> +91 70273 40360<br>
        <strong>कार्यालय:</strong> ऐलनाबाद (125102), सिरसा, हरियाणा, भारत</p>
      </div>
    `,
    bodyEn: `
      <div class="legal-section">
        <h4>1. Our Commitment</h4>
        <p>At Vyapar Digital, we deeply respect the privacy and security of our clients, local shopkeepers, and merchants across India. This policy explains how we handle and protect your information when using our platform.</p>
      </div>

      <div class="legal-section">
        <h4>2. Information We Collect</h4>
        <p>We only collect information that you voluntarily provide to us:</p>
        <ul>
          <li><strong>Contact Details:</strong> Your name, WhatsApp phone number, email address.</li>
          <li><strong>Business Details:</strong> Shop/Business name, industry category, location/address, and project requirements.</li>
          <li><strong>Project Assets:</strong> Logos, photos, price lists, menus, and video clips provided by you.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>3. How We Use Your Information</h4>
        <p>Your information is used strictly for:</p>
        <ul>
          <li>Developing your website, WhatsApp store, mobile application, or creative assets.</li>
          <li>Delivering milestone status updates via WhatsApp and Email.</li>
          <li>Providing ongoing technical support and maintenance.</li>
        </ul>
        <p><strong>Zero Spam Guarantee:</strong> We never sell, rent, or trade your personal or business data with third-party advertisers or marketing brokers.</p>
      </div>

      <div class="legal-section">
        <h4>4. Data Security</h4>
        <p>Our database and cloud services are secured via Google Firebase enterprise-grade encryption. Client order tracking is protected with registered phone 2FA verification.</p>
      </div>

      <div class="legal-section">
        <h4>5. Contact Us</h4>
        <p>For any privacy queries or data removal requests, contact the founder directly:</p>
        <p><strong>Founder:</strong> Keshav Ladha<br>
        <strong>Email:</strong> <a href="mailto:keshavladha24@gmail.com" style="color:var(--primary);">keshavladha24@gmail.com</a><br>
        <strong>WhatsApp:</strong> +91 70273 40360<br>
        <strong>Address:</strong> Ellenabad (125102), Sirsa, Haryana, India</p>
      </div>
    `
  },
  terms: {
    titleHi: "सेवा की शर्तें",
    titleEn: "Terms of Service",
    subtitleHi: "पारदर्शी नियम, स्पष्ट समय-सीमा एवं कार्य सिद्धांत",
    subtitleEn: "Transparent milestones, timelines, and operational standards",
    icon: "file-text",
    updatedHi: "अंतिम अपडेट: 17 अगस्त 2026",
    updatedEn: "Last Updated: 17 August 2026",
    bodyHi: `
      <div class="legal-section">
        <h4>1. सेवा का दायरा</h4>
        <p>व्यापार डिजिटल भारतीय छोटे और मध्यम व्यापारियों को वेबसाइट डेवलपमेंट, व्हाट्सएप ऑनलाइन स्टोर, एंड्रॉइड ऐप, त्यौहार पोस्टर्स, और वीडियो एडिटिंग सेवाएं प्रदान करता है।</p>
      </div>

      <div class="legal-section">
        <h4>2. प्रोजेक्ट समय-सीमा (Delivery Timeline)</h4>
        <ul>
          <li><strong>1-पेज वेबसाइट & पोस्टर्स:</strong> 24 से 48 घंटे में पहला वर्किंग ड्राफ्ट।</li>
          <li><strong>व्हाट्सएप स्टोर & बिजनेस वेबसाइट:</strong> 3 से 5 कार्य दिवस।</li>
          <li><strong>कस्टम एंड्रॉइड मोबाइल ऐप:</strong> 10 से 14 कार्य दिवस।</li>
        </ul>
        <p><em>नोट: समय-सीमा ग्राहक द्वारा आवश्यक फोटो, टेक्स्ट सामग्री और स्वीकृतियों के समय पर प्रदान किए जाने पर निर्भर करती है।</em></p>
      </div>

      <div class="legal-section">
        <h4>3. भुगतान शर्तें (Transparent Pricing)</h4>
        <ul>
          <li>काम शुरू करने के लिए 50% अग्रिम (Advance) भुगतान आवश्यक है।</li>
          <li>शेष 50% भुगतान ग्राहक द्वारा लाइव ड्राफ्ट की समीक्षा करने और पूर्ण संतुष्ट होने के बाद देय है।</li>
          <li>कोई छुपा हुआ शुल्क (No Hidden Charges) नहीं है।</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>4. ग्राहक संशोधन (Revisions)</h4>
        <p>हम ग्राहक की संतुष्टि के लिए समर्पित हैं। सभी पैकेजों में नि:शुल्क संशोधन (Revisions) शामिल हैं जिन्हें आप हमारे ऑनलाइन ऑर्डर ट्रैकर या सीधे व्हाट्सएप पर सबमिट कर सकते हैं।</p>
      </div>

      <div class="legal-section">
        <h4>5. बौद्धिक संपदा (Ownership)</h4>
        <p>अंतिम भुगतान प्राप्त होने के बाद, आपकी वेबसाइट सामग्री, लोगो डिजाइन और कोड का 100% पूर्ण स्वामित्व आपका (ग्राहक का) होगा।</p>
      </div>
    `,
    bodyEn: `
      <div class="legal-section">
        <h4>1. Scope of Service</h4>
        <p>Vyapar Digital provides digital enablement services including responsive websites, WhatsApp stores, Android apps, festival posters, and video editing to Indian businesses.</p>
      </div>

      <div class="legal-section">
        <h4>2. Delivery Timelines</h4>
        <ul>
          <li><strong>1-Page Website & Graphic Posters:</strong> First working draft delivered in 24 to 48 hours.</li>
          <li><strong>WhatsApp Store & Multi-Page Portal:</strong> 3 to 5 business days.</li>
          <li><strong>Custom Android Mobile App:</strong> 10 to 14 business days.</li>
        </ul>
        <p><em>Note: Delivery speed depends on timely provision of necessary text, images, and approvals from the client.</em></p>
      </div>

      <div class="legal-section">
        <h4>3. Payment Terms</h4>
        <ul>
          <li>50% advance to initiate architecture and development.</li>
          <li>Remaining 50% balance payable only after you inspect and approve the live working draft.</li>
          <li>No hidden fees, no recurring surprises.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>4. Revisions & Support</h4>
        <p>All projects include complimentary revision cycles. Clients can request changes directly through the online Order Tracker or via WhatsApp.</p>
      </div>

      <div class="legal-section">
        <h4>5. Ownership & Intellectual Property</h4>
        <p>Upon final balance clearance, 100% full ownership of the website assets, designs, and branding belongs exclusively to the client.</p>
      </div>
    `
  },
  refund: {
    titleHi: "रिफंड & कैंसिलेशन नीति",
    titleEn: "Refund & Cancellation Policy",
    subtitleHi: "100% संतुष्टि गारंटी — काम देखने के बाद ही पूरा भुगतान",
    subtitleEn: "100% satisfaction guarantee with transparent refund standards",
    icon: "refresh-cw",
    updatedHi: "अंतिम अपडेट: 17 अगस्त 2026",
    updatedEn: "Last Updated: 17 August 2026",
    bodyHi: `
      <div class="legal-section">
        <h4>1. 100% संतुष्टि गारंटी</h4>
        <p>हमारा सिद्धांत है: <strong>"पहले काम देखें, संतुष्ट होने के बाद पूरा भुगतान करें।"</strong> हम तब तक ड्राफ्ट में आवश्यक बदलाव करते हैं जब तक कि वह आपकी आवश्यकताओं के अनुकूल न हो जाए।</p>
      </div>

      <div class="legal-section">
        <h4>2. कैंसिलेशन और रिफंड के नियम</h4>
        <ul>
          <li><strong>काम शुरू होने से पहले:</strong> यदि आप बुकिंग के 12 घंटे के भीतर प्रोजेक्ट रद्द करते हैं (डिजाइन कार्य शुरू होने से पहले), तो आपका 100% अग्रिम तुरंत रिफंड कर दिया जाएगा।</li>
          <li><strong>ड्राफ्ट देखने के बाद:</strong> यदि पहला ड्राफ्ट आपकी अपेक्षाओं के अनुरूप नहीं है, तो हम प्राथमिकता के आधार पर दोबारा नया डिजाइन बनाते हैं। यदि फिर भी आप संतुष्ट नहीं होते हैं, तो आपको शेष 50% भुगतान करने की कोई आवश्यकता नहीं है।</li>
          <li><strong>अंतिम डिलीवरी के बाद:</strong> एक बार जब वेबसाइट लाइव हो जाती है, डोमेन ट्रांसफर हो जाता है या फाइनल सोर्स फाइल्स डिलीवर हो जाती हैं, तो डिजिटल सेवाओं के स्वभाव के कारण रिफंड संभव नहीं होगा।</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>3. रिफंड प्रक्रिया</h4>
        <p>रिफंड का अनुरोध करने के लिए आप सीधे <a href="mailto:keshavladha24@gmail.com" style="color:var(--primary);">keshavladha24@gmail.com</a> पर ईमेल भेज सकते हैं या व्हाट्सएप <strong>+91 70273 40360</strong> पर संपर्क कर सकते हैं। स्वीकृत रिफंड 2 से 3 कार्य दिवसों के भीतर आपके मूल UPI/बैंक खाते में वापस कर दिया जाता है।</p>
      </div>
    `,
    bodyEn: `
      <div class="legal-section">
        <h4>1. 100% Satisfaction Principle</h4>
        <p>Our founding principle is simple: <strong>"Inspect the live working draft, pay the final balance only upon satisfaction."</strong> We provide active revisions until the draft aligns with your business requirements.</p>
      </div>

      <div class="legal-section">
        <h4>2. Cancellation & Refund Rules</h4>
        <ul>
          <li><strong>Pre-Development Cancellation:</strong> If you request cancellation within 12 hours of booking prior to commencement, 100% of the deposit is refunded immediately.</li>
          <li><strong>Draft Review Stage:</strong> If the initial draft requires changes, we revise it with top priority. If you still choose not to proceed, you are under zero obligation to pay the remaining 50% balance.</li>
          <li><strong>Post-Delivery Stage:</strong> Once final deliverables (domain setup, custom source code, high-resolution master graphics) are transferred and made live, refunds cannot be issued due to the nature of digital intellectual property.</li>
        </ul>
      </div>

      <div class="legal-section">
        <h4>3. Refund Processing</h4>
        <p>To request a refund or cancellation, email <a href="mailto:keshavladha24@gmail.com" style="color:var(--primary);">keshavladha24@gmail.com</a> or WhatsApp <strong>+91 70273 40360</strong>. Approved refunds are credited back to your original UPI/bank account within 2–3 business days.</p>
      </div>
    `
  }
};

export function initLegalModal(lang = 'hi') {
  currentLang = lang;
  renderModalContainer();
  attachTriggerListeners();
}

export function updateLegalModalLang(lang) {
  currentLang = lang;
  if (document.getElementById('legal-modal-backdrop')?.classList.contains('active')) {
    renderPolicyContent(activePolicy);
  }
}

function renderModalContainer() {
  if (document.getElementById('legal-modal-backdrop')) return;

  const modalMarkup = `
    <div id="legal-modal-backdrop" class="legal-modal-backdrop" aria-hidden="true">
      <div class="legal-modal-card" role="dialog" aria-modal="true">
        <!-- Clean Dedicated Header -->
        <div class="legal-modal-header">
          <div class="legal-modal-title-wrap">
            <div class="legal-modal-icon-badge" id="legal-modal-icon-badge">
              <i data-lucide="shield-check"></i>
            </div>
            <div>
              <h3 id="legal-modal-title" class="legal-modal-title">गोपनीयता नीति</h3>
              <span id="legal-modal-subtitle" class="legal-modal-subtitle"></span>
            </div>
          </div>
          <button id="legal-modal-close" class="legal-modal-close-btn" aria-label="Close dialog">✕</button>
        </div>

        <!-- Body Content (Always resets to top) -->
        <div id="legal-modal-body" class="legal-modal-body">
          <!-- Populated dynamically -->
        </div>

        <!-- Clean Footer -->
        <div class="legal-modal-footer">
          <div class="legal-modal-founder-note">
            🏛️ <strong>Vyapar Digital</strong> • Founder: Keshav Ladha (Ellenabad, Sirsa)
          </div>
          <button id="legal-modal-action-close" class="btn btn-primary btn-sm">
            <span class="btn-hi">बंद करें (Close)</span>
            <span class="btn-en">Close</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalMarkup);

  // Close triggers
  const closeBtn = document.getElementById('legal-modal-close');
  const actionCloseBtn = document.getElementById('legal-modal-action-close');
  const backdrop = document.getElementById('legal-modal-backdrop');

  closeBtn?.addEventListener('click', closeLegalModal);
  actionCloseBtn?.addEventListener('click', closeLegalModal);

  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closeLegalModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop?.classList.contains('active')) {
      closeLegalModal();
    }
  });
}

function attachTriggerListeners() {
  const triggers = document.querySelectorAll('.legal-link, a[data-policy]');
  triggers.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const policyType = link.getAttribute('data-policy') || 'privacy';
      openLegalModal(policyType);
    });
  });
}

export function openLegalModal(policyType = 'privacy') {
  renderModalContainer();
  const backdrop = document.getElementById('legal-modal-backdrop');
  if (!backdrop) return;

  activePolicy = policyType;
  renderPolicyContent(policyType);

  // Always reset scroll to the very top so section 1 is cleanly visible
  const bodyEl = document.getElementById('legal-modal-body');
  if (bodyEl) bodyEl.scrollTop = 0;

  backdrop.classList.add('active');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (window.lucide) window.lucide.createIcons();
}

export function closeLegalModal() {
  const backdrop = document.getElementById('legal-modal-backdrop');
  if (!backdrop) return;

  backdrop.classList.remove('active');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderPolicyContent(policyType) {
  const data = LEGAL_CONTENT[policyType] || LEGAL_CONTENT.privacy;

  const titleEl = document.getElementById('legal-modal-title');
  const subtitleEl = document.getElementById('legal-modal-subtitle');
  const bodyEl = document.getElementById('legal-modal-body');
  const iconBadge = document.getElementById('legal-modal-icon-badge');

  const isHi = currentLang === 'hi';

  if (titleEl) titleEl.textContent = isHi ? data.titleHi : data.titleEn;
  if (subtitleEl) subtitleEl.textContent = isHi ? data.subtitleHi : data.subtitleEn;
  if (bodyEl) bodyEl.innerHTML = isHi ? data.bodyHi : data.bodyEn;

  if (iconBadge) {
    iconBadge.innerHTML = `<i data-lucide="${data.icon}"></i>`;
  }

  const closeHi = document.querySelector('#legal-modal-action-close .btn-hi');
  const closeEn = document.querySelector('#legal-modal-action-close .btn-en');
  if (closeHi && closeEn) {
    closeHi.style.display = isHi ? 'inline' : 'none';
    closeEn.style.display = isHi ? 'none' : 'inline';
  }

  if (window.lucide) window.lucide.createIcons();
}
