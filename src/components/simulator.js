// Vyapar Digital - Live Instant Shop & Poster Preview Simulator (Sarvam.ai Inspired)
import { CONFIG } from '../data/config.js';

let currentShopName = 'श्री गणेश मिष्ठान भंडार';
let currentCategory = 'sweets';
let currentMode = 'website'; // 'website', 'store', 'poster', 'reels', 'app'
let currentLang = 'hi';

const CATEGORY_DATA = {
  sweets: {
    nameHi: 'मिठाई / बेकरी / किराना',
    nameEn: 'Sweets & Grocery',
    taglineHi: 'शुद्ध देसी घी की मिठाइयां एवं ताज़ा नमकीन',
    taglineEn: 'Pure Desi Ghee Sweets & Fresh Snacks',
    badge: '🛍️ WhatsApp Store',
    slug: 'ganeshsweets',
    items: [
      { nameHi: 'काजू कतली (प्रीमियम)', nameEn: 'Kaju Katli (Premium)', price: '₹480/kg', img: '🥟' },
      { nameHi: 'गुलाब जामुन (देसी घी)', nameEn: 'Gulab Jamun (Desi Ghee)', price: '₹220/kg', img: '🍯' },
      { nameHi: 'स्पेशल रसमलाई (2 पीस)', nameEn: 'Special Rasmalai (2 Pcs)', price: '₹90', img: '🍨' },
      { nameHi: 'रतनलाल भुजिया नमकीन', nameEn: 'Special Bhujia Sev', price: '₹140/pk', img: '🥨' }
    ],
    posterFestivalHi: 'शुभ दीपावली महा धमाका ऑफर',
    posterFestivalEn: 'Happy Diwali Special Festive Offer',
    posterOfferHi: 'हर ₹500 की मिठाई पर 100g सोनपापड़ी मुफ्त!',
    posterOfferEn: 'Free 100g Soan Papdi on every ₹500 purchase!',
    color: '#D97706',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)'
  },
  fashion: {
    nameHi: 'कपड़े / साड़ी / फैशन',
    nameEn: 'Fashion & Sarees',
    taglineHi: 'विवाह एवं त्यौहारों के लिए साड़ियां और कुर्ते',
    taglineEn: 'Designer Sarees, Suits & Festive Kurta Sets',
    badge: '👗 WhatsApp Store',
    slug: 'royalsarees',
    items: [
      { nameHi: 'बनारसी सिल्क साड़ी', nameEn: 'Banarasi Silk Saree', price: '₹1,499', img: '🥻' },
      { nameHi: 'राजपूती पोशाक सूट', nameEn: 'Rajputi Poshak Suit', price: '₹2,199', img: '👗' },
      { nameHi: 'प्रीमियम कॉटन कुर्ता पायजामा', nameEn: 'Premium Cotton Kurta', price: '₹899', img: '👔' },
      { nameHi: 'डिजाइनर ब्राइडल लहंगा', nameEn: 'Designer Bridal Lehenga', price: '₹4,999', img: '✨' }
    ],
    posterFestivalHi: 'त्यौहार स्पेशल सेल — 40% तक छूट!',
    posterFestivalEn: 'Festive Mega Sale — Up to 40% OFF!',
    posterOfferHi: '2 साड़ी खरीदने पर 1 मैचिंग दुपट्टा बिल्कुल मुफ्त!',
    posterOfferEn: 'Buy 2 Sarees & Get 1 Matching Dupatta Free!',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)'
  },
  coaching: {
    nameHi: 'कोचिंग / स्कूल / एकेडमी',
    nameEn: 'Coaching & Academy',
    taglineHi: 'कक्षा 9th से 12th & प्रतियोगी परीक्षाओं की सर्वश्रेष्ठ तैयारी',
    taglineEn: 'Classes 9th-12th & Competitive Exam Preparation',
    badge: '📚 Android Student App',
    slug: 'lakshyaacademy',
    items: [
      { nameHi: 'NEET/JEE 1-Year Batch', nameEn: 'NEET/JEE 1-Year Batch', price: '₹4,999', img: '📖' },
      { nameHi: '10th Board Booster Series', nameEn: '10th Board Booster Series', price: '₹1,499', img: '📝' },
      { nameHi: 'Daily Online Mock Tests', nameEn: 'Daily Online Mock Tests', price: '₹499', img: '💻' },
      { nameHi: 'Printed Formula Notes PDF', nameEn: 'Printed Formula Notes', price: '₹299', img: '📚' }
    ],
    posterFestivalHi: 'नया बैच शुरू — एडमिशन ओपन 2026',
    posterFestivalEn: 'New Batch Starting — Admissions Open 2026',
    posterOfferHi: 'पहले 50 छात्रों के लिए रजिस्ट्रेशन पर 30% छूट!',
    posterOfferEn: 'Flat 30% OFF for first 50 registrations!',
    color: '#1E40AF',
    gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
  },
  gym: {
    nameHi: 'जिम / फिटनेस सेंटर',
    nameEn: 'Gym & Fitness',
    taglineHi: 'आधुनिक मशीनें, पर्सनल ट्रेनर एवं डाइट प्लान',
    taglineEn: 'Modern Equipment, Certified Trainer & Diet Plans',
    badge: '💪 Fitness Profile & Reels',
    slug: 'fitnesspoint',
    items: [
      { nameHi: '3 माह फिटनेस मेंबरशिप', nameEn: '3-Month Membership', price: '₹2,499', img: '🏋️' },
      { nameHi: '6 माह + पर्सनल डाइट चार्ट', nameEn: '6-Month + Diet Chart', price: '₹4,499', img: '🥗' },
      { nameHi: '1-on-1 पर्सनल ट्रेनिंग (माह)', nameEn: 'Personal Training (mo)', price: '₹1,999', img: '🥊' },
      { nameHi: 'सप्लीमेंट & शेकर कॉम्बो', nameEn: 'Supplement Starter Kit', price: '₹1,299', img: '🥤' }
    ],
    posterFestivalHi: 'न्यू ईयर फिटनेस रेजोल्यूशन धमाका',
    posterFestivalEn: 'New Year Fitness Transformation Offer',
    posterOfferHi: 'सालाना मेंबरशिप पर 2 महीने बिल्कुल मुफ्त!',
    posterOfferEn: 'Join for 1 Year & Get 2 Months Free!',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)'
  },
  clinic: {
    nameHi: 'क्लिनिक / डॉक्टर / मेडिकल',
    nameEn: 'Clinic & Doctor',
    taglineHi: 'अनुभवी विशेषज्ञ, डिजिटल अपॉइंटमेंट एवं उचित परामर्श',
    taglineEn: 'Experienced Specialist, WhatsApp Booking & Care',
    badge: '🏥 Digital Clinic Booking',
    slug: 'drvermaclinic',
    items: [
      { nameHi: 'डॉक्टर परामर्श (Consultation)', nameEn: 'Doctor Consultation', price: '₹300', img: '🩺' },
      { nameHi: 'दांतों की सफाई & स्केलिंग', nameEn: 'Teeth Cleaning & Scaling', price: '₹600', img: '🦷' },
      { nameHi: 'फुल बॉडी हेल्थ चेकअप पैकेज', nameEn: 'Full Body Health Check', price: '₹999', img: '💉' },
      { nameHi: 'होम ब्लड सैंपल कलेक्शन', nameEn: 'Home Sample Collection', price: '₹150', img: '🩸' }
    ],
    posterFestivalHi: 'निःशुल्क स्वास्थ्य परामर्श शिविर',
    posterFestivalEn: 'Free Health Checkup & Consultation Camp',
    posterOfferHi: 'रविवार को सभी टेस्ट पर 25% की विशेष छूट!',
    posterOfferEn: '25% discount on all diagnostics this Sunday!',
    color: '#DC2626',
    gradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)'
  }
};

