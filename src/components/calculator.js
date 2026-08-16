// Vyapar Digital - Interactive Rate Calculator ("Apna Budget Chuniye")
import { CONFIG } from '../data/config.js';

let currentLang = 'hi';
let selectedBusinessType = 'shop';

// Available items in calculator
const CALC_ITEMS = [
  { id: 'web-store', nameEn: 'WhatsApp Catalog & Website', nameHi: 'व्हाट्सएप कैटलॉग & वेबसाइट', price: 3999, default: true },
  { id: 'graphic-festival', nameEn: '20 Monthly Festival Posters', nameHi: '20 मासिक त्यौहार पोस्टर्स', price: 1499, default: true },
  { id: 'video-reels', nameEn: '10 Viral Local Reels Package', nameHi: '10 वायरल इंस्टाग्राम रील्स', price: 3999, default: false },
  { id: 'graphic-branding', nameEn: 'Complete Shop Logo & Visiting Card', nameHi: 'दुकान का लोगो & विजिटिंग कार्ड', price: 1999, default: false },
  { id: 'app-basic', nameEn: 'Custom Android Business App', nameHi: 'कस्टम एंड्रॉइड मोबाइल ऐप', price: 14999, default: false },
  { id: 'addon-seo', nameEn: 'Google My Business & Map SEO Setup', nameHi: 'गूगल मैप & लोकल SEO सेटअप', price: 999, default: true },
  { id: 'addon-express', nameEn: 'Express 48-Hour Rush Delivery', nameHi: '48 घंटे में सुपरफास्ट डिलीवरी', price: 999, default: false }
];

let selectedItemIds = new Set(['web-store', 'graphic-festival', 'addon-seo']);

const BIZ_TYPES = [
  { id: 'shop', nameEn: 'Retail Shop / Showroom', nameHi: 'दुकान / शोरूम' },
  { id: 'coaching', nameEn: 'Coaching / Academy', nameHi: 'कोचिंग / ट्यूशन सेंटर' },
  { id: 'clinic', nameEn: 'Clinic / Hospital', nameHi: 'डॉक्टर / क्लिनिक' },
  { id: 'gym', nameEn: 'Gym / Fitness', nameHi: 'जिम / फिटनेस सेंटर' },
  { id: 'restaurant', nameEn: 'Restaurant / Cafe / Sweets', nameHi: 'होटल / रेस्टोरेंट / मिठाई' },
  { id: 'creator', nameEn: 'Local Creator / Influencer', nameHi: 'यूट्यूबर / रील्स क्रिएटर' }
];

export function initCalculator(lang = 'hi') {
  currentLang = lang;
  renderCalculator();
}

export function updateCalculatorLang(lang) {
  currentLang = lang;
  renderCalculator();
}

