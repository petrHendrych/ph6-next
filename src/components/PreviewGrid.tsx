'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

import { previewImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Grid is 1/2/3/4/6 columns — tell the browser so it stops downloading
// full-width sources for ~200px slots.
const IMAGE_SIZES =
	'(min-width: 1280px) 17vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw';

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
	return (
		<div
			ref={gridRef}
			className="xs:grid-cols-2 relative grid grid-cols-1 content-start gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
		>
			{previewImages.map(image => {
				const tile = (
					<>
						<Image
							src={`/preview/${image.src}.jpg`}
							alt={image.title}
							width={0}
							height={0}
							sizes={IMAGE_SIZES}
							className="h-auto w-full"
						/>
						<div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-in">
							<div className="flex h-full translate-y-4 items-center justify-center group-hover:translate-y-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out">
								<h3 className="px-10 text-center text-lg font-bold text-white">
									{image.title}
								</h3>
							</div>
						</div>
					</>
				);

				const className = `group relative overflow-hidden ${
					image.href ? 'cursor-pointer' : ''
				}`;

				return image.href ? (
					<Link
						key={image.src}
						href={image.href}
						data-category={image.category}
						className={className}
					>
						{tile}
					</Link>
				) : (
					<div
						key={image.src}
						data-category={image.category}
						className={className}
					>
						{tile}
					</div>
				);
			})}
		</div>
	);
};

export default PreviewGrid;
