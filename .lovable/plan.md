# Make Studio Zeez feel 3D everywhere

Right now the 3D treatment only lives on the home hero and the gallery grid. The rest of the site (Services, About, Contact, Footer, Nav) is flat. This plan extends the same cinematic depth language — parallax, tilt, floating layers, particles, scroll-driven motion — across the whole site, while keeping mobile smooth.

## What changes, page by page

**Global / Nav**
- Sticky nav gets a subtle 3D lift on scroll (translateZ + soft gold glow underline that tracks the active link).
- Add a thin animated gold "scroll progress" bar at the top edge.
- Cursor-follow spotlight (very soft radial gold) on desktop only.

**Home (`/`)**
- Hero: add a second depth layer behind the headline (out-of-focus blurred portrait at z=-80) and a foreground gold dust plane (z=+40) so the headline sits *inside* the scene.
- Section reveals: each section fades + rises + slightly rotates on enter via IntersectionObserver (CSS only, no library).
- Featured work strip: convert to a horizontal 3D "coverflow" — center card flat, side cards rotated ~25° on Y with depth fade.
- Stats/Numbers (if present): odometer count-up on scroll, numerals lift on Z.

**Gallery (`/gallery`)**
- Already tilt-enabled. Add: scroll-driven Z push (cards further down the page start deeper and rise to z=0 as they enter), plus a lightbox with 3D zoom-in transition.
- Category filter chips get a 3D press-in state.

**Services (`/services`)**
- Service cards become floating 3D panels with TiltCard + depth-glow, staggered drift.
- Add a layered "stage" background per card (icon at z=+30, card at z=0, soft shadow plate at z=-20).

**About (`/about`)**
- Portrait gets the same floating-frame parallax as the hero image.
- Timeline/bio paragraphs slide in from alternating sides with a slight Y-rotation on enter.

**Contact (`/contact`)**
- Form panel lifts on focus (whole card translateZ on focus-within).
- Payment + email cards become tilt cards.
- Background: reuse `ParticleField` at low density.

**Footer**
- Logo gets a soft floating drift; social icons get individual tilt on hover.

## Technical approach (keep it cheap)

- Reuse existing primitives: `TiltCard`, `ParticleField`, `useParallax`, `useMouseParallax`, plus the `scene-3d` / `preserve-3d` / `floating-frame` / `depth-glow` / `drift` classes already in `styles.css`. No new heavy deps.
- Add two small new utilities:
  - `useInViewReveal` hook → adds a `data-revealed` attribute via IntersectionObserver; CSS handles the rotate/translate/opacity transition.
  - `<SceneLayer>` wrapper → standardizes a depth layer with z, drift delay, and parallax speed props.
- Add a `<CursorSpotlight>` component (pointer-events-none, desktop+hover only).
- Add a `<ScrollProgress>` bar in `SiteLayout`.
- All new effects gated by `prefers-reduced-motion` and `(hover: none)` — mobile gets reveals only, no tilt/cursor/parallax intensity. Particle counts already throttled on mobile.
- No WebGL/Three.js — pure CSS 3D transforms + Canvas2D (already used). Keeps bundle and battery cost minimal.

## Out of scope
- No real Three.js scene, no 3D models, no scroll-jacking libraries (Lenis, GSAP ScrollTrigger).
- No content/copy changes.
- No new pages or routes.

## Files touched
- New: `src/components/CursorSpotlight.tsx`, `src/components/ScrollProgress.tsx`, `src/components/SceneLayer.tsx`, `src/hooks/useInViewReveal.ts`
- Edited: `src/styles.css` (reveal + coverflow + nav-lift classes), `src/components/SiteLayout.tsx`, `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`, `src/routes/index.tsx`, `src/routes/services.tsx`, `src/routes/about.tsx`, `src/routes/contact.tsx`, `src/routes/gallery.tsx`
