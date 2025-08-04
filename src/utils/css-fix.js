// Force CSS injection as a failsafe
export function injectCriticalCSS() {
  // Check if our CSS is already injected
  if (document.getElementById('yamaha-critical-css')) return;

  const criticalCSS = `
    /* CRITICAL: Force dark theme */
    html, body {
      background-color: #0A0A0A !important;
      color: #FFFFFF !important;
      margin: 0;
      padding: 0;
    }
    
    #root {
      min-height: 100vh;
      background-color: #0A0A0A !important;
    }
    
    /* Ensure all Tailwind dark utilities work */
    .bg-black { background-color: #000000 !important; }
    .bg-gray-900 { background-color: #111827 !important; }
    .bg-gray-950 { background-color: #030712 !important; }
    .text-white { color: #FFFFFF !important; }
    .text-gray-300 { color: #D1D5DB !important; }
    .text-gray-400 { color: #9CA3AF !important; }
    
    /* Glass morphism effects */
    .backdrop-blur-sm { backdrop-filter: blur(4px) !important; }
    .backdrop-blur-md { backdrop-filter: blur(12px) !important; }
    .backdrop-blur-lg { backdrop-filter: blur(16px) !important; }
    
    /* Gradient backgrounds */
    .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)) !important; }
    .from-red-500 { --tw-gradient-from: #EF4444 !important; }
    .to-blue-500 { --tw-gradient-to: #3B82F6 !important; }
    
    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
    ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: #b91c1c; }
  `;

  const styleElement = document.createElement('style');
  styleElement.id = 'yamaha-critical-css';
  styleElement.innerHTML = criticalCSS;
  document.head.appendChild(styleElement);

  // Also force body styles directly
  document.body.style.backgroundColor = '#0A0A0A';
  document.body.style.color = '#FFFFFF';
  document.documentElement.style.backgroundColor = '#0A0A0A';
  document.documentElement.classList.add('dark');

  // Log injection for debugging
  console.log('[Yamaha] Critical CSS injected successfully');
}

// CSS Load Monitor
export function monitorCSSLoad() {
  const checkCSS = () => {
    const sheets = Array.from(document.styleSheets);
    const cssLoaded = sheets.some(sheet => {
      try {
        return sheet.href && (sheet.href.includes('.css') || sheet.cssRules.length > 0);
      } catch (e) {
        return false;
      }
    });

    console.log('[Yamaha] CSS Load Status:', {
      totalSheets: sheets.length,
      cssLoaded,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      sheets: sheets.map(s => s.href || 'inline')
    });

    // If CSS not loaded after 2 seconds, force inject
    if (!cssLoaded) {
      setTimeout(() => {
        console.warn('[Yamaha] CSS failed to load, injecting critical styles...');
        injectCriticalCSS();
      }, 2000);
    }
  };

  // Check on load and after a delay
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCSS);
  } else {
    checkCSS();
  }
}

// Production CSS Fixer
export function fixProductionCSS() {
  // Always inject critical CSS in production
  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    injectCriticalCSS();
    monitorCSSLoad();
  }
}