# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive 3D auto detailing showcase for "MASTER AUTO" — a single-page Next.js application featuring a Mercedes G-Class 3D model with scroll-driven animations, real-time color customization, and service section presentations. Currently in Russian with an `english-portfolio` branch for English translation.

## Commands

- **Dev server:** `npm run dev` (uses Turbopack)
- **Build:** `npm run build` (static export to `/out` directory)
- **Start:** `npm start`
- **Lint:** `npm run lint` (ESLint 9)

## Tech Stack

- **Next.js 15** (App Router, static export via `output: 'export'`)
- **React 19** with TypeScript (strict mode)
- **Three.js + React Three Fiber + Drei** for 3D rendering
- **GSAP + ScrollTrigger** for scroll-based animations
- **Lenis** for smooth scrolling
- **Tailwind CSS v4** + global CSS custom classes
- **Leaflet / React-Leaflet** for the contact map (dynamically imported with `ssr: false`)

## Architecture

### Single-Page Scroll-Driven Layout

The app is one route (`src/app/page.tsx`) rendering `InteractiveCarScene`, which contains:
1. A **fixed `<Canvas>`** (React Three Fiber) displaying the 3D car model at all times
2. A **scrollable content layer** with service sections stacked vertically, layered above/below the canvas via z-index

### Core Data Flow

```
InteractiveCarScene (state owner)
├── Canvas (fixed)
│   └── InteractiveCarModel (receives colors, scrollProgress, wheelSpeed)
├── ScrollCarAnimation (GSAP ScrollTrigger → updates scrollProgress)
└── Sections (prop drill color setters up to InteractiveCarScene)
```

- **Scroll progress** (0–1) drives camera position through 11 keyframes and triggers door/roof animations
- **Color state** (`bodyColor`, `detailsColor`, `glassColor`) lives in `InteractiveCarScene` and is passed down; sections like `VinylWrappingSection` and `TintingSection` call setters to update colors
- No global state library — all state is local `useState` with prop drilling

### 3D Model System (`InteractiveCarModel.tsx`)

- Loads `/public/models/car.glb` via `useGLTF`
- Animates doors and roof based on scroll progress using `ANIMATION_CONFIG` (door angles, roof height, animation speed)
- Maps mesh names like `G-class_FL_door_AMG` to animation groups (FL=0, FR=1, RL=2, RR=3)
- Materials are updated in real-time for color changes (body paint, glass tint, detail color)

### Scroll Animation (`ScrollCarAnimation.tsx`)

- GSAP `ScrollTrigger` synced with Lenis via `ScrollTrigger.update()` on Lenis scroll events
- Progress value drives both camera interpolation and model animations
- Scroll is disabled (fixed body) until the 3D model finishes loading

### Styling Conventions

- **Tailwind utilities** for most layout/styling
- **Global CSS classes** in `globals.css` for specialized needs: `.section-height`, `.custom-hero-text`, `.custom-exterior-hero-text`, `.liquid-glass`, `.loader`
- **SVG filter `glass-distortion`** used across multiple sections for glassmorphism effects
- **Custom fonts:** Anton (hero headings), Press Start 2P (footer logo) — loaded via `@font-face` in globals.css
- Section heights are responsive via `@media (min-height: ...)` queries (800px, 850px, 900px, 1000px thresholds)

### Key Patterns

- All interactive components use `"use client"` directive
- Leaflet map uses `next/dynamic` with `ssr: false` to avoid SSR issues
- Camera FOV is dynamically calculated based on `window.innerWidth` for responsive 3D rendering
- `dpr: [1, 2]` on Canvas for Retina display support
- Path alias: `@/*` maps to `./src/*`

## Section Order (scroll sequence)

TopSection → ExteriorHero → VinylWrapping → Tinting → DentRemoval → PPF → RunningBoards → InteriorHero → ChemicalCleaning → Polishing → PlasticWrapping → ProtectiveGlass → ExtraServices → Cafe → FooterHeading → ContactForm
