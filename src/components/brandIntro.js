// Vyapar Digital - Premium 2-3 Second Brand Intro Splash Animation
export function initBrandIntro(currentLang = 'hi') {
  let splash = document.getElementById('brand-intro-splash');
  if (!splash) {
    splash = document.createElement('div');
    splash.id = 'brand-intro-splash';
    splash.className = 'brand-intro-splash';

    splash.innerHTML = `
      <div class="intro-backdrop"></div>
      <div class="intro-ambient-glow intro-glow-saffron"></div>
      <div class="intro-ambient-glow intro-glow-blue"></div>

      <div class="intro-content">
        <!-- Animated Logo Emblem with Radiant Glow -->
        <div class="intro-logo-wrap">
          <div class="intro-pulse-ring"></div>
          <div class="intro-pulse-ring-2"></div>
          <img src="src/assets/logo.png" alt="Vyapar Digital Logo" class="intro-logo-img">
        </div>

        <!-- High-Impact Brand Wordmark Reveal -->
        <div class="intro-brand-title">
          <div class="intro-brand-hindi">व्यापार DIGITAL</div>
          <div class="intro-brand-en">VYAPAR DIGITAL</div>
        </div>

        <!-- Tagline / Mission Pledge -->
        <div class="intro-tagline">
          <span class="intro-flag">🇮🇳</span>
          <span class="intro-tagline-text">
            ${currentLang === 'hi' ? 'भारत के लोकल व्यापारियों का अपना डिजिटल स्टूडियो' : "India's Dedicated Digital Studio for Local Businesses"}
          </span>
        </div>

        <!-- Animated Shimmer Progress Bar (Exact 2.6s Timing) -->
        <div class="intro-progress-track">
          <div class="intro-progress-bar"></div>
        </div>
      </div>

      <!-- Quick Skip Button for Repeat / Impatient Users -->
      <button id="intro-skip-btn" class="intro-skip-btn" aria-label="Skip Intro Animation">
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
    
    // Remove element after smooth fade out
    setTimeout(() => {
      if (splash && splash.parentNode) {
        splash.parentNode.removeChild(splash);
      }
    }, 600);
  };

  // Auto dismiss after 2.6 seconds
  const autoTimer = setTimeout(dismissSplash, 2600);

  // Skip button click handler
  const skipBtn = document.getElementById('intro-skip-btn');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearTimeout(autoTimer);
      dismissSplash();
    });
  }

  // Also dismiss if user presses Escape
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      clearTimeout(autoTimer);
      dismissSplash();
      window.removeEventListener('keydown', keyHandler);
    }
  };
  window.addEventListener('keydown', keyHandler);
}
