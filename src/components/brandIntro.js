// Vyapar Digital - Sarvam.ai Inspired Sovereign Brand Intro Splash Animation (Pure English + Authentic Indian Heritage Art)
export function initBrandIntro() {
  let splash = document.getElementById('brand-intro-splash');
  if (!splash) {
    splash = document.createElement('div');
    splash.id = 'brand-intro-splash';
    splash.className = 'brand-intro-splash';

    splash.innerHTML = `
      <div class="sarvam-bg-ambient"></div>
      <div class="sarvam-concentric-rings"></div>

      <div class="sarvam-intro-content">
        <!-- Sovereign Heritage Insignia -->
        <div class="sarvam-insignia">
          <span class="sarvam-motif">✦</span>
          <span class="sarvam-insignia-text">INDIA'S SOVEREIGN DIGITAL STUDIO</span>
          <span class="sarvam-motif">✦</span>
        </div>

        <!-- Big, Majestic Official Brand Logo (Icon + Name) -->
        <div class="sarvam-logo-wrapper">
          <img src="src/assets/logo.png" alt="vyapar digital" class="sarvam-brand-logo">
        </div>

        <!-- Pure English Mission Tagline -->
        <div class="sarvam-brand-tagline">
          <div class="sarvam-tagline-main">
            Empowering Local Businesses with Modern Digital Commerce
          </div>
          <div class="sarvam-tagline-sub">
            Websites • Mobile Apps • Festival Creatives • Viral Reels
          </div>
        </div>

        <!-- Sleek Hairline Progress Indicator -->
        <div class="sarvam-progress-track">
          <div class="sarvam-progress-fill"></div>
        </div>
      </div>

      <!-- Authentic Indian Heritage Art & Sage Architecture Panorama (User Selected) -->
      <div class="sarvam-real-sculptures" aria-hidden="true">
        <img src="src/assets/indian-heritage-art.png" alt="Indian Heritage Monuments & Ancient Scholar" class="sarvam-heritage-art-img">
      </div>

      <!-- Minimalist Skip Button -->
      <button id="intro-skip-btn" class="sarvam-skip-btn" aria-label="Skip Intro">
        <span>Skip</span> ✕
      </button>
    `;

    document.body.prepend(splash);
  }

  document.body.classList.add('intro-playing');

  const dismissSplash = () => {
    if (!splash || splash.classList.contains('intro-dismissed')) return;
    splash.classList.add('intro-dismissed');
    document.body.classList.remove('intro-playing');
    
    setTimeout(() => {
      if (splash && splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 500);
  };

  const autoTimer = setTimeout(dismissSplash, 2600);

  const skipBtn = document.getElementById('intro-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      dismissSplash();
    });
  }

  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      clearTimeout(autoTimer);
      dismissSplash();
      window.removeEventListener('keydown', keyHandler);
    }
  };
  window.addEventListener('keydown', keyHandler);
}
