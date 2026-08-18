// Vyapar Digital - Sarvam.ai Inspired Sovereign Brand Intro Splash Animation
export function initBrandIntro(currentLang = 'hi') {
  let splash = document.getElementById('brand-intro-splash');
  if (!splash) {
    splash = document.createElement('div');
    splash.id = 'brand-intro-splash';
    splash.className = 'brand-intro-splash';

    splash.innerHTML = `
      <div class="sarvam-bg-ambient"></div>
      <div class="sarvam-concentric-rings"></div>

      <div class="sarvam-intro-content">
        <!-- Sacred Vedic Insignia -->
        <div class="sarvam-insignia">
          <span class="sarvam-motif">𑁍</span>
          <span class="sarvam-insignia-text">व्यापारे वसते लक्ष्मी</span>
          <span class="sarvam-motif">𑁍</span>
        </div>

        <!-- Crisp Brand Logo -->
        <div class="sarvam-logo-wrapper">
          <img src="src/assets/logo.png" alt="vyapar digital" class="sarvam-brand-logo">
        </div>

        <!-- Sovereign Mission Tagline -->
        <div class="sarvam-brand-tagline">
          <div class="sarvam-tagline-main">
            ${currentLang === 'hi' ? 'भारत के लोकल व्यापारियों का संप्रभु डिजिटल स्टूडियो' : "India's Sovereign Digital Studio for Local Businesses"}
          </div>
          <div class="sarvam-tagline-sub">
            ${currentLang === 'hi' ? 'परंपरागत बही-खाता से आधुनिक डिजिटल ब्रांड तक' : 'From Traditional Commerce to Modern Digital Brand'}
          </div>
        </div>

        <!-- Sleek Hairline Progress Indicator -->
        <div class="sarvam-progress-track">
          <div class="sarvam-progress-fill"></div>
        </div>
      </div>

      <!-- Minimalist Skip Button -->
      <button id="intro-skip-btn" class="sarvam-skip-btn" aria-label="Skip Intro">
        <span>${currentLang === 'hi' ? 'छोड़ें' : 'Skip'}</span> ✕
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

  const autoTimer = setTimeout(dismissSplash, 2300);

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
