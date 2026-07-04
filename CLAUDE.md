# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal consulting landing page for Algo Lambda (Giulio De Luise), served by GitHub Pages at https://algolambda.io (custom domain via `CNAME` — don't delete or rename that file). Pushing to `master` deploys the site.

## Development

Pure static site — no build step, no package manager, no tests, no framework. Three source files: `index.html`, `styles.css`, `script.js`.

To preview locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

- **Theming**: Dual light/dark theme driven by a `data-theme` attribute on `<html>` and CSS custom properties in `styles.css` (`:root` for light, `[data-theme="dark"]` overrides). Theme is persisted in `localStorage` and set by an inline `<head>` script in `index.html` before paint to avoid flash; `ThemeManager` in `script.js` handles toggling. New styles should use the existing CSS variables (`--bg-primary`, `--text-primary`, etc.) so both themes work automatically. `NavbarScroll` in `script.js` only toggles a `.scrolled` class; navbar appearance (including `--nav-bg`) lives entirely in `styles.css`.
- **JavaScript**: `script.js` is organized as small classes (ThemeManager, MobileNav, SmoothScroll, ContactModal, ContactForm, etc.), all instantiated in a single `DOMContentLoaded` handler at the bottom of the file. New behavior should follow that pattern.
- **Contact form**: Uses EmailJS (SDK loaded from CDN in `index.html`, public key initialized inline there; service/template IDs live in `ContactForm.sendEmail` in `script.js`). Client-side rate limiting (3 submissions/minute), input validation, and spam-pattern filtering are implemented in `ContactForm` — keep those intact when touching the form.
- **External dependencies** are all CDN-loaded: Google Fonts (Inter + JetBrains Mono) and EmailJS. Icons are inline SVGs in `index.html` — no icon font dependency.

## Design guidance

`.skills/premium-landing-designer-1.0.0/` contains a design skill (principles, conversion psychology, anti-patterns) — consult it when redesigning or adding landing-page sections. Its React/Tailwind implementation examples don't apply here; this site is vanilla HTML/CSS/JS.
