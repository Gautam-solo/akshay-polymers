# Akshay Polymers — 3D Manufacturing Website

A marketing website for an engineering-plastics manufacturer, built as a **WebGL-first
product showcase**. Polymer granules are rendered as a real-time 3D particle field driven
by React Three Fiber, with GSAP-timed scroll choreography over a Lenis smooth-scroll layer.

**Stack:** React 19 · TypeScript · Three.js · React Three Fiber · Drei · GSAP · Lenis · Vite 8

> **Client work.** Built and delivered for a real client. This repository is published as a
> **portfolio showcase of the engineering** — all client contact details have been replaced
> with placeholders, and the assets remain the client's property.

---

## What's interesting here

**A 3D granule field that doesn't tank the framerate.** The hero renders a Three.js
particle system through React Three Fiber with postprocessing effects. Keeping that at 60fps
on mid-range hardware drove most of the architecture below.

**Render-loop gating.** A `VisibilityGate` component drives the render loop from *inside*
the canvas, so scrolling past the hero stops rendering entirely without re-rendering the
React tree. The GPU idles when the canvas is off screen.

**Adaptive performance.** `PerfGuard` plus Drei's `AdaptiveDpr` scale pixel ratio to the
device's measured capability, and a `MAX_DELTA` frame clamp keeps physics stable when a
background tab resumes and hands back a huge delta.

**Motion accessibility.** `prefers-reduced-motion` is honoured at the scene level — the
whole animated experience degrades to a static presentation rather than being merely
slowed down.

**Prerendered for SEO.** `npm run build` runs Vite and then a custom prerender script, so
each route ships real HTML. Structured data (JSON-LD) is emitted per route from
`src/lib/seo.json` — meaningful for a manufacturer whose customers arrive via search.

**Image pipeline.** A Sharp-based script generates WebP alongside JPEG fallbacks, served
through a `<Picture>` component that handles art direction and lazy loading.

---

## Structure

```
src/
├── scene/                # WebGL layer
│   ├── Experience.tsx    # Canvas root, lighting, visibility gating
│   ├── GranuleField.tsx  # Instanced polymer-granule particle system
│   ├── Effects.tsx       # Postprocessing stack
│   └── PerfGuard.tsx     # Adaptive quality scaling
├── dom/
│   ├── SmoothScroll.tsx  # Lenis integration
│   └── useMeta.ts        # Per-route meta + JSON-LD injection
├── components/
│   ├── ImageCycler.tsx   # Product image rotation
│   ├── Picture.tsx       # WebP/JPEG responsive images
│   └── Layout.tsx        # Shell, navigation
├── pages/                # Home, About, Product, Contact, NotFound
└── lib/
    ├── content.ts        # Centralised copy and contact constants
    ├── palette.ts        # Brand tokens sampled from the client's logo
    ├── seo.json          # Per-route metadata and structured data
    └── frame.ts          # Frame-timing constants
```

---

## Running locally

```bash
npm install
npm run dev        # Vite dev server
npm run typecheck  # tsc --noEmit
npm run build      # production build + prerender
npm run images     # regenerate optimised WebP assets
```

---

## Author

**Gautam Patel** — Founder, Hexoraa · Ahmedabad
[LinkedIn](https://www.linkedin.com/in/gautam-patel-a16394326/) · [GitHub](https://github.com/Gautam-solo)
