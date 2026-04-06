/*
  Shared Header — hosted at https://quantumtaskai.com/header.js
  Update nav links and colors in this file only.
  All connected apps will reflect changes on next page load.
  To bust cache after updates, add ?v=2 to the script src.
*/

(function () {
  // ─── Guard: prevent double injection (e.g. React hot reload) ───
  if (document.getElementById('sh-header')) return;

  // ─── Config: update nav links here ──────────────────────────────
  var NAV_LINKS = [
    { label: 'Home',              url: 'https://quantumtaskai.com' },
    { label: 'AI Digital Branding', url: 'https://quantumtaskai.com/digital-branding.html' },
    { label: 'Blog',              url: 'https://blog.quantumtaskai.com/' },
  ];

  // ─── Styles ──────────────────────────────────────────────────────
  var css = `
    :root {
      --sh-bg:     #0a0e1a;
      --sh-accent: #3b82f6;
      --sh-text:   #ffffff;
    }

    #sh-header {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 64px;
      background: var(--sh-bg);
      z-index: 99999;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .sh-inner {
      max-width: 1200px;
      margin: 0 auto;
      height: 100%;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sh-logo {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--sh-accent);
      text-decoration: none;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    .sh-logo:hover {
      color: var(--sh-accent);
      opacity: 0.85;
    }

    .sh-nav {
      display: flex;
      align-items: center;
      gap: 8px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sh-nav a {
      color: var(--sh-text);
      text-decoration: none;
      font-size: 0.92rem;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: 6px;
      transition: background 0.18s, color 0.18s;
      white-space: nowrap;
    }

    .sh-nav a:hover {
      background: rgba(59, 130, 246, 0.15);
      color: var(--sh-accent);
    }

    .sh-nav a.sh-active {
      color: var(--sh-accent);
      background: rgba(59, 130, 246, 0.12);
    }

    /* ── Hamburger ── */
    .sh-burger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
      border-radius: 6px;
      transition: background 0.18s;
    }

    .sh-burger:hover {
      background: rgba(255,255,255,0.08);
    }

    .sh-burger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--sh-text);
      border-radius: 2px;
      transition: transform 0.22s, opacity 0.22s;
    }

    .sh-burger.sh-open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .sh-burger.sh-open span:nth-child(2) {
      opacity: 0;
    }
    .sh-burger.sh-open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* ── Mobile menu ── */
    .sh-mobile-menu {
      display: none;
      position: absolute;
      top: 64px;
      left: 0;
      width: 100%;
      background: var(--sh-bg);
      padding: 12px 0 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }

    .sh-mobile-menu.sh-open {
      display: block;
    }

    .sh-mobile-menu a {
      display: block;
      color: var(--sh-text);
      text-decoration: none;
      font-size: 0.98rem;
      font-weight: 500;
      padding: 12px 28px;
      transition: background 0.15s, color 0.15s;
    }

    .sh-mobile-menu a:hover {
      background: rgba(59, 130, 246, 0.12);
      color: var(--sh-accent);
    }

    .sh-mobile-menu a.sh-active {
      color: var(--sh-accent);
    }

    @media (max-width: 768px) {
      #sh-header {
        height: 56px;
      }

      .sh-nav {
        display: none;
      }

      .sh-burger {
        display: flex;
      }

      .sh-mobile-menu {
        top: 56px;
      }
    }
  `;

  // ─── Inject styles ───────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.id = 'sh-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── Detect active link ──────────────────────────────────────────
  var currentUrl = window.location.href;

  function buildNavItems(isMobile) {
    return NAV_LINKS.map(function (link) {
      var isActive = currentUrl === link.url ||
                     (link.url !== 'https://quantumtaskai.com' && currentUrl.indexOf(link.url) === 0);
      var activeClass = isActive ? ' sh-active' : '';
      if (isMobile) {
        return '<a href="' + link.url + '" class="' + activeClass.trim() + '">' + link.label + '</a>';
      }
      return '<li><a href="' + link.url + '" class="' + activeClass.trim() + '">' + link.label + '</a></li>';
    }).join('');
  }

  // ─── Build HTML ──────────────────────────────────────────────────
  var headerHTML = `
    <header id="sh-header">
      <div class="sh-inner">
        <a href="https://quantumtaskai.com" class="sh-logo">Quantum Tasks AI</a>
        <nav aria-label="Main navigation">
          <ul class="sh-nav">` + buildNavItems(false) + `</ul>
        </nav>
        <button class="sh-burger" id="sh-burger" aria-label="Toggle menu" aria-expanded="false" aria-controls="sh-mobile-menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav class="sh-mobile-menu" id="sh-mobile-menu" aria-label="Mobile navigation">
        ` + buildNavItems(true) + `
      </nav>
    </header>
  `;

  // ─── Inject header at top of body ───────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // ─── Hamburger logic ─────────────────────────────────────────────
  var burger = document.getElementById('sh-burger');
  var mobileMenu = document.getElementById('sh-mobile-menu');

  function openMenu() {
    burger.classList.add('sh-open');
    mobileMenu.classList.add('sh-open');
    burger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    burger.classList.remove('sh-open');
    mobileMenu.classList.remove('sh-open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.classList.contains('sh-open') ? closeMenu() : openMenu();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!document.getElementById('sh-header').contains(e.target)) {
      closeMenu();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  console.log('Shared header loaded ✓');
})();
