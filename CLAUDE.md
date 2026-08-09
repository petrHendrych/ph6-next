# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server on :3000 (Turbopack)
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit, run through TypeScript 7
```

Node 22.13+ is required (`engines`, `.nvmrc` pins 24) — Next 16 and ESLint 9 both refuse older runtimes.

There is no test suite and no test tooling installed.

### Two TypeScript versions, on purpose

`typescript` is **6.0.3** and `typescript-7` is an npm alias for **7.0.2**. Both are needed because they are not interchangeable:

- TypeScript 7 is the native port and no longer ships the JS compiler API, so `typescript-eslint` throws `does not support TS 7.0` on load — and `eslint-config-next` imports it, which takes the whole lint run down. Linting, the WebStorm service and `next build`'s own type pass therefore resolve the bare `typescript` specifier to 6.0.3.
- `npm run typecheck` calls TypeScript 7 by explicit path (`node node_modules/typescript-7/bin/tsc`) rather than through `node_modules/.bin/tsc`, which is a coin flip between the two packages depending on install order.

Drop the alias and go single-version once typescript-eslint ships TS 7 support (typescript-eslint#10940). Do not raise the bare `typescript` dependency to 7 before then; lint stops running entirely.

### Lint and format config

Flat config in `eslint.config.mjs`, Prettier in `prettier.config.mjs` — the old inline `eslintConfig` / `prettier` keys in `package.json` and the `@haaxor1689/*` shared configs are gone (they pinned ESLint 8, typescript-eslint 5 and Prettier 2, none of which survive this toolchain). The rule set is a direct port of `@haaxor1689/eslint-config`, so the style is unchanged: tabs, single quotes, arrow-function components, and `prettier-plugin-tailwindcss` class sorting.

`eslint-config-next` already registers the `react`, `react-hooks`, `import`, `jsx-a11y` and `@typescript-eslint` plugins. **Registering any of them again is a hard `Cannot redefine plugin` error**, which is why the recommended typescript-eslint rules are spread out of `tseslint.configs.recommended` and applied against next's plugin instance instead of being extended. Rules using the `@typescript-eslint/` prefix must live in a `files: ['**/*.{ts,tsx}']` block — next's TypeScript layer does not cover `.mjs`/`.js`, so a prefixed rule in the wider block fails to find the plugin.

## What this is

Single-page portfolio site for the Czech architecture studio PH6, plus a small set of per-project subpages. All user-facing copy is Czech. Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, GSAP for all animation.

The site exists to present the studio's built work — family houses, restaurants and pubs, shops, interiors — alongside the team and its awards. The visitor is a prospective client deciding within a few seconds whether this studio is worth a call. The photography is the product; everything else is framing for it.

## Design direction

Treat every change as part of a contemporary architectural portfolio, not a generic marketing site. When a choice is open, pick the quieter option.

**Imagery leads.** Full-bleed or edge-aligned photography, generous whitespace around it, no decorative frames, rounded corners, or drop shadows on images. Captions are small, uppercase, wide-tracked, and overlaid or set tight to the image — never a card with a border.

**Restrained palette.** Paper white background, near-black `#171717` text. The `gold` / `silver` / `bronze` tokens are reserved for awards and the occasional single accent (the header progress hairline). No gradients as decoration, no colored surfaces.

**Structure over ornament.** Hairline rules (`rgb(23 23 23 / 0.07)`-ish) instead of heavy borders; elevation only where something genuinely floats above content, and then soft and wide (`0 10px 30px -18px`). Consistent gutters, aligned edges, a visible grid discipline — misalignment reads as amateur here more than anywhere else.

**Typography.** Raleway throughout. Uppercase with wide tracking for nav, labels, and captions; normal case for prose. Sizes step deliberately at breakpoints rather than scaling fluidly. No second display face.

The PH6 lettermark is type, not a bitmap: `Wordmark` renders it at `0.42em` tracking and inherits its colour, so `Header`, `SubpageHeader` and `Footer` all show the same mark — near-black at `text-xl md:text-2xl` in the bars, white at `text-3xl md:text-4xl` in the footer. Size and colour are the only things a caller passes. The negative right margin inside it cancels the trailing letter-space wide tracking leaves after the final glyph; without it the mark hangs a third of a character inside the gutter.

### The favicon

`src/app/icon.svg` and `src/app/favicon.ico` are both picked up by the App Router from those filenames alone — there is no `icons` entry in `metadata`, and adding one would override them. Next emits a `<link>` for each; browsers that understand SVG take `icon.svg`, the rest fall back to the `.ico`.

