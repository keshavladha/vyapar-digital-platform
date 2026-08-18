// Vyapar Digital - Sarvam.ai Inspired Sovereign Brand Intro Splash Animation (Pure English + Heritage Sculptures)
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

        <!-- Crisp Brand Logo -->
        <div class="sarvam-logo-wrapper">
          <img src="src/assets/logo.png" alt="vyapar digital" class="sarvam-brand-logo">
        </div>

        <!-- Pure English Mission Tagline -->
        <div class="sarvam-brand-tagline">
          <div class="sarvam-tagline-main">
            Empowering Local Businesses with Modern Digital Commerce
          </div>
          <div class="sarvam-tagline-sub">
            From Traditional Commerce to High-Growth Digital Brands
          </div>
        </div>

        <!-- Sleek Hairline Progress Indicator -->
        <div class="sarvam-progress-track">
          <div class="sarvam-progress-fill"></div>
        </div>
      </div>

      <!-- Indian Heritage Sculptures & Architectural Silhouette Strip -->
      <div class="sarvam-sculpture-strip" aria-hidden="true">
        <svg viewBox="0 0 1200 240" fill="none" xmlns="http://www.w3.org/2000/svg" class="sarvam-sculpture-svg">
          <!-- Left Heritage Pillar (Stambha) & Sculpted Arch -->
          <g opacity="0.35" stroke="#C2410C" stroke-width="1.5">
            <rect x="60" y="80" width="36" height="160" rx="4"/>
            <path d="M48 80h60M42 92h72M54 48l24-28 24 28H54z"/>
            <circle cx="78" cy="140" r="10"/>
            <path d="M78 120v40M58 140h40"/>
            <path d="M96 110c40-30 80-10 120 0v130H96V110z"/>
            <!-- Jharokha Arch Details -->
            <path d="M120 160c0-25 20-40 40-40s40 15 40 40v80h-80v-80z"/>
            <path d="M135 160c0-15 12-25 25-25s25 10 25 25"/>
          </g>

          <!-- Center Konark Sun Temple Wheel / Chariot Chakra Motif -->
          <g opacity="0.45" stroke="#EA580C" stroke-width="1.8" class="sarvam-chakra-glow">
            <circle cx="600" cy="170" r="65" stroke-dasharray="4 3"/>
            <circle cx="600" cy="170" r="50"/>
            <circle cx="600" cy="170" r="16"/>
            <!-- 8 Cosmic Spokes (Aras) -->
            <line x1="600" y1="120" x2="600" y2="220"/>
            <line x1="550" y1="170" x2="650" y2="170"/>
            <line x1="565" y1="135" x2="635" y2="205"/>
            <line x1="565" y1="205" x2="635" y2="135"/>
            <!-- Carved Lotus Pedestal Below Wheel -->
            <path d="M520 235c20-15 50-20 80-20s60 5 80 20H520z" fill="rgba(234, 88, 12, 0.08)"/>
            <path d="M540 235c15-8 35-12 60-12s45 4 60 12"/>
          </g>

          <!-- Right Heritage Pillar (Stambha) & Sculpted Arch -->
          <g opacity="0.35" stroke="#C2410C" stroke-width="1.5">
            <rect x="1104" y="80" width="36" height="160" rx="4"/>
            <path d="M1092 80h60M1086 92h72M1098 48l24-28 24 28h-48z"/>
            <circle cx="1122" cy="140" r="10"/>
            <path d="M1122 120v40M1102 140h40"/>
            <path d="M1104 110c-40-30-80-10-120 0v130h120V110z"/>
            <!-- Jharokha Arch Details -->
            <path d="M1004 160c0-25-20-40-40-40s-40 15-40 40v80h80v-80z"/>
            <path d="M989 160c0-15-12-25-25-25s-25 10-25 25"/>
          </g>

          <!-- Intricate Connecting Foundation Mandapa Line -->
          <path d="M0 238h1200" stroke="#D97706" stroke-width="2" opacity="0.5"/>
          <path d="M0 232h1200" stroke="#F59E0B" stroke-width="1" stroke-dasharray="8 6" opacity="0.4"/>
        </svg>
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

  const autoTimer = setTimeout(dismissSplash, 2400);

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
