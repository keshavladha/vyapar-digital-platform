// Vyapar Digital - Main Application Orchestrator v2.0
import { CONFIG } from './data/config.js';
import { initServices, updateServicesLang } from './components/services.js';
import { initCalculator, updateCalculatorLang } from './components/calculator.js';
import { initPortfolio, updatePortfolioLang } from './components/portfolio.js';
import { initQuickOrder, updateQuickOrderLang } from './components/quickOrder.js';
import { initClientPortal, updateClientPortalLang } from './components/clientPortal.js';
import { initAdminDashboard, updateAdminLang } from './components/adminDashboard.js';
import { initSimulator, updateSimulatorLang } from './components/simulator.js';
import { initLegalModal, updateLegalModalLang } from './components/legalModal.js';
import { initChatbot, updateChatbotLang } from './components/chatbot.js?v=2.2.0';

let currentLang = 'hi'; // Default Hindi for Tier 3

// ══════════════════════════════════════════════════════
//  BOOT
// ══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Restore theme immediately to avoid flash
  restoreTheme();

  // Initialize all sub-components
  initSimulator(currentLang);
  initServices(currentLang);
  initCalculator(currentLang);
  initPortfolio(currentLang);
  initQuickOrder(currentLang);
  initClientPortal(currentLang);
  initAdminDashboard(currentLang);
  initLegalModal(currentLang);
  initChatbot(currentLang);

  // Setup all interactions
  setupLanguageSwitcher();
  setupThemeToggle();
  renderFAQs();
  setupGlobalActions();
  setupMobileDrawer();
  setupScrollProgress();
  setupScrollToTop();
  setupScrollAnimations();
  setupCountUpStats();
  setupTestimonialCarousel();
  setupUrgencyBanner();
  setupIndustryStrip();
  setupWATooltipTimer();

  // Init Lucide icons
  if (window.lucide) window.lucide.createIcons();
}

// ══════════════════════════════════════════════════════
//  LANGUAGE SWITCHER
// ══════════════════════════════════════════════════════
function setupLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      if (selected === currentLang) return;

      currentLang = selected;
      langBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
        b.setAttribute('aria-pressed', b.getAttribute('data-lang') === currentLang ? 'true' : 'false');
      });

      updateStaticPageText();
      updateSimulatorLang(currentLang);
      updateServicesLang(currentLang);
      updateCalculatorLang(currentLang);
      updatePortfolioLang(currentLang);
      updateQuickOrderLang(currentLang);
      updateClientPortalLang(currentLang);
      updateAdminLang(currentLang);
      updateLegalModalLang(currentLang);
      updateChatbotLang(currentLang);
      renderFAQs();
      renderTestimonials();

      if (window.lucide) window.lucide.createIcons();
    });
  });
}

function updateStaticPageText() {
  document.querySelectorAll('[data-i18n-hi]').forEach(el => {
    const textHi = el.getAttribute('data-i18n-hi');
    const textEn = el.getAttribute('data-i18n-en');
    if (textHi && textEn) {
      el.textContent = currentLang === 'hi' ? textHi : textEn;
    }
  });
}

// ══════════════════════════════════════════════════════
//  THEME TOGGLE
// ══════════════════════════════════════════════════════
function restoreTheme() {
  const saved = localStorage.getItem('vyapar_theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function setupThemeToggle() {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  if (!themeBtns.length) return;

  let isDark = localStorage.getItem('vyapar_theme') === 'dark';

  function applyTheme() {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeBtns.forEach(btn => {
        btn.innerHTML = '<i data-lucide="moon" style="width:14px;height:14px;"></i><span>Dark</span>';
      });
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeBtns.forEach(btn => {
        btn.innerHTML = '<i data-lucide="sun" style="width:14px;height:14px;"></i><span>Light</span>';
      });
    }
    if (window.lucide) window.lucide.createIcons();
  }

  applyTheme();
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      isDark = !isDark;
      localStorage.setItem('vyapar_theme', isDark ? 'dark' : 'light');
      applyTheme();
    });
  });
}

// ══════════════════════════════════════════════════════
//  MOBILE HAMBURGER DRAWER
// ══════════════════════════════════════════════════════
function setupMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

// ══════════════════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ══════════════════════════════════════════════════════
function setupScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// ══════════════════════════════════════════════════════
//  SCROLL-TO-TOP BUTTON
// ══════════════════════════════════════════════════════
function setupScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ══════════════════════════════════════════════════════
//  REVEAL ANIMATIONS (Intersection Observer)
// ══════════════════════════════════════════════════════
function setupScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Stagger items in grids
  document.querySelectorAll('.why-grid, .process-grid, .faq-accordion').forEach(grid => {
    grid.querySelectorAll('.reveal').forEach((el, i) => {
      el.dataset.delay = i;
    });
  });

  reveals.forEach(el => observer.observe(el));
}

