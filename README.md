# Monochrome Blogs

A single-page React + Tailwind experience that mirrors the monochrome portfolio aesthetic: dashed rails, blurred terminal hero, shooting stars, theme slider, animated gradient pills, spotlight bar, blog grid, and footer calls-to-action.

## Getting Started

```bash
npm install
npm run dev
```

The site lives at `http://localhost:5173` after the dev server starts.

## Build & Preview

```bash
npm run build
npm run preview
```

## Tech Notes

- React 19 with Vite 7 for instant feedback
- Tailwind CSS 3.4 for utility layout plus custom `styles.css` + `blog.css` layers
- Accessible theme toggle with `prefers-color-scheme` defaults and localStorage persistence
- Blog content driven by `src/data/posts.js`
