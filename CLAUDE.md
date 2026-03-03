# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern, responsive CV/portfolio web application built with React, TypeScript, and Vite. Features multi-language support (EN/FR), light/dark mode with system preference detection, personalized theme branding via a single hex color, modular sections that can be toggled on/off, PDF resume downloads, and multiple deployment options (Netlify, Vercel, or Docker with Nginx). Licensed under CC BY-NC 4.0.

## Documentation Index

- [README.md](README.md) — setup, customization guide, asset management, Docker deployment
- [DEVELOPER.md](DEVELOPER.md) — architecture details, type system, adding new sections, build optimization, i18n system
- [DEPLOYMENT.md](DEPLOYMENT.md) — deployment instructions (Netlify, Vercel, Docker + GitHub Actions)
- Section-specific docs: [About](src/components/sections/About/README.md), [Skills](src/components/sections/Skills/README.md), [Education](src/components/sections/Education/README.md), [Experiences](src/components/sections/Experiences/README.md), [Projects](src/components/sections/Projects/README.md), [Hobbies](src/components/sections/Hobbies/README.md), [ProjectStats](src/components/sections/ProjectStats/README.md)

## Commands

- **Dev server**: `npm run dev` (runs on http://localhost:5173)
- **Demo mode**: `npm run dev:demo` (uses example data from `src/data/profile-data.example.ts`)
- **Build**: `npm run build` (runs `tsc -b && vite build`)
- **Lint**: `npm run lint` (ESLint flat config)
- **Preview production build**: `npm run preview`
- **Docker**: `npm run docker:up` / `npm run docker:down`
- **Deploy (static)**: Connect the repo to [Netlify](https://app.netlify.com/) or [Vercel](https://vercel.com/) — config files (`netlify.toml`, `vercel.json`) are included

## Architecture

This is a React 19 + TypeScript + Vite CV/portfolio app using Mantine UI, CSS Modules, and i18next for internationalization.

### Section Registration System

The core architectural pattern is a **decorator-based section registry**. Each CV section (About, Skills, Experiences, etc.) self-registers via `createRegisteredSection()` from `src/decorators/section.decorator.ts`. The `App.tsx` dynamically renders only sections present in the profile data.

**To add a new section:**
1. Create `src/components/sections/NewSection/` with `.tsx`, `.module.css`, and `.types.ts`
2. In the types file, extend both `SectionTypeRegistry` and `SectionTranslationRegistryMap` via declaration merging
3. Export default using `createRegisteredSection<Props>('sectionName', Component)`
4. Add section data to `src/data/profile-data.ts` and translations to locale files

### Type System

Uses TypeScript declaration merging for type-safe section registration:
- `src/types/profile-data.types.ts` — `SectionTypeRegistry` (empty interface extended by each section)
- `src/types/translations.types.ts` — `SectionTranslationRegistryMap` (same pattern for translations)
- Each section's `.types.ts` file extends both registries with `declare module` blocks

### Path Aliases

Configured in both `vite.config.ts` and `tsconfig.json`:
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`
- `@decorators/*` → `src/decorators/*`
- `@app-types/*` → `src/types/*`

### Build Optimization

A custom Vite plugin (`plugins/vite-plugin-used-sections`) analyzes `src/data/profile-data.ts` at build time and replaces the glob import in `App.tsx` with explicit imports for only the used sections, reducing bundle size.

A second plugin (`plugins/vite-plugin-dynamic-favicon`) generates a favicon from the theme's primary color.

### Data & Content

- **Profile data**: `src/data/profile-data.ts` (structured data for all sections)
- **Translations**: `src/i18n/locales/en.ts`, `fr.ts` (auto-discovered via `import.meta.glob`)
- **Images**: import from `src/assets/` using ES module imports
- **PDFs**: place in `public/pdf/`, reference with absolute paths like `/pdf/filename.pdf`
- Use the `t()` function from `useLanguage` hook for all translated strings

### Key Conventions

- CSS Modules (`.module.css`) for component styles, with PostCSS + Mantine preset
- Strict TypeScript: `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noUncheckedIndexedAccess`
- Components use Mantine's `@mantine/core` primitives (Text, Title, Grid, AppShell, etc.)
- Theme color is configured via `primaryColor` hex in profile data; palette is auto-generated