function renderCalculator() {
  const container = document.getElementById('calculator-container');
  if (!container) return;

  const total = calculateTotal();
  const selectedItems = CALC_ITEMS.filter(item => selectedItemIds.has(item.id));
  const activeBiz = BIZ_TYPES.find(b => b.id === selectedBusinessType);
  const activeBizName = currentLang === 'hi' ? activeBiz.nameHi : activeBiz.nameEn;

  // Format items text for WhatsApp
  const itemsTextSummary = selectedItems
    .map(i => `• ${currentLang === 'hi' ? i.nameHi : i.nameEn}: ₹${i.price.toLocaleString('en-IN')}`)
    .join('\n');

  const waMessage = CONFIG.whatsappTemplates.calculator(activeBizName, total, itemsTextSummary);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  container.innerHTML = `
    <div class="calculator-grid">
      <!-- Left Column: Interactive Selectors -->
      <div class="calc-left">
        <!-- Step 1: Select Business Type -->
        <div>
          <div class="calc-group-title">
            <i data-lucide="store" style="color: var(--saffron);"></i>
            <span>${currentLang === 'hi' ? '1. अपना व्यापार / केटेगरी चुनिए:' : '1. Select Your Business Type:'}</span>
          </div>
          <div class="biz-selector-grid">
            ${BIZ_TYPES.map(biz => `
              <div class="biz-chip ${biz.id === selectedBusinessType ? 'active' : ''}" data-biz-id="${biz.id}">
                ${currentLang === 'hi' ? biz.nameHi : biz.nameEn}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Step 2: Choose Deliverables & Add-ons -->
        <div>
          <div class="calc-group-title">
            <i data-lucide="check-square" style="color: var(--primary-light);"></i>
            <span>${currentLang === 'hi' ? '2. आपको क्या-क्या सुविधाएं चाहिए:' : '2. Select Required Services & Features:'}</span>
          </div>
          <div class="calc-options-list">
            ${CALC_ITEMS.map(item => {
              const isChecked = selectedItemIds.has(item.id);
              const itemName = currentLang === 'hi' ? item.nameHi : item.nameEn;
              return `
                <div class="calc-option-row" data-item-id="${item.id}">
                  <div class="calc-option-left">
                    <input type="checkbox" class="calc-checkbox" ${isChecked ? 'checked' : ''} data-item-id="${item.id}">
                    <span style="font-weight: 600;">${itemName}</span>
                  </div>
                  <div class="calc-option-price">+ ₹${item.price.toLocaleString('en-IN')}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Right Column: Live Price & Instant WhatsApp Quotation -->
      <div class="calc-right">
        <div class="calc-summary-card">
          <div class="calc-summary-header">
            <span class="badge badge-saffron">${currentLang === 'hi' ? 'अनुमानित कोटेशन' : 'Instant Estimate'}</span>
            <h3 style="font-size: 1.3rem; margin-top: 8px;">${activeBizName}</h3>
          </div>

          <div class="calc-selected-items-list">
            ${selectedItems.map(item => `
              <li class="calc-item-pill">
                <span>${currentLang === 'hi' ? item.nameHi : item.nameEn}</span>
                <span style="font-weight: 600; color: var(--text-primary);">₹${item.price.toLocaleString('en-IN')}</span>
              </li>
            `).join('')}
          </div>

          <div class="calc-total-row">
            <div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">${currentLang === 'hi' ? 'कुल अनुमानित राशि:' : 'Total Estimated Cost:'}</div>
              <div style="font-size: 0.75rem; color: var(--whatsapp);">${currentLang === 'hi' ? '✓ कोई छुपा हुआ चार्ज नहीं' : '✓ Zero Hidden Charges'}</div>
            </div>
            <div class="calc-total-price">₹${total.toLocaleString('en-IN')}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
            <a href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-lg" style="width: 100%;">
              <i data-lucide="message-circle" style="width: 20px; height: 20px;"></i>
              <span>${currentLang === 'hi' ? 'व्हाट्सएप पर कोटेशन प्राप्त करें' : 'Get Quote on WhatsApp'}</span>
            </a>
            <button class="btn btn-outline book-calc-quote-btn" style="width: 100%;">
              <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
              <span>${currentLang === 'hi' ? 'सीधे प्रोजेक्ट बुक करें' : 'Book Project Directly'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners for business type selector
  container.querySelectorAll('.biz-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      selectedBusinessType = chip.getAttribute('data-biz-id');
      renderCalculator();
    });
  });

  // Attach event listeners for checkboxes
  container.querySelectorAll('.calc-option-row').forEach(row => {
    row.addEventListener('click', (e) => {
      // Toggle if not clicked directly on checkbox
      const itemId = row.getAttribute('data-item-id');
      if (e.target.type !== 'checkbox') {
        if (selectedItemIds.has(itemId)) {
          selectedItemIds.delete(itemId);
        } else {
          selectedItemIds.add(itemId);
        }
      } else {
        if (e.target.checked) {
          selectedItemIds.add(itemId);
        } else {
          selectedItemIds.delete(itemId);
        }
      }
      renderCalculator();
    });
  });

  // Handle Book Directly
  const bookBtn = container.querySelector('.book-calc-quote-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('openIntakeWizard', {
        detail: {
          businessType: activeBizName,
          totalPrice: total,
          items: selectedItems.map(i => currentLang === 'hi' ? i.nameHi : i.nameEn).join(', ')
        }
      }));
    });
  }

  if (window.lucide) window.lucide.createIcons();
}

function calculateTotal() {
  let sum = 0;
  CALC_ITEMS.forEach(item => {
    if (selectedItemIds.has(item.id)) {
      sum += item.price;
    }
  });
  return sum;
}