// ══════════════════════════════════════════════════════
//  COUNT-UP ANIMATION FOR STATS
// ══════════════════════════════════════════════════════
function setupCountUpStats() {
  const statNums = document.querySelectorAll('.stat-number[data-count]');
  if (!statNums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target;
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

// ══════════════════════════════════════════════════════
//  OUR 4 CORE WORK PRINCIPLES (Honest Positioning)
// ══════════════════════════════════════════════════════
const WORK_PRINCIPLES = [
  {
    titleHi: '🤝 1-on-1 सीधे फाउंडर से संवाद', titleEn: '🤝 Direct 1-on-1 Founder Dedication',
    roleHi: 'व्यक्तिगत जिम्मेदारी & संपर्क', roleEn: 'Personal Accountability & Contact',
    textHi: 'हम कोई बड़ी एजेंसी नहीं हैं जहां आपका काम किसी अनजान व्यक्ति को दे दिया जाए। आपके हर एक प्रोजेक्ट पर मेरा शत-प्रतिशत व्यक्तिगत ध्यान रहेगा — सीधे व्हाट्सएप पर 1-on-1 बात होगी।',
    textEn: 'No agency runarounds or junior handoffs. I personally craft and manage your deliverables with complete focus and direct communication on WhatsApp.',
    color: '#1E40AF', badge: '100% Personal Focus'
  },
  {
    titleHi: '⚡ 48 घंटे में पहला ड्राफ्ट तैयार', titleEn: '⚡ First Draft Ready in 48 Hours',
    roleHi: 'तेज़ व समय पर डिलीवरी', roleEn: 'Fast & Reliable Execution',
    textHi: 'काम शुरू होने के 48 घंटे में पहला फंक्शनल ड्राफ्ट आपके व्हाट्सएप पर होगा। बिना किसी अनावश्यक देरी के आपके व्यापार को तेज़ी से डिजिटल बनाया जाएगा।',
    textEn: 'Get your initial functional draft within 48 hours directly on WhatsApp. Fast turnaround without compromising on design quality.',
    color: '#059669', badge: 'Fast Turnaround'
  },
  {
    titleHi: '🛡️ सिर्फ 20% एडवांस — बाकी 80% काम पसंद आने पर', titleEn: '🛡️ Only 20% Advance — 80% Balance After Approval',
    roleHi: 'पारदर्शी & सुरक्षित प्रक्रिया', roleEn: 'Risk-Free Transparent Payment',
    textHi: 'सिर्फ 20% टोकन एडवांस से कार्य की शुरुआत होती है, और बाकी 80% का भुगतान केवल तब करना होता है जब आप फाइनल काम देखकर पूरी तरह संतुष्ट हों।',
    textEn: 'Just 20% advance to initiate the build, and the remaining 80% only after you review and approve the final work. Zero risk, total transparency.',
    color: '#D97706', badge: 'Zero Risk'
  },
  {
    titleHi: '🇮🇳 सरल भाषा — कोई टेक्निकल झंझट नहीं', titleEn: '🇮🇳 Simple Hindi & No Tech Jargon',
    roleHi: 'लोकल व्यापारियों के अनुकूल', roleEn: 'Tailored for Indian Business Owners',
    textHi: 'कोई जटिल सॉफ्टवेयर या कठिन अंग्रेजी नहीं। आपकी भाषा में, सीधे आपके फोन पर — जिससे कोई भी दुकानदार इसे आसानी से चला सके।',
    textEn: 'No confusing jargon or complicated setups. Everything is built simple so you can manage orders straight from your phone.',
    color: '#7C3AED', badge: 'Zero Friction'
  }
];

let carouselIndex = 0;
let carouselInterval = null;

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!container) return;

  container.innerHTML = `<div class="testimonials-track">${
    WORK_PRINCIPLES.map(p => {
      const title = currentLang === 'hi' ? p.titleHi : p.titleEn;
      const role = currentLang === 'hi' ? p.roleHi : p.roleEn;
      const text = currentLang === 'hi' ? p.textHi : p.textEn;
      return `
        <div class="testimonial-card">
          <div class="testimonial-service-badge" style="background: var(--primary-bg); color: var(--primary); font-weight: 800;">${p.badge}</div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin: 10px 0 6px;">${title}</h4>
          <p class="testimonial-text" style="font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary);">${text}</p>
          <div class="testimonial-author" style="margin-top: 14px; border-top: 1px dashed var(--glass-border); padding-top: 10px;">
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--saffron);">
              ✨ ${role}
            </div>
          </div>
        </div>
      `;
    }).join('')
  }</div>`;

  // Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = WORK_PRINCIPLES.map((_, i) =>
      `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Principle ${i + 1}"></button>`
    ).join('');
    dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.getAttribute('data-idx'))));
    });
  }

  carouselIndex = 0;
  startCarousel();
}

