/*
  Shared Header — hosted at https://quantumtaskai.com/shared-header.js
  Update nav links and colors in this file only.
  All connected apps will reflect changes on next page load.
  Cache: 1 hour (set via .htaccess) — no version bumps needed.
*/

(function () {
  // ─── Guard: prevent double injection (e.g. React hot reload) ───
  if (document.getElementById('sh-header')) return;

  // ─── Config: update nav links here ──────────────────────────────
  var LOGO_URL = 'https://quantumtaskai.com/img/logo.png'; // always absolute — works cross-domain
  var HOME_URL = 'https://quantumtaskai.com';

  var NAV_LINKS = [
    { label: 'Home',               url: 'https://quantumtaskai.com' },
    { label: 'AI Digital Branding', url: 'https://quantumtaskai.com/digital-branding.html' },
    { label: 'Blog',               url: 'https://blog.quantumtaskai.com/' },
    { label: 'Site Auditor',       url: 'https://audit.quantumtaskai.com' },
    
  ];

  // ─── Styles (matches static site css/style.css header) ──────────
  var css = `
    .sh-skip {
      position: absolute;
      top: -100px;
      left: 16px;
      background: #6366f1;
      color: #ffffff;
      font-family: 'Inter', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 6px;
      z-index: 9999;
      transition: top .15s;
      text-decoration: none;
    }
    .sh-skip:focus { top: 16px; }

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
      padding: 6px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .sh-logo img {
      height: 80px;
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
      color: #6366f1;
      background: rgba(99,102,241,0.06);
    }

    .sh-nav a.sh-active {
      color: #4f46e5;
      background: rgba(99,102,241,0.08);
      font-weight: 600;
    }

    .sh-nav a:focus-visible {
      outline: 2px solid #6366f1;
      outline-offset: 2px;
    }

    /* ── CTA Button ── */
    .sh-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: 'Inter', Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      background: linear-gradient(135deg, #f97316, #ef4444);
      padding: 8px 18px;
      border-radius: 8px;
      text-decoration: none;
      white-space: nowrap;
      margin-left: 8px;
      transition: opacity .15s, transform .15s, box-shadow .15s;
      box-shadow: 0 2px 10px rgba(249,115,22,0.35);
    }

    .sh-cta:hover {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: 0 4px 16px rgba(249,115,22,0.45);
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

    .sh-burger:hover { background: rgba(99,102,241,0.06); }

    /* ── Mobile menu ── */
    @media (max-width: 768px) {
      .sh-burger { display: flex; }
      .sh-cta { display: none; }

      .sh-inner { position: relative; }

      .sh-logo img { height: 52px; }

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
  var currentOrigin = window.location.origin; // e.g. https://blog.quantumtaskai.com
  var currentUrl    = window.location.href;

  function isActive(url) {
    try {
      var linkOrigin = new URL(url).origin;
      // If the link is a subdomain root (e.g. https://blog.quantumtaskai.com/)
      // match by origin so any page on that subdomain highlights it
      if (linkOrigin !== HOME_URL && linkOrigin === currentOrigin) return true;
      // For same-domain links match by full URL prefix
      if (url === HOME_URL || url === HOME_URL + '/') {
        return currentOrigin === HOME_URL;
      }
      return currentUrl.indexOf(url) === 0;
    } catch (e) { return false; }
  }

  function buildNavItems() {
    return NAV_LINKS.map(function (link) {
      var cls = isActive(link.url) ? 'sh-active' : '';
      return '<li><a href="' + link.url + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + link.label + '</a></li>';
    }).join('');
  }

  // ─── Build HTML ──────────────────────────────────────────────────
  var headerHTML =
    '<a href="#main-content" class="sh-skip">Skip to content</a>' +
    '<header id="sh-header">' +
      '<div class="sh-inner">' +
        '<a href="' + HOME_URL + '" class="sh-logo">' +
          '<img src="' + LOGO_URL + '" alt="Quantum Tasks AI" height="80" loading="eager" fetchpriority="high">' +
        '</a>' +
        '<nav aria-label="Main navigation">' +
          '<ul class="sh-nav" id="sh-nav">' + buildNavItems() + '</ul>' +
        '</nav>' +
        '<a href="https://audit.quantumtaskai.com" class="sh-cta">Free Audit →</a>' +
        '<button class="sh-burger" id="sh-burger" aria-label="Toggle navigation" aria-expanded="false" aria-controls="sh-nav">' +
          '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
            '<path d="M3 5h16M3 11h16M3 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
    '</header>';

  // ─── Inject header at top of body ───────────────────────────────
  // ─── Inject + wire up hamburger ─────────────────────────────────
  function injectAndInit() {
    if (!document.body) return;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    var burger = document.getElementById('sh-burger');
    var nav    = document.getElementById('sh-nav');
    if (!burger || !nav) return;

    function closeMenu() {
      nav.classList.remove('sh-open');
      burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('sh-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function (e) {
      if (!document.getElementById('sh-header').contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAndInit);
  } else {
    injectAndInit();
  }


})();
