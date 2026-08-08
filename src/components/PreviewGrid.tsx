'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import FloorPlan from '@/components/FloorPlan';
import { previewImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import type { Image as ProjectImage } from '@/types';

// Grid is 1/2/3/4/5 columns — tell the browser so it stops downloading
// full-width sources for ~300px slots.
const IMAGE_SIZES =
	'(min-width: 1808px) 19vw, (min-width: 1280px) 23vw, (min-width: 768px) 31vw, (min-width: 480px) 48vw, 100vw';

const PROJECTS_HREF = '/projekty';

type Props = {
	images: ProjectImage[];
	/** Append the overview tile after the images. */
	showAllTile?: boolean;
	/**
	 * Show only this many tiles below `md`, leaving the rest to the wider
	 * layouts. Not a layout workaround — the overview tile that follows is the
	 * way to the ones held back, so nothing becomes unreachable on a phone.
	 */
	mobileLimit?: number;
};

const PreviewGrid = ({ images, showAllTile, mobileLimit }: Props) => {
	const gridRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			if (reduced) return;

			const tiles = gsap.utils.toArray<HTMLElement>(
				':scope > *',
				gridRef.current
			);

			// Hidden from JS, not from markup — without JS the grid stays visible.
			gsap.set(tiles, { autoAlpha: 0 });

			// One batched trigger instead of one per tile.
			ScrollTrigger.batch(tiles, {
				once: true,
				start: 'top bottom-=80',
				onEnter: batch =>
					gsap.to(batch, { autoAlpha: 1, duration: 0.5, stagger: 0.08 })
			});
		},
		{ scope: gridRef, dependencies: [reduced], revertOnUpdate: true }
	);

	// The column count tops out at five: the sources are 350² and a wider column
	// in the 113rem container would only upscale them.
	return (
		<div
			ref={gridRef}
			className="xs:grid-cols-2 grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{images.map((image, index) => {
				// The slug in `data.ts` is the source of truth for where a tile goes;
				// the route is built here, the same way the image paths are.
				const href = image.slug ? `/${image.slug}` : undefined;

				const tile = (
					<>
						{/* Every source is square (350² or 300²), so the frame reserves
						    its box up front instead of collapsing until the jpg lands. */}
						<div className="relative aspect-square overflow-hidden bg-neutral-100">
							<Image
								src={`/preview/${image.src}.jpg`}
								alt={image.title}
								fill
								sizes={IMAGE_SIZES}
								className="object-cover motion-safe:transition-[scale] motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
							/>
						</div>
						{/* The title used to live in a hover overlay, which touch never
						    reaches. It is a caption now, on the same hairline as the
						    team and award rows. */}
						<figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-neutral-200 pt-2.5 group-hover:border-neutral-900/80 motion-safe:transition-colors">
							<span className="text-xs leading-snug tracking-[0.03em] text-neutral-600 group-hover:text-neutral-900 motion-safe:transition-colors">
								{image.title}
							</span>
							{href ? (
								<span className="label-micro shrink-0 text-neutral-400 group-hover:text-neutral-900 motion-safe:transition-colors">
									Detail
								</span>
							) : null}
						</figcaption>
					</>
				);

				// Complete literals — Tailwind never sees a composed class name.
				const beyondMobile =
					mobileLimit !== undefined && index >= mobileLimit
						? 'hidden md:block'
						: '';
				const className = `group ${beyondMobile} ${
					href ? 'cursor-pointer' : ''
				}`;

				return href ? (
					<Link key={image.src} href={href} className={className}>
						<figure>{tile}</figure>
					</Link>
				) : (
					<figure key={image.src} className={className}>
						{tile}
					</figure>
				);
			})}

			{showAllTile ? (
				<Link href={PROJECTS_HREF} className="group cursor-pointer">
					{/* Same square frame and caption row as a project tile, so the row it
					    sits in keeps its baseline. A quiet outline at rest so it does not
					    compete with the photographs, inverting on hover to read as the
					    link it is. */}
					<div className="relative flex aspect-square flex-col justify-end border border-neutral-900 p-5 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white motion-safe:transition-colors motion-safe:duration-500 motion-safe:ease-out md:p-6">
						{/* A drafting plan gives the one tile with no photograph a subject
						    of its own. It strokes `currentColor`, so it turns from a pencil
						    drawing into a white one as the plate inverts. */}
						<FloorPlan className="pointer-events-none absolute inset-0 h-full w-full" />

						<div className="relative flex items-center justify-between gap-4">
							<span className="text-sm uppercase leading-tight tracking-[0.18em] md:text-base">
								Všechny
								<br />
								projekty
							</span>
							<svg
								viewBox="0 0 32 12"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								aria-hidden="true"
								className="h-3 w-8 shrink-0 motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:translate-x-1.5"
							>
								<path d="M0 6h30M25 1l5 5-5 5" />
							</svg>
						</div>
					</div>
					<div className="mt-3 border-t border-neutral-900/80 pt-2.5">
						<span className="text-xs leading-snug tracking-[0.03em] text-neutral-600 group-hover:text-neutral-900 motion-safe:transition-colors">
							{previewImages.length} realizací
						</span>
					</div>
				</Link>
			) : null}
		</div>
	);
};

export default PreviewGrid;