export function initSimulator(lang = 'hi') {
  currentLang = lang;
  renderSimulator();
}

export function updateSimulatorLang(lang) {
  currentLang = lang;
  renderSimulator();
}

export function renderSimulator() {
  const container = document.getElementById('simulator-container');
  if (!container) return;

  const data = CATEGORY_DATA[currentCategory] || CATEGORY_DATA.sweets;
  const isHi = currentLang === 'hi';

  container.innerHTML = `
    <div class="simulator-wrapper">
      <!-- Simulator Controls Header -->
      <div class="sim-controls-panel">
        <div class="sim-input-group">
          <label class="sim-label">
            <span class="sim-label-icon">✍️</span>
            <span>${isHi ? 'अपनी दुकान / बिजनेस का नाम लिखें:' : 'Type Your Shop / Business Name:'}</span>
          </label>
          <div class="sim-input-box">
            <input type="text" id="sim-shop-input" class="sim-input" value="${currentShopName}" placeholder="${isHi ? 'जैसे: गुप्ता किराना स्टोर...' : 'e.g. Gupta Super Store...'}">
            <button class="sim-clear-btn" id="sim-reset-btn" title="Reset Name">↺</button>
          </div>
        </div>

        <div class="sim-category-group">
          <label class="sim-label">
            <span class="sim-label-icon">🏷️</span>
            <span>${isHi ? 'बिजनेस कैटेगरी चुनें:' : 'Select Business Category:'}</span>
          </label>
          <div class="sim-cat-chips">
            ${Object.keys(CATEGORY_DATA).map(key => {
              const cat = CATEGORY_DATA[key];
              const isSelected = key === currentCategory;
              return `
                <button class="sim-cat-chip ${isSelected ? 'active' : ''}" data-cat-key="${key}">
                  ${isHi ? cat.nameHi : cat.nameEn}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="sim-mode-group">
          <label class="sim-label">
            <span class="sim-label-icon">👁️</span>
            <span>${isHi ? 'प्रिव्यू फॉर्मेट चुनें (5 मोड्स):' : 'Select Preview Format (5 Modes):'}</span>
          </label>
          <div class="sim-mode-tabs">
            <button class="sim-mode-tab ${currentMode === 'website' ? 'active' : ''}" data-mode="website">
              🌐 ${isHi ? 'वेबसाइट' : 'Website'}
            </button>
            <button class="sim-mode-tab ${currentMode === 'store' ? 'active' : ''}" data-mode="store">
              📱 ${isHi ? 'WhatsApp स्टोर' : 'WhatsApp Store'}
            </button>
            <button class="sim-mode-tab ${currentMode === 'poster' ? 'active' : ''}" data-mode="poster">
              🎨 ${isHi ? 'त्यौहार पोस्टर' : 'Poster'}
            </button>
            <button class="sim-mode-tab ${currentMode === 'reels' ? 'active' : ''}" data-mode="reels">
              🎬 ${isHi ? 'Reels' : 'Reels'}
            </button>
            <button class="sim-mode-tab ${currentMode === 'app' ? 'active' : ''}" data-mode="app">
              📲 ${isHi ? 'मोबाइल ऐप' : 'App'}
            </button>
          </div>
        </div>

        <div class="sim-cta-box">
          <div class="sim-cta-note">
            <span>✨</span>
            <span>${isHi ? 'यह सिर्फ लाइव डेमो है — आपकी असली वेबसाइट / स्टोर 48 घंटे में लाइव होगी!' : 'This is a live preview — your real website delivers in 48 hours!'}</span>
          </div>
          <a id="sim-order-wa-btn" href="#" target="_blank" class="btn btn-whatsapp btn-lg" style="width: 100%; justify-content: center;">
            <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
            <span>${isHi ? `मुझे "${currentShopName}" के लिए यह चाहिए` : `I want this for "${currentShopName}"`}</span>
          </a>
        </div>
      </div>

      <!-- Live Mockup Screen -->
      <div class="sim-preview-panel">
        <div class="sim-phone-frame">
          <div class="sim-phone-notch"></div>
          
          <div class="sim-phone-screen">
            ${renderScreenContent(data)}
          </div>
        </div>
      </div>
    </div>
  `;

  attachSimulatorEvents();
  updateSimulatorWhatsAppLink();
  if (window.lucide) window.lucide.createIcons();
}

function renderScreenContent(data) {
  const isHi = currentLang === 'hi';
  const shopTitle = currentShopName || (isHi ? 'आपकी डिजिटल दुकान' : 'Your Digital Store');
  const tagline = isHi ? data.taglineHi : data.taglineEn;
  const slug = (currentShopName || 'mybiz').toLowerCase().replace(/[^a-z0-9]/g, '') || data.slug;

  if (currentMode === 'website') {
    return `
      <!-- Website Browser Simulation -->
      <div class="web-browser-top">
        <div class="web-browser-dots"><span></span><span></span><span></span></div>
        <div class="web-browser-url">
          <span class="web-ssl-lock">🔒</span>
          <span>https://${slug}.in</span>
        </div>
      </div>

      <div class="web-screen-content">
        <!-- Web Nav -->
        <div class="web-mock-nav">
          <div class="web-mock-logo">
            <span class="web-mock-logo-icon">VD</span>
            <span class="web-mock-logo-text">${shopTitle}</span>
          </div>
          <a href="tel:+917027340360" class="web-mock-call-btn">📞 Call</a>
        </div>

        <!-- Web Hero -->
        <div class="web-mock-hero" style="background: radial-gradient(circle at 50% 0%, ${data.color}25 0%, #FFFFFF 100%);">
          <div class="web-mock-rating">★★★★★ <span>4.9 (120+ Reviews)</span></div>
          <h2 class="web-mock-h1">${shopTitle}</h2>
          <p class="web-mock-sub">${tagline}</p>
          <div class="web-mock-cta-row">
            <button class="web-btn-primary">🛍️ ${isHi ? 'प्रोडक्ट देखें' : 'View Products'}</button>
            <button class="web-btn-secondary">📍 ${isHi ? 'लोकेशन' : 'Location'}</button>
          </div>
        </div>

        <!-- Web Features -->
        <div class="web-mock-trust-strip">
          <div>🚀 <span>${isHi ? 'फास्ट डिलीवरी' : 'Fast Delivery'}</span></div>
          <div>💯 <span>${isHi ? '100% शुद्धता' : '100% Quality'}</span></div>
          <div>💳 <span>${isHi ? 'UPI / QR कोड' : 'UPI Accepted'}</span></div>
        </div>

        <!-- Web Catalog Grid -->
        <div class="web-mock-section">
          <div class="web-sec-header">
            <h3>${isHi ? 'लोकप्रिय सेवाएं / प्रोडक्ट्स' : 'Featured Products'}</h3>
            <span class="web-view-all">${isHi ? 'सब देखें →' : 'View All →'}</span>
          </div>
          <div class="web-prod-grid">
            ${data.items.slice(0, 4).map(item => `
              <div class="web-grid-item">
                <div class="web-grid-img">${item.img}</div>
                <div class="web-grid-name">${isHi ? item.nameHi : item.nameEn}</div>
                <div class="web-grid-price">${item.price}</div>
                <button class="web-grid-order-btn">+ ${isHi ? 'ऑर्डर' : 'Order'}</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Web Contact & Location -->
        <div class="web-mock-location-card">
          <div class="web-loc-title">📍 ${isHi ? 'दुकान का पता & समय' : 'Store Address & Timings'}</div>
          <div class="web-loc-desc">${isHi ? 'मेन मार्केट, मुख्य चौराहा — प्रातः 9:00 से रात्रि 9:00 बजे तक' : 'Main Market, Town Center — 9:00 AM to 9:00 PM'}</div>
          <div class="web-loc-badges">
            <span class="web-loc-chip">Google Maps ⭐ 4.9</span>
            <span class="web-loc-chip">Verified Merchant ✓</span>
          </div>
        </div>

        <!-- Floating WhatsApp Widget -->
        <div class="web-mock-wa-bubble">
          <span>💬 Order on WhatsApp</span>
        </div>
      </div>
    `;
  } else if (currentMode === 'store') {
    return `
      <!-- WhatsApp Store Simulation -->
      <div class="wa-screen-header">
        <div class="wa-header-top">
          <div class="wa-avatar">🏪</div>
          <div class="wa-title-box">
            <div class="wa-shop-name">${shopTitle} <span class="wa-verified">✓</span></div>
            <div class="wa-status-text">🟢 Online | WhatsApp Store</div>
          </div>
        </div>
        <div class="wa-tagline">${tagline}</div>
      </div>

      <div class="wa-screen-body">
        <div class="wa-section-title">
          <span>${isHi ? 'लोकप्रिय प्रोडक्ट्स' : 'Featured Catalog'}</span>
          <span class="wa-badge">${isHi ? '48hr डिलीवरी' : 'Fast Delivery'}</span>
        </div>

        <div class="wa-products-grid">
          ${data.items.map(item => `
            <div class="wa-prod-card">
              <div class="wa-prod-icon">${item.img}</div>
              <div class="wa-prod-info">
                <div class="wa-prod-name">${isHi ? item.nameHi : item.nameEn}</div>
                <div class="wa-prod-price">${item.price}</div>
              </div>
              <button class="wa-add-btn" onclick="this.textContent = '✓ Added'; this.style.background = '#059669'; setTimeout(() => { this.textContent = '+ Order'; this.style.background = ''; }, 2000)">
                + Order
              </button>
            </div>
          `).join('')}
        </div>

        <div class="wa-cart-bar">
          <div class="wa-cart-info">
            <span style="font-weight: 700;">Cart: 2 items</span>
            <span style="font-size: 0.75rem; opacity: 0.85;">Total: ₹700</span>
          </div>
          <button class="wa-checkout-btn">
            <span>Send Order on WhatsApp</span> →
          </button>
        </div>
      </div>
    `;
  } else if (currentMode === 'poster') {
    return `
      <!-- Festival Poster Simulation -->
      <div class="poster-screen" style="background: radial-gradient(circle at 50% 20%, #78350F 0%, #1E1B4B 100%);">
        <div class="poster-ornament">𑁍 𑁍 𑁍</div>
        <div class="poster-fest-badge">${isHi ? 'त्यौहार विशेष सेल' : 'Festive Special'}</div>
        <div class="poster-title">${isHi ? data.posterFestivalHi : data.posterFestivalEn}</div>
        
        <div class="poster-brand-box">
          <div class="poster-brand-logo">VD</div>
          <div class="poster-brand-name">${shopTitle}</div>
          <div class="poster-brand-sub">${tagline}</div>
        </div>

        <div class="poster-offer-card">
          <div class="poster-offer-title">🎁 ${isHi ? 'धमाका ऑफर' : 'Special Offer'}</div>
          <div class="poster-offer-desc">${isHi ? data.posterOfferHi : data.posterOfferEn}</div>
        </div>

        <div class="poster-footer">
          <div class="poster-contact-chip">📞 70273 40360</div>
          <div class="poster-contact-chip">📍 संपूर्ण भारत</div>
        </div>
      </div>
    `;
  } else if (currentMode === 'reels') {
    return `
      <!-- Instagram Reel Simulation -->
      <div class="reel-screen" style="background: linear-gradient(180deg, #18181B 0%, #09090B 100%);">
        <div class="reel-video-mock">
          <div class="reel-play-icon">▶</div>
          <div class="reel-overlay-content">
            <div class="reel-user-row">
              <div class="reel-avatar">VD</div>
              <div>
                <div class="reel-username">@${shopTitle.toLowerCase().replace(/[^a-z0-9]/g, '') || 'mybusiness'}</div>
                <div class="reel-audio">🎵 Original Audio — Trending Viral Beats</div>
              </div>
              <button class="reel-follow-btn">Follow</button>
            </div>
            <div class="reel-caption">
              🔥 ${shopTitle} का नया डिजिटल कलेक्शन! 100% ओरिजिनल & फास्ट डिलीवरी। लिंक बायो में है! #VyaparDigital #LocalVocal
            </div>
          </div>
        </div>
        <div class="reel-actions-bar">
          <div class="reel-action-item">❤️ <span>4.8k</span></div>
          <div class="reel-action-item">💬 <span>342</span></div>
          <div class="reel-action-item">↗️ <span>1.2k</span></div>
          <div class="reel-action-item">💾 <span>Save</span></div>
        </div>
      </div>
    `;
  } else {
    return `
      <!-- Android Mobile App Simulation -->
      <div class="app-screen">
        <div class="app-top-header">
          <div class="app-brand-row">
            <div class="app-logo-badge">VD</div>
            <div>
              <div class="app-shop-title">${shopTitle}</div>
              <div class="app-loc-sub">📍 Main Market Branch</div>
            </div>
            <div class="app-bell">🔔</div>
          </div>
          <div class="app-search-bar">
            <span>🔍 Search products, batches, services...</span>
          </div>
        </div>

        <div class="app-body">
          <div class="app-promo-banner" style="background: linear-gradient(135deg, ${data.color}, #1A1A2E);">
            <div class="app-promo-tag">Special App Offer</div>
            <div class="app-promo-h">Get 20% Cashback</div>
            <div class="app-promo-code">Use Code: <strong>FIRSTAPP</strong></div>
          </div>

          <div class="app-cat-row">
            <div class="app-cat-circle">⭐ <span>Top</span></div>
            <div class="app-cat-circle">🔥 <span>Deals</span></div>
            <div class="app-cat-circle">📦 <span>Orders</span></div>
            <div class="app-cat-circle">💳 <span>Pay</span></div>
          </div>

          <div class="app-items-list">
            ${data.items.slice(0, 3).map(item => `
              <div class="app-list-item">
                <span class="app-item-emoji">${item.img}</span>
                <div class="app-item-info">
                  <div class="app-item-name">${isHi ? item.nameHi : item.nameEn}</div>
                  <div class="app-item-price">${item.price}</div>
                </div>
                <button class="app-btn-add">+ Book</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="app-bottom-nav">
          <div class="app-nav-item active">🏠<span>Home</span></div>
          <div class="app-nav-item">🛍️<span>Store</span></div>
          <div class="app-nav-item">💬<span>Support</span></div>
          <div class="app-nav-item">👤<span>Account</span></div>
        </div>
      </div>
    `;
  }
}

function attachSimulatorEvents() {
  const input = document.getElementById('sim-shop-input');
  const resetBtn = document.getElementById('sim-reset-btn');

  if (input) {
    input.addEventListener('input', (e) => {
      currentShopName = e.target.value;
      const screen = document.querySelector('.sim-phone-screen');
      if (screen) {
        const data = CATEGORY_DATA[currentCategory] || CATEGORY_DATA.sweets;
        screen.innerHTML = renderScreenContent(data);
      }
      updateSimulatorWhatsAppLink();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentShopName = currentLang === 'hi' ? 'श्री गणेश मिष्ठान भंडार' : 'Shree Ganesh Sweets';
      renderSimulator();
    });
  }

  document.querySelectorAll('.sim-cat-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-cat-key');
      renderSimulator();
    });
  });

  document.querySelectorAll('.sim-mode-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = btn.getAttribute('data-mode');
      renderSimulator();
    });
  });
}

function updateSimulatorWhatsAppLink() {
  const btn = document.getElementById('sim-order-wa-btn');
  if (!btn) return;

  const modeLabels = {
    website: 'Business Website & Store',
    store: 'WhatsApp Store',
    poster: 'Festival Poster Banner',
    reels: 'Instagram Reels Video',
    app: 'Android Mobile App'
  };
  const modeName = modeLabels[currentMode] || 'Website & Store';
  const shop = currentShopName || 'Meri Dukaan';
  const text = encodeURIComponent(
    `Namaste Vyapar Digital! Maine live simulator par "${shop}" ka ${modeName} dekha. Mujhe meri dukaan ke liye yeh banwana hai.`
  );
  btn.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`);
}
