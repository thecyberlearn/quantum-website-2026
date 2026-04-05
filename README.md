# Quantum Tasks AI - Static Marketing Website

This is the static marketing website for Quantum Tasks AI, separated from the Django application for optimal performance and SEO.

## Structure

```
static-website/
├── index.html              # Home page
├── digital-branding.html   # AI Digital Branding services
├── css/
│   └── style.css           # Consolidated styles
├── js/
│   └── script.js           # Interactive functionality
├── img/                    # Images (to be added)
└── README.md               # This file
```

## Features

- ✅ **Fast Loading** - Static HTML/CSS/JS
- ✅ **SEO Optimized** - Proper meta tags, structured data
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Professional UI** - Modern, clean design
- ✅ **Interactive Elements** - Smooth animations, hover effects
- ✅ **Contact Form** - Integrated into homepage with client-side validation
- ✅ **App Integration** - Links to AI Marketplace and authentication

## Pages

### Home Page (`index.html`)
- Hero section with trust indicators
- Company profile and founder information
- Services overview
- Client showcase
- Integrated contact section with form

### Digital Branding Page (`digital-branding.html`)
- AI-powered digital branding services
- SOSTAC+RACE framework explanation
- Process breakdown with 6 steps
- Service portfolio
- CTA to brand assessment form

## Deployment

### Option 1: Netlify (Recommended)
1. Drag and drop the `static-website` folder to Netlify
2. Configure domain settings
3. Enable form handling for contact form

### Option 2: Vercel
1. Connect GitHub repository
2. Set build directory to `static-website`
3. Deploy automatically

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. Set source to `static-website` directory

## Domain Setup

- **Main site**: `yoursite.com` → Static website
- **App subdomain**: `app.yoursite.com` → Django marketplace

## Assets Needed

Add these files to the `img/` directory:
- `logo.png` - Company logo
- `favicon.ico` - Website favicon
- `apple-touch-icon.png` - iOS home screen icon
- `favicon-32x32.png` - 32x32 favicon
- `favicon-16x16.png` - 16x16 favicon
- `og-image.png` - Social media preview image (1200x630)

## Links to Django App

The static site navigation includes:
- AI Marketplace: Links to agent marketplace (placeholder URL until aiagent.quantumtaskai.com is configured)
- Login/Register: Separate authentication buttons (placeholder URLs until configured)

Update these URLs to match your Django app deployment.

## Contact Form

The contact form is integrated into the homepage (#contact section) and includes client-side validation with demo success message. For production:

1. **Option 1**: Use Netlify Forms (add `netlify` attribute to form)
2. **Option 2**: Use Formspree or similar service
3. **Option 3**: Connect to Django backend API endpoint

## Performance

- Optimized fonts loading with preload
- Compressed CSS (single file)
- Minimized JavaScript
- Responsive images (when added)
- Modern CSS with custom properties

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

© 2025 Quantum Tasks AI. All rights reserved.