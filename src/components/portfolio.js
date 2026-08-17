// Vyapar Digital - Portfolio & Work Samples Showcase Component
import { CONFIG } from '../data/config.js';

let activeFilter = 'all';
let currentLang = 'hi';

export function initPortfolio(lang = 'hi') {
  currentLang = lang;
  renderPortfolio();
}

export function updatePortfolioLang(lang) {
  currentLang = lang;
  renderPortfolio();
}

function renderPortfolio() {
  const container = document.getElementById('portfolio-container');
  if (!container) return;

  const filteredItems = activeFilter === 'all' 
    ? CONFIG.caseStudies 
    : CONFIG.caseStudies.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', labelEn: 'All Showcase Work', labelHi: 'सभी सैंपल डिज़ाइन्स' },
    { id: 'web-dev', labelEn: 'Websites & Stores', labelHi: 'वेबसाइट & ऑनलाइन दुकान' },
    { id: 'app-build', labelEn: 'Mobile Apps', labelHi: 'मोबाइल ऐप' },
    { id: 'graphic-design', labelEn: 'Festival Posters & Banners', labelHi: 'त्यौहार पोस्टर्स & डिजाइन' },
    { id: 'video-edit', labelEn: 'Instagram Reels & Videos', labelHi: 'इंस्टाग्राम रील्स & वीडियो' }
  ];

  container.innerHTML = `
    <!-- Filter Buttons -->
    <div class="portfolio-filter-bar">
      ${filters.map(f => `
        <button class="filter-btn ${f.id === activeFilter ? 'active' : ''}" data-filter="${f.id}">
          ${currentLang === 'hi' ? f.labelHi : f.labelEn}
        </button>
      `).join('')}
    </div>

    <!-- Portfolio Grid -->
    <div class="portfolio-grid">
      ${filteredItems.map(item => {
        const headline = currentLang === 'hi' ? item.headlineHi : item.headline;
        const conceptDesc = currentLang === 'hi' ? item.conceptDescHi : item.conceptDescEn;
        
        return `
          <div class="portfolio-card">
            <div class="portfolio-img-wrap">
              <!-- Visual Mockup Placeholder / Header Graphic -->
              <div style="text-align: center; color: var(--text-secondary); padding: 22px;">
                <i data-lucide="${getCategoryIcon(item.category)}" style="width: 44px; height: 44px; color: var(--primary-light); margin-bottom: 8px;"></i>
                <div style="font-weight: 800; font-size: 1.1rem; color: #FFF;">${item.clientName}</div>
                <div style="font-size: 0.8rem; color: var(--saffron-light);">${item.serviceUsed}</div>
              </div>
              <span class="badge badge-saffron portfolio-badge">${item.serviceUsed.split('+')[0]}</span>
              <span class="portfolio-city"><i data-lucide="tag" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ${item.city}</span>
            </div>

            <div class="portfolio-body">
              <h4 class="portfolio-headline">${headline}</h4>

              <div class="metrics-pills-row">
                ${item.metrics.map(m => `
                  <span class="metric-pill">
                    <i data-lucide="check" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle; color: #10B981;"></i>
                    ${m}
                  </span>
                `).join('')}
              </div>

              <div class="portfolio-quote" style="background: var(--bg-surface); border-left: 3px solid var(--primary); padding: 10px 12px; border-radius: 6px; font-style: normal; font-size: 0.85rem; color: var(--text-secondary); margin-top: 12px;">
                ${conceptDesc}
                <div style="font-weight: 700; margin-top: 6px; color: ${item.isLive ? 'var(--saffron)' : 'var(--text-primary)'}; font-size: 0.78rem;">
                  ✨ ${item.owner}
                </div>
              </div>

              ${item.isLive ? `
                <div class="portfolio-live-links" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--glass-border);">
                  ${item.liveUrl ? `
                    <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.78rem; padding: 6px 12px; gap: 6px; text-decoration: none; font-weight: 700; color: var(--primary);">
                      <i data-lucide="external-link" style="width: 13px; height: 13px;"></i>
                      <span>www.windsonmotor.com</span>
                    </a>
                  ` : ''}
                  ${item.instagramUrl ? `
                    <a href="${item.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.78rem; padding: 6px 12px; gap: 6px; text-decoration: none; font-weight: 700; color: #E1306C;">
                      <i data-lucide="instagram" style="width: 13px; height: 13px;"></i>
                      <span>@windsonmotor</span>
                    </a>
                  ` : ''}
                  ${item.facebookUrl ? `
                    <a href="${item.facebookUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.78rem; padding: 6px 12px; gap: 6px; text-decoration: none; font-weight: 700; color: #1877F2;">
                      <i data-lucide="facebook" style="width: 13px; height: 13px;"></i>
                      <span>Facebook</span>
                    </a>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach filter event listeners
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-filter');
      renderPortfolio();
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'web-dev': return 'globe';
    case 'app-build': return 'smartphone';
    case 'graphic-design': return 'palette';
    case 'video-edit': return 'video';
    default: return 'layers';
  }
}
