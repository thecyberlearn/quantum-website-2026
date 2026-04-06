# Shared Header System

One header file. Three apps. Zero duplication.

## How It Works

```
header.js  (hosted on your main static site)
    │
    ├── Static HTML site      →  <script src="/header.js">
    ├── Django app            →  <script src="https://yoursite.com/header.js">
    └── React / Next.js app   →  <SharedHeader /> component
```

When `header.js` loads in any app, it:
1. Injects a `<style>` block into `<head>`
2. Injects the header HTML at the top of `<body>`
3. Attaches hamburger toggle logic for mobile
4. Highlights the active nav link based on the current URL

---

## Step 1 — Host header.js on Your Static Site

Copy `header.js` to the root of your static site so it's accessible at:
```
https://yoursite.com/header.js
```

---

## Step 2 — Static HTML Setup

Add one line anywhere in `<body>`:

```html
<script src="https://yoursite.com/header.js"></script>
```

See `static-site-example.html` for a full working example.

---

## Step 3 — Django Setup

In your `base.html` template, add after `{% load static %}`:

```html
<script src="https://yoursite.com/header.js"></script>
```

All templates that extend `base.html` automatically get the header.
See `django-base.html` for a full base template example.

---

## Step 4 — React / Next.js Setup

**1. Copy the component** to your project:
```
src/components/SharedHeader.jsx   (from react-SharedHeader.jsx)
```

**2. Add it to your root layout** (from `react-layout-example.jsx`):
```jsx
import SharedHeader from '@/components/SharedHeader';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SharedHeader />
        <main style={{ paddingTop: '64px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
```

---

## Updating Nav Links

Edit the `NAV_LINKS` array at the top of `header.js`:

```js
var NAV_LINKS = [
  { label: 'Home',    url: 'https://yoursite.com' },
  { label: 'About',   url: 'https://yoursite.com/about' },
  // add or remove items here
];
```

All connected apps reflect the change on next page load. No deploys needed for Django or React — they load the script remotely.

---

## Updating Colors

Edit the CSS variables near the top of `header.js`:

```css
:root {
  --sh-bg:     #0a0e1a;   /* background */
  --sh-accent: #3b82f6;   /* accent / active color */
  --sh-text:   #ffffff;   /* nav link text */
}
```

---

## Adding a New App

Any app — PHP, Ruby, Vue, plain HTML — needs exactly one line:

```html
<script src="https://yoursite.com/header.js"></script>
```

---

## Cache Busting After Updates

When you update `header.js`, browsers may serve the old cached version.
Append a version query param to force a fresh fetch:

```html
<!-- bump ?v= each time you update header.js -->
<script src="https://yoursite.com/header.js?v=2"></script>
```

Update this in all three places (static HTML, Django base template, `SharedHeader.jsx`).

---

## Troubleshooting

**Header not showing?**
- Open browser DevTools → Network tab → check if `header.js` loaded (200 status).
- Check the console for errors.

**CORS error in Django or React?**
- Your static site's server must allow cross-origin requests for JS files.
- In nginx, add to your server block:
  ```nginx
  add_header Access-Control-Allow-Origin "*";
  ```

**Content flashes before header appears?**
- Add `min-height: 64px` to a placeholder div before the script tag, or load the script in `<head>` with `defer`.

**z-index conflict (header appears behind other elements)?**
- The header uses `z-index: 99999`. If something still overlaps it, check for `z-index` or `transform` on a parent element (transforms create new stacking contexts).

**Double header on React hot reload?**
- `header.js` checks `if (document.getElementById('sh-header')) return;` — this prevents double injection automatically.
