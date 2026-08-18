// Vyapar Digital - Premium Brand Intro Splash Animation (Site Theme Matched)
export function initBrandIntro(currentLang = 'hi') {
  let splash = document.getElementById('brand-intro-splash');
  if (!splash) {
    splash = document.createElement('div');
    splash.id = 'brand-intro-splash';
    splash.className = 'brand-intro-splash';

    splash.innerHTML = `
      <div class="intro-bg-mesh"></div>
      <div class="intro-ambient-saffron"></div>

      <div class="intro-center-card">
        <!-- Official Crisp Brand Logo -->
        <div class="intro-logo-container">
          <div class="intro-aura-pulse"></div>
          <img src="src/assets/logo.png" alt="vyapar digital" class="intro-brand-logo">
        </div>

        <!-- Official Tag Badge -->
        <div class="intro-badge">
          <span class="intro-badge-flag">🇮🇳</span>
          <span class="intro-badge-text">
            ${currentLang === 'hi' ? 'भारत का अपना संप्रभु डिजिटल स्टूडियो' : "India's Sovereign Digital Studio for Local Businesses"}
          </span>
        </div>

        <!-- Signature Brand Headline -->
        <h2 class="intro-headline">
          ${currentLang === 'hi' ? 'अपने लोकल व्यापार को बनाएं <span class="text-saffron">डिजिटल ब्रांड!</span>' : 'Transform Your Local Business Into a <span class="text-saffron">Digital Brand!</span>'}
        </h2>

        <!-- Sleek Saffron Progress Bar -->
        <div class="intro-progress-wrapper">
          <div class="intro-progress-fill"></div>
        </div>
      </div>

      <!-- Skip Button -->
      <button id="intro-skip-btn" class="intro-skip-btn" aria-label="Skip Intro">
        <span>${currentLang === 'hi' ? 'छोड़ें' : 'Skip'}</span> ✕
      </button>
    `;

    document.body.prepend(splash);
  }

  document.body.classList.add('intro-playing');

  // Dismiss animation function
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

  // Auto dismiss after 2.2 seconds
  const autoTimer = setTimeout(dismissSplash, 2200);

  // Skip button click handler
  const skipBtn = document.getElementById('intro-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      dismissSplash();
    });
  }

  // Dismiss on Escape key
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      clearTimeout(autoTimer);
      dismissSplash();
      window.removeEventListener('keydown', keyHandler);
    }
  };
  window.addEventListener('keydown', keyHandler);
}