The mark is the numeral **6** reversed out of a solid near-black plate, cut from the same Raleway as the wordmark. Three constraints drove that and are worth keeping in mind before redrawing it:

- **16px is the design size.** The wide-tracked `PH6` wordmark was tried first and turns to a grey smear at 16px — three glyphs cannot survive a 16px box. Anything with more than one glyph, or a hairline frame, fails the same way.
- **The plate is structural, not decorative.** It gives the mark a square silhouette that stays visible on any tab colour, and it is what keeps the `.ico` legible on a dark strip, since an `.ico` carries no media query.
- **`icon.svg` swaps its two colours under `prefers-color-scheme`**, so the plate goes paper-white and the numeral near-black in dark UI. The site itself stays light-only; this is the one place a dark variant exists.

The numeral is a **baked outline, not live text** — an SVG favicon cannot load a webfont, so the path was exported from the Raleway woff2 that `next/font` had already downloaded, instantiated at `wght 600`. Editing the `d` attribute by hand is not sensible; re-export it if the typeface or weight ever changes. The `.ico` is rasterised from the same SVG at 16/24/32/48/64/128/256 so the two can never drift.

**Motion is calm.** Slow crossfades, small offsets, character staggers, scroll-linked reveals. `power2`-family easings only — no bounce, no elastic, no attention-seeking loops. Motion should feel like a slow pan across a model, and must always degrade cleanly under `useReducedMotion()`.

**Contrast is non-negotiable.** Body and label text hits 4.5:1 against its background — `text-gray-400` on white does not qualify, `text-gray-500` is the floor for small text. State must never be communicated by color alone (pair it with weight or an underline).

**Avoid** the template tells: centered hero with a big CTA button, icon rows, badge pills, testimonial cards, emoji, stock-photo overlays, `rounded-xl` everywhere.

A project subpage should read as: hero image, a short factual block (location, year, scope), then a sequence of images with minimal captions. Copy stays Czech.

## Mobile is the primary target

Most visitors reach this site from a phone — a link in a message, a search result, a Facebook post — and that first screen decides whether the studio gets a call. Treat the phone layout as the design, not as the fallback. Design it at **360 × 780** first and let the desktop layout be the widening of it.

**Every change is checked at 360px before it is called done.** Not "it uses responsive classes" — actually look at the narrow layout. The most common regressions here are horizontal overflow and text that collapses into a two-word-per-line column.

**Hover may never be the only way to reach something.** Touch has no hover: the award row wash, the team portrait desaturation, the preview tile treatments, and the nav underline are all decoration layered on top of information that is already visible. If a state carries meaning, render it, and treat hover as the enhancement.

**Never hide content to make a layout work.** `hidden sm:block` on a whole section is a bug, not a breakpoint — reflow it instead. Multi-column grids start at one column and gain columns from `sm:` or `md:` up; a `grid-cols-2` default with three items is a broken phone layout.

**Tap targets are at least 44 × 44px** with real space between adjacent links. The header hamburger, filter buttons, footer social squares, and mobile panel rows are all sized for a thumb — keep new controls in line.

**Wide tracking is a desktop luxury.** `tracking-[0.3em]` uppercase set on long Czech words overflows a narrow column fast. Micro labels are short by design; if a longer string needs caps, drop the tracking at the small size and only widen it from `md:` up. Body copy stays around `0.95rem`, never the `label-micro` size.

**Images always carry a `sizes` attribute** whose mobile branch reflects the real width (roughly `90vw`, not `30vw`), and only the first hero slide gets `priority` — the phone is where the wasted bytes actually hurt.

**Effects cost more on a phone.** `backdrop-filter` is confined to the header; do not add blurred layers to long scrolling sections. Scroll-triggered work stays cheap and `once: true`.

**Remember the fixed header.** It overlays content at every width, so hash-scroll targets and the `pt-20` offset in the subpage layout have to be re-checked whenever header height changes — the compact `.is-scrolled` bar is what most phone scrolling actually sees. New header items must also work inside the GSAP-animated mobile menu and filter panels, not only in the desktop bar.

## Architecture

### Content lives in `src/data.ts`

`src/data.ts` is the single source of site content — `navLinks`, `previewCategories`, `team`, `atelier`, `contact`, `projects`, `mainImages`, `rewards`, and `previewImages` (54 entries) — typed by `src/types.ts`. Components import from it and never hardcode content or duplicate markup per item. That includes prose: the studio text is `atelier.lead` / `atelier.paragraphs` / `atelier.facts` / `atelier.roster`, and the address, email, phone, map URL and Facebook URL all come from `contact` (shared by `ContactContent` and `Footer`).

