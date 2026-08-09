'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { mainImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, SplitText } from '@/lib/gsap';

const HOLD = 5; // seconds a slide stays up
const FADE = 1.5; // crossfade length

/** Mount the rest anyway — a failed request fires no `load` event. */
const ARM_FALLBACK = 4000;

const MainPictures = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	// Slides 2-4 wait for the first to arrive. Stacked at `opacity: 0` they are
	// still inside the viewport, so lazy loading fetches all four at once.
	const [armed, setArmed] = useState(false);
	const slides = armed ? mainImages : mainImages.slice(0, 1);

	useEffect(() => {
		if (armed) return;
		const timer = window.setTimeout(() => setArmed(true), ARM_FALLBACK);
		return () => window.clearTimeout(timer);
	}, [armed]);

	useGSAP(
		() => {
			const slides = gsap.utils.toArray<HTMLElement>('.motiv');
			if (slides.length < 2) return;

			// Split once per slide — re-splitting each cycle nests char spans.
			const splits = slides.map(slide => {
				const caption = slide.querySelector('.motiv-title');
				return caption ? new SplitText(caption, { type: 'chars' }) : null;
			});

			gsap.set(slides, { autoAlpha: 0 });
			gsap.set(slides[0], { autoAlpha: 1 });

			// One looping timeline — a self-rescheduling delayedCall escapes the
			// useGSAP context and keeps running after unmount.
			const tl = gsap.timeline({ repeat: -1 });

			// Under reduced motion the crossfade stays, the letter stagger goes.
			const captionIn = (index: number, position: gsap.Position) => {
				const chars = splits[index]?.chars;
				if (reduced || !chars?.length) return;
				tl.from(
					chars,
					{
						autoAlpha: 0,
						x: -12,
						duration: 0.45,
						ease: 'power2.out',
						stagger: 0.03
					},
					position
				);
			};

			// Position 0, not the end of the last crossfade: a repeating timeline
			// rewinds its children, so a `from` tween parked at the end would stay
			// at its hidden start state for the whole next cycle.
			captionIn(0, 0);

			slides.forEach((slide, index) => {
				const nextIndex = (index + 1) % slides.length;

				tl.to(slide, { autoAlpha: 0, duration: FADE }, `+=${HOLD}`).to(
					slides[nextIndex],
					{ autoAlpha: 1, duration: FADE },
					'<'
				);

				if (nextIndex === 0) {
					// Hide the first caption during the wrap so the loop restart can
					// stagger it back in.
					const chars = splits[0]?.chars;
					if (!reduced && chars?.length) tl.set(chars, { autoAlpha: 0 }, '<');
				} else {
					captionIn(nextIndex, '<1');
				}
			});

			return () => splits.forEach(split => split?.revert());
		},
		// `armed` is a dependency: the timeline can only be built once every
		// slide is in the DOM.
		{
			scope: containerRef,
			dependencies: [reduced, armed],
			revertOnUpdate: true
		}
	);

	return (
		<div
			ref={containerRef}
			id="imgContainer"
			className="relative mt-14 w-full overflow-hidden xl:mt-0"
		>
			{slides.map((image, index) => (
				<figure
					key={image.src}
					className="motiv absolute top-0 left-0 w-full opacity-0 first:relative first:opacity-100"
				>
					{/* Anchors the caption to the image, not the full-bleed track — the
					    image is centred once past 2048px. */}
					<div className="relative mx-auto w-full max-w-[2048px]">
						{/* Real intrinsic dimensions: without them the hero reserves no
						    height and every ScrollTrigger below measures against a layout
						    about to move 900px. */}
						<Image
							src={`/main/${image.src}.avif`}
							alt={image.title}
							width={1920}
							height={900}
							sizes="100vw"
							className="h-auto w-full"
							// Preloading all four pushes ~2.3 MB in front of first paint.
							priority={index === 0}
							{...(image.blurDataURL
								? {
										placeholder: 'blur' as const,
										blurDataURL: image.blurDataURL
									}
								: {})}
							onLoad={index === 0 ? () => setArmed(true) : undefined}
						/>

						{/* Legibility scrim — some slides have a light bottom edge. */}
						<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

						<figcaption className="absolute bottom-0 left-0 flex items-center gap-4 px-6 py-5 md:gap-5 md:px-10 md:py-8">
							<span className="label-micro text-white/70">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className="h-px w-6 bg-white/40 md:w-10" />
							<span className="motiv-title text-xs tracking-[0.2em] text-white uppercase sm:text-sm md:text-lg md:tracking-[0.22em]">
								{image.title}
							</span>
						</figcaption>
					</div>
				</figure>
			))}
		</div>
	);
};

export default MainPictures;
