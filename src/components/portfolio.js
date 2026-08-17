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

  const items = CONFIG.caseStudies;

  container.innerHTML = `
    <!-- Portfolio Featured Grid -->
    <div class="portfolio-grid" style="display: flex; justify-content: center;">
      ${items.map(item => {
        const headline = currentLang === 'hi' ? item.headlineHi : item.headline;
        const conceptDesc = currentLang === 'hi' ? item.conceptDescHi : item.conceptDescEn;
        
        return `
          <div class="portfolio-card" style="max-width: 720px; width: 100%; border: 1.5px solid var(--primary-light); box-shadow: 0 12px 36px rgba(30, 64, 175, 0.08);">
            <div class="portfolio-img-wrap" style="background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);">
              <!-- Visual Mockup Placeholder / Header Graphic -->
              <div style="text-align: center; color: var(--text-secondary); padding: 28px 20px;">
                <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; border: 1px solid rgba(255, 255, 255, 0.2);">
                  <i data-lucide="globe" style="width: 28px; height: 28px; color: #60A5FA;"></i>
                </div>
                <div style="font-weight: 900; font-size: 1.35rem; color: #FFFFFF; letter-spacing: -0.01em;">${item.clientName}</div>
                <div style="font-size: 0.85rem; color: var(--saffron-light); font-weight: 700; margin-top: 4px;">${item.serviceUsed}</div>
              </div>
              <span class="badge badge-saffron portfolio-badge" style="font-weight: 800; font-size: 0.78rem;">⭐ ${currentLang === 'hi' ? 'लाइव प्रोजेक्ट' : 'Live Client Project'}</span>
              <span class="portfolio-city"><i data-lucide="tag" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ${item.city}</span>
            </div>

            <div class="portfolio-body" style="padding: 24px;">
              <h4 class="portfolio-headline" style="font-size: 1.15rem; line-height: 1.4; margin-bottom: 14px;">${headline}</h4>

              <div class="metrics-pills-row" style="margin-bottom: 16px;">
                ${item.metrics.map(m => `
                  <span class="metric-pill" style="font-size: 0.82rem; padding: 6px 12px;">
                    <i data-lucide="check-circle-2" style="width: 13px; height: 13px; display: inline-block; vertical-align: middle; color: #10B981;"></i>
                    ${m}
                  </span>
                `).join('')}
              </div>

              <div class="portfolio-quote" style="background: var(--bg-surface); border-left: 3.5px solid var(--primary); padding: 14px 16px; border-radius: 8px; font-style: normal; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                ${conceptDesc}
                <div style="font-weight: 800; margin-top: 8px; color: var(--saffron); font-size: 0.82rem;">
                  ✨ ${item.owner}
                </div>
              </div>

              <!-- Live Verification Links -->
              <div class="portfolio-live-links" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; padding-top: 16px; border-top: 1px dashed var(--glass-border);">
                ${item.liveUrl ? `
                  <a href="${item.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.82rem; padding: 8px 14px; gap: 7px; text-decoration: none; font-weight: 800; color: var(--primary); border-color: var(--primary-light);">
                    <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                    <span>www.windsonmotor.com</span>
                  </a>
                ` : ''}
                ${item.instagramUrl ? `
                  <a href="${item.instagramUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.82rem; padding: 8px 14px; gap: 7px; text-decoration: none; font-weight: 800; color: #E1306C; border-color: rgba(225, 48, 108, 0.3);">
                    <i data-lucide="instagram" style="width: 14px; height: 14px;"></i>
                    <span>@windsonmotor (Instagram)</span>
                  </a>
                ` : ''}
                ${item.facebookUrl ? `
                  <a href="${item.facebookUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size: 0.82rem; padding: 8px 14px; gap: 7px; text-decoration: none; font-weight: 800; color: #1877F2; border-color: rgba(24, 119, 242, 0.3);">
                    <i data-lucide="facebook" style="width: 14px; height: 14px;"></i>
                    <span>Facebook Page</span>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

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
