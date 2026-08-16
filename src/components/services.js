// Vyapar Digital - Services Component
import { CONFIG } from '../data/config.js';

let activeCategory = 'web-dev';
let currentLang = 'hi'; // 'hi' or 'en'

export function initServices(lang = 'hi') {
  currentLang = lang;
  renderServiceTabs();
  renderServicePackages(activeCategory);
}

export function updateServicesLang(lang) {
  currentLang = lang;
  renderServiceTabs();
  renderServicePackages(activeCategory);
}

function renderServiceTabs() {
  const container = document.getElementById('service-tabs-container');
  if (!container) return;

  container.innerHTML = CONFIG.services.map(svc => {
    const isActive = svc.id === activeCategory;
    const title = currentLang === 'hi' ? svc.titleHi : svc.titleEn;
    const iconName = svc.icon;

    return `
      <button class="service-tab-btn ${isActive ? 'active' : ''}" data-service-id="${svc.id}">
        <i data-lucide="${iconName}"></i>
        <span>${title}</span>
      </button>
    `;
  }).join('');

  // Re-attach tab click events
  container.querySelectorAll('.service-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-service-id');
      renderServiceTabs();
      renderServicePackages(activeCategory);
      if (window.lucide) window.lucide.createIcons();
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

function renderServicePackages(categoryId) {
  const container = document.getElementById('service-packages-container');
  if (!container) return;

  const service = CONFIG.services.find(s => s.id === categoryId);
  if (!service) return;

  container.innerHTML = service.packages.map(pkg => {
    const name = currentLang === 'hi' ? pkg.nameHi : pkg.nameEn;
    const features = currentLang === 'hi' ? pkg.featuresHi : pkg.featuresEn;
    const isFeatured = pkg.isFeatured;
    const orderBtnText = currentLang === 'hi' ? 'व्हाट्सएप पर आर्डर करें' : 'Order on WhatsApp';
    const bookCustomText = currentLang === 'hi' ? 'कस्टम कोटेशन लें' : 'Get Custom Quote';
    
    // WhatsApp direct link generator
    const waText = encodeURIComponent(
      `Namaste Vyapar Digital! Mujhe "${name}" (Price: ₹${pkg.price.toLocaleString('en-IN')}) package ke baare me baat karni hai.`
    );
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}`;

    return `
      <div class="package-card ${isFeatured ? 'featured' : ''}">
        ${isFeatured ? `<div class="featured-ribbon">${currentLang === 'hi' ? 'सबसे ज्यादा लोकप्रिय' : 'Most Popular'}</div>` : ''}
        
        <div class="pkg-header">
          <h3 class="pkg-name">${name}</h3>
          <div class="pkg-price-wrap">
            <span class="pkg-price">₹${pkg.price.toLocaleString('en-IN')}</span>
            <span class="pkg-old-price">₹${pkg.oldPrice.toLocaleString('en-IN')}</span>
          </div>
          <div class="pkg-delivery">
            <i data-lucide="clock" style="width: 16px; height: 16px;"></i>
            <span>${currentLang === 'hi' ? 'डिलीवरी:' : 'Delivery:'} ${pkg.deliveryDays}</span>
          </div>
        </div>

        <ul class="pkg-features">
          ${features.map(f => `
            <li>
              <i data-lucide="check-circle" style="width: 16px; height: 16px;"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>

        <div class="pkg-action">
          <a href="${waUrl}" target="_blank" class="btn btn-whatsapp" style="width: 100%;">
            <svg class="wa-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.179-.176.201-.351.226-.652.075-1.928-.966-3.197-1.722-4.464-3.899-.17-.291-.018-.448.133-.598.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.632-.927-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.91 1.229 3.11.15.201 2.122 3.24 5.141 4.544 2.146.927 2.981.902 4.04.747 1.154-.168 2.458-1.004 2.809-1.973.351-.97 0-.968-.15-1.169-.15-.201-.351-.276-.652-.426z"/><path d="M12.004 0C5.373 0 0 5.373 0 12.004c0 2.116.553 4.103 1.52 5.845L.055 24l6.313-1.656A11.94 11.94 0 0012.004 24c6.63 0 12.004-5.374 12.004-12.004C24.008 5.373 18.634 0 12.004 0zm0 21.84c-1.874 0-3.642-.516-5.166-1.42l-.37-.22-3.842 1.008 1.025-3.743-.241-.384A9.83 9.83 0 012.164 12c0-5.426 4.414-9.84 9.84-9.84 5.426 0 9.84 4.414 9.84 9.84 0 5.426-4.414 9.84-9.84 9.84z"/></svg>
            <span>${orderBtnText}</span>
          </a>
          <button class="btn btn-outline btn-sm book-pkg-btn" data-pkg-id="${pkg.id}" data-pkg-name="${name}" data-pkg-price="${pkg.price}" style="width: 100%;">
            <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
            <span>${bookCustomText}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Handle "Book Custom" click to open intake wizard with pre-selected package
  container.querySelectorAll('.book-pkg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkgName = btn.getAttribute('data-pkg-name');
      const pkgPrice = btn.getAttribute('data-pkg-price');
      window.dispatchEvent(new CustomEvent('openIntakeWizard', {
        detail: { serviceId: categoryId, pkgName, pkgPrice }
      }));
    });
  });

  if (window.lucide) window.lucide.createIcons();
}
