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
            <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
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