Constants a server component needs also belong here, not in a component — `HOME_PREVIEW_COUNT` is the example. Every export of a `'use client'` module is a client reference on the server, so a server component importing a plain number from one silently receives a proxy: `previewImages.slice(0, HOME_PREVIEW_COUNT)` returned an empty array with no type error until the constant moved into `data.ts`.

Image `src` values are bare names, not paths. The consuming component builds the path and extension:

- `MainPictures` → `/main/${src}.avif`
- `PreviewGrid` → `/preview/${src}.jpg`
- `ProjectDetail` → `/projects/${slug}/${src}.jpg`

Next 16 only serves the `quality` values listed in `images.qualities` in `next.config.ts` (`[75, 90]` here — 90 is what the team portraits ask for). A `quality` prop outside that list is not an error; the image just silently drops back to the default, so extend the list whenever a new value is used.

Adding an image means adding both the file under `public/` and the entry in `data.ts`. A `previewImages` entry with a `slug` renders as a `<Link>` tile (with a `Detail` tag in its caption) instead of a plain `figure`; `PreviewGrid` builds the route from the slug, so no path is ever written by hand.

### Page composition

`page.tsx` stacks four `<section>`s, each opened by `SectionHeading` (numbered index, hairline rule, optional right-hand note). The only `h1` on the page is the `sr-only` one at the top — section titles are `h2`s, so keep it that way when adding a section.

`Reveal` is the shared scroll-in wrapper: a client component that fades and lifts either itself or, with `stagger`, its direct children (`:scope > *`) once through a `ScrollTrigger`. It renders `div | section | ul | dl` via `as`, and passing server-rendered children through it keeps them server components.

### Preview categories and the projects page

`previewImages[].category` is one of four slugs — `interiery`, `bytove-domy`, `rodinne-domy`, `verejne` — and the label in `previewCategories` **defines what belongs in the bucket**. Tag a project by what its label describes; the keys were once opaque (`one | two | three`) and the data drifted so far that houses were filed under interiors.

`/projekty` builds one section per bucket, ordered by how many projects each holds, so the largest body of work opens the page. Both the grouping and the order are derived at render time — re-tagging a project in `data.ts` reorders the page by itself, and the array order in `previewCategories` is only a fallback. Adding a category means extending `PreviewCategory` and `previewCategories`; nothing else needs touching.

There is no filtering anywhere. The header filter and the `[data-category]` attribute it queried are gone, along with `usePreviewFilter` and the `Flip` plugin registration — the grid is plain markup again.

### `PreviewGrid` is shared by both pages

It takes `images: Image[]` and never reaches for `previewImages` itself, so the home page passes `previewImages.slice(0, HOME_PREVIEW_COUNT)` and `/projekty` passes one category at a time. `showAllTile` appends the overview tile that links to `/projekty` — a hairline-outlined plate carrying a drawn floor plan (`FloorPlan`), inverting to near-black on hover, with the same square frame and caption row as a project tile so the grid row keeps its baseline. Tiles reveal through one batched `ScrollTrigger` over `:scope > *`.

`mobileLimit` puts `hidden md:block` on every tile past the given index, so a phone gets `MOBILE_PREVIEW_COUNT` (9) of the 19 and the wider layouts get all of them. This is the one sanctioned exception to "never hide content to make a layout work": the overview tile sits immediately after the visible ones, so nothing held back is unreachable, and since every preview image is `loading="lazy"`, a tile that is `display: none` is never intersecting and its image is never fetched on a phone.

### Cross-component DOM coupling

Most GSAP work is now ref-scoped, but a few globals remain load-bearing:

- `#preview-section`, `#atelier-section`, `#kontakt-section` — defined in `src/app/page.tsx`; scroll targets for the `navLinks` hashes.
- `.hamburger-line` (3 per header) — queried within the owning ref, not document-wide.
- `.site-header` / `.is-scrolled` — the two header states, toggled by ScrollTrigger and styled in `globals.css`. `.header-bar`, `.header-logo`, and `.header-progress` read the `--header-py` / `--header-logo` custom properties those states set, so the whole bar animates from one class flip. `SubpageHeader` wears `is-scrolled` permanently.

### Animation conventions