function goToSlide(idx) {
  const track = document.querySelector('.testimonials-track');
  if (!track) return;
  carouselIndex = idx;
  const cardWidth = track.querySelector('.testimonial-card')?.offsetWidth || 340;
  const gap = 24;
  track.style.transform = `translateX(-${carouselIndex * (cardWidth + gap)}px)`;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });
}

function startCarousel() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    const next = (carouselIndex + 1) % WORK_PRINCIPLES.length;
    goToSlide(next);
  }, 4000);
}

function setupTestimonialCarousel() {
  renderTestimonials();
}

// ══════════════════════════════════════════════════════
//  FAQ ACCORDION
// ══════════════════════════════════════════════════════
function renderFAQs() {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = CONFIG.faqs.map((faq) => {
    const q = currentLang === 'hi' ? faq.qHi : faq.qEn;
    const a = currentLang === 'hi' ? faq.aHi : faq.aEn;

    return `
      <div class="faq-item">
        <div class="faq-question">
          <span class="faq-q-text">${q}</span>
          <svg class="faq-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
        <div class="faq-answer"><p>${a}</p></div>
      </div>
    `;
  }).join('');

  // Attach accordion toggle
  container.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all others
      container.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });
}

// ══════════════════════════════════════════════════════
//  URGENCY BANNER CLOSE
// ══════════════════════════════════════════════════════
function setupUrgencyBanner() {
  const closeBtn = document.getElementById('urgency-close');
  const banner = document.getElementById('urgency-banner');
  if (!closeBtn || !banner) return;

  // If already dismissed in this session, hide
  if (sessionStorage.getItem('urgency_dismissed')) {
    banner.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', () => {
    banner.style.height = banner.offsetHeight + 'px';
    banner.style.transition = 'height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
    requestAnimationFrame(() => {
      banner.style.height = '0';
      banner.style.opacity = '0';
      banner.style.padding = '0';
      banner.style.overflow = 'hidden';
    });
    setTimeout(() => banner.remove(), 320);
    sessionStorage.setItem('urgency_dismissed', '1');
  });
}

// ══════════════════════════════════════════════════════
//  INDUSTRY STRIP (decorative — highlight services)
// ══════════════════════════════════════════════════════
function setupIndustryStrip() {
  const chips = document.querySelectorAll('.ind-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

// ══════════════════════════════════════════════════════
//  WHATSAPP TOOLTIP TIMER (show after 3s)
// ══════════════════════════════════════════════════════
function setupWATooltipTimer() {
  const wa = document.getElementById('floating-whatsapp-btn');
  if (!wa) return;
  setTimeout(() => {
    wa.classList.add('show-tooltip');
    setTimeout(() => wa.classList.remove('show-tooltip'), 4000);
  }, 3000);
}

// ══════════════════════════════════════════════════════
//  GLOBAL ACTIONS
// ══════════════════════════════════════════════════════
function setupGlobalActions() {
  // Admin panel via keyboard shortcut (Ctrl+Shift+A) or footer link
  const triggerAdmin = () => {
    const pin = prompt('Enter Admin PIN:');
    if (pin === '1234') {
      window.dispatchEvent(new CustomEvent('openAdminModal'));
    } else if (pin !== null) {
      alert('Incorrect PIN. Access Denied.');
    }
  };

  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      e.preventDefault();
      triggerAdmin();
    }
  });

  const footerAdminLink = document.getElementById('footer-admin-link');
  if (footerAdminLink) {
    footerAdminLink.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdmin();
    });
  }

  if (window.location.hash === '#admin') {
    setTimeout(triggerAdmin, 500);
  }

  // Floating WhatsApp button
  const floatingWa = document.getElementById('floating-whatsapp-btn');
  if (floatingWa) {
    const defaultMsg = encodeURIComponent(CONFIG.whatsappTemplates.general);
    floatingWa.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}?text=${defaultMsg}`);
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.header')?.offsetHeight || 70;
        const topBarH = document.querySelector('.top-bar')?.offsetHeight || 0;
        const urgencyH = document.querySelector('.urgency-banner')?.offsetHeight || 0;
        const offset = headerH + topBarH + urgencyH + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
}
