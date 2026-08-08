'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import { previewImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Grid is 1/2/3/4/5 columns — tell the browser so it stops downloading
// full-width sources for ~300px slots.
const IMAGE_SIZES =
	'(min-width: 1808px) 19vw, (min-width: 1280px) 23vw, (min-width: 768px) 31vw, (min-width: 480px) 48vw, 100vw';

const PreviewGrid = () => {
	const gridRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			if (reduced) return;

			const tiles = gsap.utils.toArray<HTMLElement>(
				'[data-category]',
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

	// `relative` positions the tiles Flip lifts out of flow while filtering;
	// `content-start` stops auto rows stretching while the height is tweened.
	// The column count tops out at five: the sources are 350² and a wider column
	// in the 113rem container would only upscale them.
	return (
		<div
			ref={gridRef}
			className="xs:grid-cols-2 relative grid grid-cols-1 content-start gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
		>
			{previewImages.map(image => {
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
							{image.href ? (
								<span className="label-micro shrink-0 text-neutral-400 group-hover:text-neutral-900 motion-safe:transition-colors">
									Detail
								</span>
							) : null}
						</figcaption>
					</>
				);

				const className = `group ${image.href ? 'cursor-pointer' : ''}`;

				return image.href ? (
					<Link
						key={image.src}
						href={image.href}
						data-category={image.category}
						className={className}
					>
						<figure>{tile}</figure>
					</Link>
				) : (
					<figure
						key={image.src}
						data-category={image.category}
						className={className}
					>
						{tile}
					</figure>
				);
			})}
		</div>
	);
};

export default PreviewGrid;
