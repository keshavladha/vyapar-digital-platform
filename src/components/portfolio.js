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
          <div class="portfolio-card" style="max-width: 840px; width: 100%; border: 1.5px solid var(--primary-light); box-shadow: 0 16px 44px rgba(30, 64, 175, 0.12); border-radius: 20px; overflow: hidden;">
            <div class="portfolio-img-wrap" style="position: relative; height: 340px; overflow: hidden; background: #0B0F19;">
              <img src="src/assets/windson-showcase.jpg" alt="Windson Motor Official Website and Social Media Showcase" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" loading="eager">
              <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 45%, rgba(0,0,0,0.15) 100%);"></div>
              
              <div style="position: absolute; bottom: 18px; left: 22px; right: 22px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <div style="font-weight: 900; font-size: 1.45rem; color: #FFFFFF; text-shadow: 0 2px 8px rgba(0,0,0,0.7);">${item.clientName}</div>
                  <div style="font-size: 0.88rem; color: var(--saffron-light); font-weight: 700; text-shadow: 0 1px 4px rgba(0,0,0,0.7); margin-top: 2px;">${item.serviceUsed}</div>
                </div>
              </div>

              <span class="badge badge-saffron portfolio-badge" style="position: absolute; top: 16px; left: 16px; font-weight: 800; font-size: 0.8rem; box-shadow: 0 4px 12px rgba(0,0,0,0.35);">⭐ ${currentLang === 'hi' ? 'लाइव क्लाइंट प्रोजेक्ट' : 'Live Client Project'}</span>
              <span class="portfolio-city" style="position: absolute; top: 16px; right: 16px; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px); color: #FFF; border: 1px solid rgba(255,255,255,0.25); padding: 5px 12px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                <i data-lucide="tag" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> ${item.city}
              </span>
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
