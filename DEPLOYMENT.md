# Static Website Deployment Guide

## Quick Deployment Options

### Option 1: Netlify (Recommended) ⭐

**Why Netlify:**
- Drag & drop deployment
- Automatic SSL certificates
- Global CDN
- Form handling built-in
- Custom domains

**Steps:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag the `static-website` folder to Netlify dashboard
4. Site will be live instantly at random subdomain
5. Configure custom domain in Site Settings → Domain management
6. Enable form handling for contact form (automatic)

**Custom Domain Setup:**
1. Add domain in Netlify: Site Settings → Domain management → Add custom domain
2. Update DNS: Point your domain to Netlify's servers
3. SSL certificate will be generated automatically

### Option 2: Vercel

**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub account
3. Import repository
4. Set root directory to `static-website`
5. Deploy

**Custom Domain:**
1. Go to project settings
2. Add domain in Domains section
3. Update DNS as instructed

### Option 3: GitHub Pages (Free)

**Steps:**
1. Push `static-website` contents to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch
4. Site will be available at `username.github.io/repository-name`

## Domain Configuration

### Main Site Structure
```
yoursite.com          → Static website (Netlify/Vercel)
├── /                 → index.html (Home with contact section)
└── /digital-branding → digital-branding.html

aiagent.quantumtaskai.com → Django application (CapRover)
├── /agents          → AI agent marketplace
├── /login           → User authentication
├── /register        → User registration
└── /admin          → Django admin
```

### DNS Settings (Example for Netlify)

**For main domain (`yoursite.com`):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer)

Type: CNAME  
Name: www
Value: yoursite.netlify.app
```

**For app subdomain (`aiagent.quantumtaskai.com`):**
```
Type: A
Name: aiagent
Value: YOUR_CAPROVER_SERVER_IP
```

## Contact Form Configuration

### Option A: Netlify Forms (Recommended)
Add `netlify` attribute to the contact form in the homepage contact section:

```html
<form class="contact-form" id="contactForm" netlify>
```

**Features:**
- Automatic spam filtering
- Email notifications
- Form submissions dashboard
- No backend code needed

### Option B: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Get form endpoint
3. Update form action in the homepage contact section:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option C: Connect to Django Backend
Update the form to POST to your Django app:

```html
<form class="contact-form" action="https://aiagent.quantumtaskai.com/contact/" method="POST">
```

## Required Assets

Before deploying, add these files to `img/` directory:

### Essential Files:
- `logo.png` - Company logo (recommended: 200x60px, PNG with transparency)
- `favicon.ico` - Website favicon (32x32px ICO format)
- `og-image.png` - Social media preview (1200x630px PNG)

### Optional Files:
- `apple-touch-icon.png` - iOS icon (180x180px)
- `favicon-32x32.png` - High-res favicon
- `favicon-16x16.png` - Small favicon

### Quick Setup:
```bash
cd static-website/img/
# Add your logo and favicon files here
# Update HTML references if filenames differ
```

## Performance Optimization

### Before Deployment:

**1. Minify CSS (Optional):**
The CSS is already optimized, but you can minify further:
- Use online CSS minifiers
- Or build tools like PostCSS

**2. Image Optimization:**
- Use WebP format for better compression
- Add multiple sizes for responsive images
- Use image compression tools

**3. Caching Headers:**
Netlify automatically sets optimal caching headers.

For other hosts, configure:
```
Cache-Control: public, max-age=31536000  # For CSS/JS/images
Cache-Control: public, max-age=3600      # For HTML
```

## Analytics Setup

### Google Analytics 4
Add to `<head>` section of all pages:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Alternative: Plausible Analytics
Add to `<head>`:

```html
<script defer data-domain="yoursite.com" src="https://plausible.io/js/script.js"></script>
```

## SEO Setup

### Search Console
1. Add property in [Google Search Console](https://search.google.com/search-console)
2. Verify ownership via DNS or HTML file
3. Submit sitemap: `https://yoursite.com/sitemap.xml` (generate with online tools)

### Sitemap.xml (Basic)
Create `sitemap.xml` in root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/digital-branding.html</loc>
    <priority>0.8</priority>
  </url>
</urlset>
```

## Testing Checklist

Before going live:

### ✅ Functionality
- [ ] All links work correctly
- [ ] Contact form validates properly
- [ ] Mobile navigation works
- [ ] External links open in new tabs

### ✅ Performance
- [ ] Page load speed < 3 seconds
- [ ] Images load properly
- [ ] No JavaScript errors in console

### ✅ SEO
- [ ] All meta tags present
- [ ] Open Graph images work
- [ ] Structured data validates

### ✅ Cross-browser
- [ ] Chrome/Edge
- [ ] Firefox  
- [ ] Safari
- [ ] Mobile browsers

## Go Live Process

### 1. Deploy Static Site
- Upload to Netlify/Vercel
- Configure custom domain
- Test all functionality

### 2. Deploy Django App
- Follow CapRover deployment guide
- Configure aiagent subdomain
- Test marketplace functionality

### 3. Link Integration
- Update placeholder URLs to point to aiagent.quantumtaskai.com/agents/
- Test user flow from marketing to AI marketplace
- Ensure consistent branding

### 4. DNS & SSL
- Update all DNS records
- Verify SSL certificates
- Test from multiple locations

## Post-Launch

### Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor Core Web Vitals
- Track conversion from static site to app

### Analytics
- Monitor traffic sources
- Track contact form submissions
- Analyze user journey from marketing to app

Your static marketing website will be live and optimized for performance, SEO, and conversions!