- Import `gsap` and every plugin from `@/lib/gsap`, never from `gsap/*`. That module is the one place plugins are registered.
- Always `useGSAP` from `@gsap/react`, with `{ scope: someRef }`; wrap event handlers in `contextSafe`. Pass an explicit container to `gsap.utils.toArray(selector, el)` — context scope does not apply to it.
- Read reduced motion with `useReducedMotion()` and branch on duration (`duration: reduced ? 0 : x`). Do **not** create `gsap.matchMedia()` inside event handlers — those contexts register media listeners that are never reverted. CSS-driven transitions use the Tailwind `motion-safe:` / `motion-reduce:` variants.
- Any `useGSAP` that takes `dependencies` must also pass `revertOnUpdate: true`; without it the previous animations are not reverted when a dependency (such as `reduced`) changes, and they stack.
- Anything created outside the `useGSAP` callback — a `SplitText`, a self-rescheduling `delayedCall` — escapes context cleanup. Prefer a single looping timeline, and revert splits from the callback's returned cleanup function.
- Elements that may already be on screen at mount must not depend on a `ScrollTrigger` to become visible. `Reveal` checks `getBoundingClientRect().top < innerHeight` and plays immediately in that case — on a tall viewport the start line is already behind the element at load, and it would otherwise sit as an empty box until a scroll that never comes.
- Images always declare real intrinsic dimensions (or `fill` inside an aspect-ratio box). The `width={0} height={0}` trick reserves no height, which not only shifts the layout but makes every `ScrollTrigger` below measure against a page that is about to move.

### Tailwind v4 transforms do not transition under `transition-transform` alone

In Tailwind v4, `scale-*`, `rotate-*`, and `translate-*` compile to the standalone CSS `scale` / `rotate` / `translate` properties, **not** to `transform`:

```css
.group-hover\:scale-\[1\.04\]:is(:where(.group):hover *) {
	scale: 1.04;
}
```

So an arbitrary property list that names `transform` — `transition-[transform,filter]` — silently animates nothing, and the utility snaps in a single frame. This already cost the team portraits and the contact map their hover easing once.

- Name the real property: `transition-[filter,scale]`, `transition-[scale]`.
- The bare `transition-transform` utility is safe — v4 expands it to `transform, translate, scale, rotate`.
- After changing a hover transition, confirm it in the compiled CSS rather than by eye: `grep -A3 'transition-\[' .next/static/css/*.css`.
- `filter` transitions (the grayscale-off hovers) repaint the whole bitmap each frame. Pair them with `motion-safe:will-change-[filter,scale]` where there are only a handful of elements; do not do it across the 54-tile preview grid.

### Routing

`src/app/page.tsx` is a server component composing client components into one scrolling page. Subpages live under the `(subpages)` route group, which supplies its own layout (`SubpageHeader` + `Footer`, fixed header offset via `pt-20`). The group holds two routes:

- `projekty/` — page title, one-sentence intro, then a `SectionHeading` + `PreviewGrid` per category.
- `[slug]/` — every project detail page, from the `projects` array in `data.ts` via `generateStaticParams`. `dynamicParams = false`, so an unlisted slug 404s instead of trying to render at request time.

**Adding a project page: extend the `ProjectSlug` union in `types.ts`, add the `projects` entry, drop the images in `public/projects/<slug>/`, and put that slug on the matching `previewImages` entry.** `ProjectSlug` is the source of truth tying the three together — `projects` is keyed by it and a tile points at a page by slug, so a tile linking to a project that does not exist is a type error rather than a 404. `SubpageHeader` reads `subpageTitles`, derived from `projects`, so it needs no edit.

Static segments outrank dynamic ones in the App Router, which is why `/projekty` still resolves to its own page and not to `[slug]`. Do not re-add a static per-project route file; it would shadow `[slug]` for that project.

`ProjectDetail` is the two-column read: a sticky left column (title, fact list, prose) beside a scrolling column of photographs, collapsing to one column below `lg` with the description first. The sticky column needs `lg:self-start` alongside `lg:sticky lg:top-24` — without it the grid item stretches to the row height and has nowhere to stick. A photo with `span: 'half'` gets `col-span-2 sm:col-span-1`, which pairs the portrait shots two-up on wider screens and stacks them on a phone.

### Styling

Tailwind v4 via `@tailwindcss/postcss`, configured entirely in `src/app/globals.css` — there is no `tailwind.config.ts` and no `@config`. Design tokens (`xs`/`2xl` breakpoints, `gold`/`silver`/`bronze`, footer colors) live in the `@theme` block; `nav-underline` is an `@utility`. The site is light-only by design.

Tailwind scans source text, so a class name assembled at runtime is never generated. Any conditional utility must appear as a complete literal string in the source — see the `Record<RewardMedal, string>` maps in `RewardsContent`.

`label-micro` is the second `@utility` alongside `nav-underline`: 0.6875rem, uppercase, `0.3em` tracking, used for every section index, field label and caption. It sets type only — colour stays a utility on the element, because the same label appears on white and on the near-black footer.

`--breakpoint-2xl` is widened to 113rem, which is what drives the top step of the `.container` max-width ladder.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
