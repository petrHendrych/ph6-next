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

The site exists to present the studio's built work — family houses, restaurants and pubs, shops, interiors — alongside the team and its awards. The visitor is a prospective client deciding within a few seconds whether this studio is worth a call. The photography is the product; everything else is framing for it.

## Design direction

Treat every change as part of a contemporary architectural portfolio, not a generic marketing site. When a choice is open, pick the quieter option.

**Imagery leads.** Full-bleed or edge-aligned photography, generous whitespace around it, no decorative frames, rounded corners, or drop shadows on images. Captions are small, uppercase, wide-tracked, and overlaid or set tight to the image — never a card with a border.

**Restrained palette.** Paper white background, near-black `#171717` text. The `gold` / `silver` / `bronze` tokens are reserved for awards and the occasional single accent (the header progress hairline). No gradients as decoration, no colored surfaces.

**Structure over ornament.** Hairline rules (`rgb(23 23 23 / 0.07)`-ish) instead of heavy borders; elevation only where something genuinely floats above content, and then soft and wide (`0 10px 30px -18px`). Consistent gutters, aligned edges, a visible grid discipline — misalignment reads as amateur here more than anywhere else.

**Typography.** Raleway throughout. Uppercase with wide tracking for nav, labels, and captions; normal case for prose. Sizes step deliberately at breakpoints rather than scaling fluidly. No second display face.

**Motion is calm.** Slow crossfades, small offsets, character staggers, scroll-linked reveals. `power2`-family easings only — no bounce, no elastic, no attention-seeking loops. Motion should feel like a slow pan across a model, and must always degrade cleanly under `useReducedMotion()`.

**Contrast is non-negotiable.** Body and label text hits 4.5:1 against its background — `text-gray-400` on white does not qualify, `text-gray-500` is the floor for small text. State must never be communicated by color alone (pair it with weight or an underline).

**Avoid** the template tells: centered hero with a big CTA button, icon rows, badge pills, testimonial cards, emoji, stock-photo overlays, `rounded-xl` everywhere.

A project subpage should read as: hero image, a short factual block (location, year, scope), then a sequence of images with minimal captions. Copy stays Czech.

## Architecture

### Content lives in `src/data.ts`

`src/data.ts` is the single source of site content — `navLinks`, `previewCategories`, `team`, `mainImages`, `rewards`, and `previewImages` (54 entries) — typed by `src/types.ts`. Components import from it and never hardcode content or duplicate markup per item.

Image `src` values are bare names, not paths. The consuming component builds the path and extension:

- `MainPictures` → `/main/${src}.avif`
- `PreviewGrid` → `/preview/${src}.jpg`

Adding an image means adding both the file under `public/` and the entry in `data.ts`. A `previewImages` entry with an `href` renders as a `<Link>` tile instead of a plain `div`.

### Preview categories

`previewImages[].category` is `one | two | three`, rendered onto the tile as `data-category`. `usePreviewFilter` queries `#preview-section [data-category]`, and `previewCategories` in `data.ts` supplies the button labels for both the desktop bar and the mobile dropdown. Adding a category means extending `PreviewCategory` and `previewCategories` — the header markup needs no change.

### Cross-component DOM coupling

Most GSAP work is now ref-scoped, but a few globals remain load-bearing:

- `#preview-section`, `#atelier-section`, `#kontakt-section` — defined in `src/app/page.tsx`; scroll targets for `navLinks` hashes and the header's filter-visibility trigger.
- `[data-category]` — the filter contract between `PreviewGrid` and `usePreviewFilter`.
- `.hamburger-line` (3 per header) and `.filter-control` — queried within the owning ref, not document-wide.
- `.site-header` / `.is-scrolled` — the two header states, toggled by ScrollTrigger and styled in `globals.css`. `.header-bar`, `.header-logo`, and `.header-progress` read the `--header-py` / `--header-logo` custom properties those states set, so the whole bar animates from one class flip. `SubpageHeader` wears `is-scrolled` permanently.

### `usePreviewFilter` uses the Flip plugin

Filtering snapshots the tiles with `Flip.getState`, sets `display` on each tile, then lets `Flip.from({ absolute: true, onEnter, onLeave })` tween the layout difference and fade tiles in/out. It calls `ScrollTrigger.refresh()` on completion because the grid height changes. React does not own tile visibility — converting this to conditional rendering means rewriting the hook.

### Animation conventions

- Import `gsap` and every plugin from `@/lib/gsap`, never from `gsap/*`. That module is the one place plugins are registered.
- Always `useGSAP` from `@gsap/react`, with `{ scope: someRef }`; wrap event handlers in `contextSafe`. Pass an explicit container to `gsap.utils.toArray(selector, el)` — context scope does not apply to it.
- Read reduced motion with `useReducedMotion()` and branch on duration (`duration: reduced ? 0 : x`). Do **not** create `gsap.matchMedia()` inside event handlers — those contexts register media listeners that are never reverted. CSS-driven transitions use the Tailwind `motion-safe:` / `motion-reduce:` variants.
- Any `useGSAP` that takes `dependencies` must also pass `revertOnUpdate: true`; without it the previous animations are not reverted when a dependency (such as `reduced`) changes, and they stack.
- Anything created outside the `useGSAP` callback — a `SplitText`, a self-rescheduling `delayedCall` — escapes context cleanup. Prefer a single looping timeline, and revert splits from the callback's returned cleanup function.

### Routing

`src/app/page.tsx` is a server component composing client components into one scrolling page. Subpages live under the `(subpages)` route group, which supplies its own layout (`SubpageHeader` + `Footer`, fixed header offset via `pt-20`). `SubpageHeader` maps pathname to display title through a local `titles` record — adding a subpage requires adding an entry there too. The existing subpages are stubs.

### Styling

Tailwind v4 via `@tailwindcss/postcss`, configured entirely in `src/app/globals.css` — there is no `tailwind.config.ts` and no `@config`. Design tokens (`xs`/`2xl` breakpoints, `gold`/`silver`/`bronze`, footer colors) live in the `@theme` block; `nav-underline` is an `@utility`. The site is light-only by design.

Tailwind scans source text, so a class name assembled at runtime is never generated. Any conditional utility must appear as a complete literal string in the source — see the `Record<RewardHoverColor, string>` maps in `RewardsContent`.

`--breakpoint-2xl` is widened to 113rem, which is what drives the top step of the `.container` max-width ladder.
