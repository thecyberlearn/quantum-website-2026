# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Static marketing website for Quantum Tasks AI, served via nginx in Docker and deployed via Dokploy with Traefik for SSL and routing.

## File Structure

```
index.html              — Homepage (dark navy hero, services, founders, contact)
digital-branding.html   — AI Digital Branding services page (SOSTAC+RACE)
privacy.html            — Privacy Policy
terms.html              — Terms of Service
404.html                — Custom 404 page
header.js               — Shared self-injecting header (loaded cross-domain)
robots.txt              — Search engine crawl instructions
sitemap.xml             — XML sitemap (4 pages)
Dockerfile              — nginx:alpine image
docker-compose.yml      — Production config with Traefik labels
nginx.conf              — nginx routing, caching headers, security headers, 404
img/                    — logo.png, favicon.ico, favicon-*.png, apple-touch-icon.png, og-image.png
```

## Shared Header

`header.js` is a self-injecting IIFE loaded by all Quantum Tasks AI apps:
- Static site: `<script src="/header.js">`
- Blog (blog.quantumtaskai.com): `<script src="https://quantumtaskai.com/header.js">`
- Auditor (audit.quantumtaskai.com): `<script src="https://quantumtaskai.com/header.js">`

To update nav links or colors across all apps — edit `header.js` only.

## Local Development

```bash
# Simple static server
python -m http.server 8000

# Docker (matches production)
docker build -t quantumtaskai-website .
docker run -p 8080:80 quantumtaskai-website
```

## Deployment

Deployed via Dokploy. Push to `main` branch triggers redeployment.

```bash
git push origin main
```

Domains: `quantumtaskai.com` and `www.quantumtaskai.com` (www redirects to non-www).

## Domain Strategy

| Domain | What it is |
|---|---|
| `quantumtaskai.com` | This static site |
| `audit.quantumtaskai.com` | Site Auditor (separate Django app) |
| `blog.quantumtaskai.com` | Blog (separate Django app) |

## Key URLs

- Contact form: uses JotForm `https://form.jotform.com/252121444918050`
- Email: `abhay@quantumtaskai.com`
- Address: Meydan Grandstand, 6th floor, Dubai, UAE

## Design System

Both `index.html` and `digital-branding.html` use an embedded `<style>` block with shared CSS variables:

```css
--navy: #0a0f1e   /* hero backgrounds */
--indigo: #6366f1  /* primary accent */
--violet: #a855f7  /* secondary accent */
--orange: #f97316  /* CTA buttons */
```

No external CSS file — all styles are embedded per-page for simplicity.

## nginx Features (nginx.conf)

- HTML cached 1 hour, assets cached 1 year
- Security headers: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- Gzip compression enabled
- Custom 404 page (`/404.html`)
- www → non-www redirect
