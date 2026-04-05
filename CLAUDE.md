# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static marketing website for Quantum Tasks AI, built with HTML/CSS/JavaScript and deployed using Docker/nginx. The site is containerized for deployment via Dokploy with Traefik reverse proxy handling SSL and routing.

## Architecture

### Core Structure
- `index.html` - Main homepage with hero section, company profile, services overview, and integrated contact form
- `digital-branding.html` - AI Digital Branding services page with SOSTAC+RACE framework
- `css/style.css` - Consolidated stylesheet with responsive design and CSS custom properties
- `js/script.js` - Interactive functionality for forms, navigation, and animations

### Deployment Architecture
- **Static Site**: Served via nginx in Docker container
- **Container**: Alpine-based nginx image with optimized caching headers
- **Orchestration**: Docker Compose with Traefik labels for automatic SSL/routing
- **Platform**: Dokploy deployment with domains `quantumtaskai.com` and `www.quantumtaskai.com`

## Development Commands

This is a static website with no build process - files are served directly by nginx.

### Local Development
```bash
# Serve locally with any static server
python -m http.server 8000
# or
npx serve .
```

### Docker Development
```bash
# Build and run locally
docker build -t quantumtaskai-website .
docker run -p 8080:80 quantumtaskai-website

# Using docker-compose
docker-compose up --build
```

### Deployment
```bash
# Deploy to Dokploy (production)
# Uses dokploy.json configuration for automatic deployment
git push origin main  # Triggers deployment if configured

# Test deployment locally
docker-compose -f docker-compose.test.yml up --build
```

## Key Integration Points

### External Links
- AI Marketplace: Links point to `https://aiagent.quantumtaskai.com/agents/` (Django app)
- Authentication: Separate login/register buttons link to Django auth endpoints

### Contact Form
- Integrated into homepage `#contact` section
- Client-side validation implemented in `js/script.js`
- Ready for Netlify Forms, Formspree, or Django backend integration
- Demo success message shows on submission

### Domain Strategy
- `quantumtaskai.com` - Static marketing site (this repository)
- `aiagent.quantumtaskai.com` - Django AI marketplace (separate application)
- `www.quantumtaskai.com` - Redirects to main domain

## Configuration Files

### Docker Configuration
- `Dockerfile` - nginx Alpine image with security headers and caching
- `docker-compose.yml` - Production configuration with Traefik labels
- `docker-compose.test.yml` - Test configuration without domain dependencies

### Deployment Configuration
- `dokploy.json` - Dokploy platform configuration with domains, SSL, monitoring
- `dokploy.test.json` - Test environment configuration
- `DEPLOYMENT.md` - Comprehensive deployment guide for multiple platforms

## Assets Requirements

The `img/` directory should contain:
- `logo.png` - Company logo (200x60px recommended)
- `favicon.ico` - Website favicon (32x32px)
- `og-image.png` - Social media preview (1200x630px)
- Additional favicon sizes for mobile devices

## Performance Features

- Static file caching (1 year for assets, 1 hour for HTML)
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Responsive images and mobile-first CSS
- Optimized font loading with preload
- Minified and consolidated CSS/JS

## SEO & Marketing

- Structured data markup for business information
- OpenGraph meta tags for social sharing
- Proper heading hierarchy and semantic HTML
- Mobile-responsive design
- Contact form integration for lead capture
- Service pages optimized for AI/cybersecurity keywords