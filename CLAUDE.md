# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server on :3000 (Turbopack)
npm run build   # production build
npm run start   # serve production build
npm run lint    # next lint
```

There is no test suite and no test tooling installed.

Lint and format config are declared inline in `package.json` (`eslintConfig` extends `@haaxor1689/eslint-config`, `prettier` uses `@haaxor1689/prettier-config`) — there are no separate `.eslintrc`/`.prettierrc` files. The resulting style is tabs, single quotes, arrow-function components, and `prettier-plugin-tailwindcss` class sorting.

## What this is

Single-page portfolio site for the Czech architecture studio PH6, plus a small set of per-project subpages. All user-facing copy is Czech. Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4, GSAP for all animation.

## Architecture

### Content lives in `src/data.ts`

`src/data.ts` is the single source of site content (`mainImages`, `rewards`, `previewImages` — ~50 preview entries), typed by `src/types.ts`. Components import from it and never hardcode content.

Image `src` values are bare names, not paths. The consuming component builds the path and extension:

- `MainPictures` → `/main/${src}.avif`
- `PreviewGrid` → `/preview/${src}.jpg`

Adding an image means adding both the file under `public/` and the entry in `data.ts`.

### `className: 'one' | 'two' | 'three'` is a behavioral hook, not styling

Each entry in `previewImages` carries `className` of `one`, `two`, or `three`. These are project categories. `usePreviewFilter` selects on them directly (`#preview-section .one`, etc.) to run the filter animation, so they must not be renamed or repurposed as visual classes. The header filter buttons currently render the raw labels "one"/"two"/"three" — placeholder text awaiting real category names.

### Global DOM IDs couple components together

Several components reach across the tree via `document.querySelector`-style GSAP selectors rather than refs or props. Renaming or removing any of these IDs silently breaks navigation or filtering:

- `#preview-section`, `#atelier-section`, `#kontakt-section` — scroll targets used by `useScrollTo` and `usePreviewFilter`; defined in `src/app/page.tsx`, consumed in `Header`.
- `#filter-container`, `#mobile-filter-icon` — revealed/hidden by a `ScrollTrigger` in `Header` tied to `#preview-section`.
- `#hamburger-line-1|2|3` — animated by `useMobileMenu`; rendered by both `Header` and `SubpageHeader`.
- `#imgContainer` and the `.motiv` class — the `MainPictures` crossfade cycle.

### `usePreviewFilter` mutates the DOM directly

The filter runs a hand-rolled FLIP: measure rects, apply the target `display` state, force reflow via `document.body.offsetHeight`, revert, then animate `x`/`y` back to zero. Items being hidden are temporarily lifted to `position: absolute` inside their container so the grid reflows immediately while they fade. A `isAnimatingRef` guard drops clicks mid-transition, and a `gsap.delayedCall` finalizes the definitive `display` state. React does not own the visibility of these nodes — do not convert this to conditional rendering without rewriting the whole hook.

### Animation conventions

- Always `useGSAP` from `@gsap/react`; wrap event handlers in `contextSafe` (see `useMobileMenu`).
- Register plugins at module scope in the component that uses them (`gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)`).
- Reduced motion is handled explicitly everywhere via paired `gsap.matchMedia()` blocks: `(prefers-reduced-motion: no-preference)` animates, `(prefers-reduced-motion: reduce)` jumps to the end state with `gsap.set` and `duration: 0`. New animations must follow this pattern. CSS-driven transitions use the Tailwind `motion-safe:` / `motion-reduce:` variants for the same reason.

### Routing

`src/app/page.tsx` is a server component composing client components into one scrolling page. Subpages live under the `(subpages)` route group, which supplies its own layout (`SubpageHeader` + `Footer`, fixed header offset via `pt-20`). `SubpageHeader` maps pathname to display title through a local `titles` record — adding a subpage requires adding an entry there too. The existing subpages are stubs.

### Styling

Tailwind v4 via `@tailwindcss/postcss`, but the theme is split across two places: `tailwind.config.ts` (loaded through `@config` in `globals.css`) holds the container screens and the `gold`/`silver`/`bronze` award colors, while `globals.css` declares the extra `xs` breakpoint (30rem) inside `@theme`. Check both when adding tokens.

Note that the `prefers-color-scheme: light` block in `globals.css` assigns dark values to `--background`/`--foreground`, which reads as inverted; the site is otherwise designed light-only.
