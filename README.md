# PH6

Portfolio site for **PH6**, a Czech architecture studio (Praha 6) founded in 2002 by Ing. arch. Šimon Brnada. The studio designs interiors and gastro venues, family and apartment houses, and public and administrative buildings.

The site is one scrolling landing page — hero slideshow, project grid, studio, awards, contact — plus a project overview at `/projekty` and a detail page per project. All user-facing copy is Czech.

This is a rewrite of the studio's original static site; the photography was carried over from it.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · GSAP.

Node **22.13+** is required — Next 16 and ESLint 9 both refuse older runtimes. `.nvmrc` pins 24.

```bash
npm install
npm run dev        # dev server on :3000 (Turbopack)
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit, run through TypeScript 7
```

There is no test suite.

The repo depends on **two TypeScript versions on purpose** — 6.0.3 under the bare `typescript` specifier, 7.0.2 aliased as `typescript-7` — because typescript-eslint cannot load under TS 7 yet and `eslint-config-next` imports it. Raising the bare dependency to 7 stops lint from running at all. See `CLAUDE.md` for the details and the condition for going single-version.

## Layout

```
src/
  app/
    page.tsx              landing page — four sections, server component
    layout.tsx            fonts, metadata, Header + Footer
    icon.svg favicon.ico  the mark, picked up by filename alone
    globals.css           Tailwind v4 config lives here — no tailwind.config.ts
    (subpages)/
      layout.tsx          SubpageHeader + Footer, fixed-header offset
      projekty/page.tsx   all projects, one section per category
      [slug]/page.tsx     project detail, statically generated per project
  components/             Header, PreviewGrid, ProjectDetail, Reveal, …
  hooks/                  reduced motion, scroll, mobile menu
  lib/gsap.ts             the one place GSAP plugins are registered
  data.ts                 all site content
  types.ts                the content types
public/
  main/ preview/ projects/<slug>/ people/ icons/
```

## Content

**`src/data.ts` is the single source of site content** — navigation, categories, team, studio copy, contact details, awards, the 54 preview tiles and the 54 project detail pages. Components import from it and never hardcode copy.

Image `src` values are bare names; the consuming component builds the path (`/main/….avif`, `/preview/….jpg`, `/projects/<slug>/….jpg`).

**Adding a project page**

1. Add the slug to the `ProjectSlug` union in `src/types.ts` — it ties the three places together, so a tile can never link to a page that does not exist.
2. Add the `projects` entry: title, location, year, facts, prose, and the photo list with real `width`/`height`.
3. Drop the photographs in `public/projects/<slug>/`.
4. Put the slug on the matching `previewImages` entry, which turns its tile into a link.

Photo order in a project is a layout decision, not the order the files arrived in — never open on a portrait, and pair portraits up. The rules are written out in `CLAUDE.md`.

## SEO

Every page carries a Czech title, description and canonical URL, an Open Graph image (the project's own opening photograph on a detail page), and JSON-LD: the studio as one `ArchitecturalService` with its address, founder, team and awards, an `ItemList` of all projects on `/projekty`, and a `CreativeWork` plus breadcrumbs on each detail page. `robots.txt` and `sitemap.xml` are generated from the same data.

**Indexing is opt-in, and that is deliberate.** The studio's previous site is still live on `ph6.cz`. A staging deployment that lets itself be crawled becomes a second site answering the same Czech queries, so a build only allows crawling when `NEXT_PUBLIC_INDEXABLE=true`; without it every page serves `noindex` and `robots.txt` is `Disallow: /`. Set the flag on the deployment that takes over the domain, and not before. See `.env.example`.

`siteUrl` in `src/data.ts` defaults to `https://ph6.cz` — the apex, since `www` is a CNAME onto it. Every canonical, sitemap entry and absolute image URL is built from it; `NEXT_PUBLIC_SITE_URL` overrides it per environment.

At cutover the hosting still has to 301 `www` → apex and `http` → `https` (today both hosts answer 200 and HTTPS redirects _down_ to HTTP), and the old `/projects/*.html` URLs need redirects to the new slugs or their ranking is thrown away.

## Status

The photographs and the project structure are in place. The written content is not: `year`, the scope fact and the description are placeholders on every project, `location` is filled only where the project title names a place, and the photo alt texts are indexed rather than descriptive. The old site carried no per-project copy to import, so all of it has to be written.

## Conventions

`CLAUDE.md` is the working reference for this repo and is worth reading before a first change. It covers the design direction, the mobile-first rules the layout is held to, the animation conventions (all GSAP goes through `useGSAP` and `@/lib/gsap`), the Tailwind v4 transform gotcha, and the toolchain notes above.
