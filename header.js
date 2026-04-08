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
  var LOGO_URL  = (function() {
    // Works locally and on live domain without hardcoding
    var base = window.location.origin;
    return base + '/img/logo.png';
  })();
  var HOME_URL  = 'https://quantumtaskai.com';

  var NAV_LINKS = [
    { label: 'Home',               url: 'https://quantumtaskai.com' },
    { label: 'AI Digital Branding', url: 'https://quantumtaskai.com/digital-branding.html' },
    { label: 'Blog',               url: 'https://blog.quantumtaskai.com/' },
  ];

  // ─── Styles (matches static site css/style.css header) ──────────
  var css = `
    #sh-header {
      background: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1030;
      box-sizing: border-box;
      font-family: 'Inter', Arial, sans-serif;
    }

    .sh-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sh-logo img {
      height: 60px;
      width: auto;
      display: block;
    }

    .sh-nav {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sh-nav a {
      color: #6b7280;
      font-size: 15px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 6px;
      text-decoration: none;
      white-space: nowrap;
      transition: color .15s, background .15s;
    }

    .sh-nav a:hover {
      color: #3b82f6;
      background: rgba(59,130,246,0.05);
    }

    .sh-nav a.sh-active {
      color: #1d4ed8;
      background: rgba(59,130,246,0.08);
      font-weight: 600;
    }

    .sh-nav a:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }

    /* ── Hamburger ── */
    .sh-burger {
      display: none;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      color: #6b7280;
      transition: background .15s;
    }

    .sh-burger:hover { background: rgba(59,130,246,0.05); }

    /* ── Mobile menu ── */
    @media (max-width: 768px) {
      .sh-burger { display: flex; }

      .sh-inner { position: relative; }

      .sh-logo img { height: 40px; }

      .sh-nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        border-top: 1px solid #e5e7eb;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        flex-direction: column;
        align-items: stretch;
        padding: 12px 16px;
        gap: 2px;
      }

      .sh-nav.sh-open { display: flex; }

      .sh-nav a { padding: 10px 14px; }
    }
  `;

  // ─── Inject styles ───────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.id = 'sh-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── Detect active link ──────────────────────────────────────────
  var currentUrl = window.location.href;

  function isActive(url) {
    if (url === HOME_URL) {
      return currentUrl === url || currentUrl === url + '/' || currentUrl === url + '/index.html';
    }
    return currentUrl.indexOf(url) === 0;
  }

  function buildNavItems() {
    return NAV_LINKS.map(function (link) {
      var cls = isActive(link.url) ? 'sh-active' : '';
      return '<li><a href="' + link.url + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + link.label + '</a></li>';
    }).join('');
  }

  // ─── Build HTML ──────────────────────────────────────────────────
  var headerHTML =
    '<header id="sh-header">' +
      '<div class="sh-inner">' +
        '<a href="' + HOME_URL + '" class="sh-logo">' +
          '<img src="' + LOGO_URL + '" alt="Quantum Tasks AI" height="60">' +
        '</a>' +
        '<nav aria-label="Main navigation">' +
          '<ul class="sh-nav" id="sh-nav">' + buildNavItems() + '</ul>' +
        '</nav>' +
        '<button class="sh-burger" id="sh-burger" aria-label="Toggle navigation" aria-expanded="false">' +
          '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
            '<path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  // ─── Inject header at top of body ───────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // ─── Hamburger logic ─────────────────────────────────────────────
  var burger = document.getElementById('sh-burger');
  var nav    = document.getElementById('sh-nav');

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('sh-open');
    burger.setAttribute('aria-expanded', open);
  });

  document.addEventListener('click', function (e) {
    if (!document.getElementById('sh-header').contains(e.target)) {
      nav.classList.remove('sh-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      nav.classList.remove('sh-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('sh-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  console.log('Shared header loaded ✓');
})();
