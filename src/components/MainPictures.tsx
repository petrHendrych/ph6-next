'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { mainImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, SplitText } from '@/lib/gsap';

const HOLD = 5; // seconds a slide stays up
const FADE = 1.5; // crossfade length

/** How long to wait for the first slide before mounting the rest anyway. The
 *  slideshow must not depend on a `load` event that a failed request never
 *  fires. */
const ARM_FALLBACK = 4000;

const MainPictures = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	/**
	 * Slides two to four are not rendered until the first one has arrived.
	 *
	 * They are stacked on top of it at `opacity: 0`, which leaves them inside
	 * the viewport — so `next/image`'s lazy loading considers them visible and
	 * fetches all four at once. On a desktop that is four full-width
	 * photographs competing with the one the visitor is actually looking at,
	 * on the connection where it matters least.
	 */
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

			// Split once per slide. The previous version re-split on every cycle
			// without reverting, nesting char spans forever.
			const splits = slides.map(slide => {
				// Only the title splits — the index and the rule beside it are not
				// part of the stagger.
				const caption = slide.querySelector('.motiv-title');
				return caption ? new SplitText(caption, { type: 'chars' }) : null;
			});

			gsap.set(slides, { autoAlpha: 0 });
			gsap.set(slides[0], { autoAlpha: 1 });

			// One looping timeline instead of a self-rescheduling delayedCall,
			// which escaped the useGSAP context and kept running after unmount.
			const tl = gsap.timeline({ repeat: -1 });

			// Character stagger is motion, the crossfade is not — keep the
			// slideshow under reduced motion, drop the letter movement.
			const captionIn = (index: number, position: gsap.Position) => {
				const chars = splits[index]?.chars;
				if (reduced || !chars?.length) return;
				tl.from(
					chars,
					{
						autoAlpha: 0,
						x: -12,
						// Slower per character than the old 0.1s snap, to sit with the
						// 700ms hover easings used everywhere else.
						duration: 0.45,
						ease: 'power2.out',
						stagger: 0.03
					},
					position
				);
			};

			// The first slide's caption runs at position 0, not at the end of the
			// last crossfade. A repeating timeline rewinds its children on every
			// loop, so a `from` tween parked at the end would be reset to its
			// hidden start state and stay there for the whole next cycle — and
			// `immediateRender` would hide it on first paint too.
			captionIn(0, 0);

			slides.forEach((slide, index) => {
				const nextIndex = (index + 1) % slides.length;

				tl.to(slide, { autoAlpha: 0, duration: FADE }, `+=${HOLD}`).to(
					slides[nextIndex],
					{ autoAlpha: 1, duration: FADE },
					'<'
				);

				if (nextIndex === 0) {
					// Wrapping back to the first slide: hide its caption for the
					// crossfade so the loop restart can stagger it in.
					const chars = splits[0]?.chars;
					if (!reduced && chars?.length) tl.set(chars, { autoAlpha: 0 }, '<');
				} else {
					captionIn(nextIndex, '<1');
				}
			});

			return () => splits.forEach(split => split?.revert());
		},
		// `armed` is a dependency because the timeline can only be built once
		// every slide is in the DOM — before that there is one slide and the
		// effect bails out.
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
					{/* Inner wrapper so the caption anchors to the image, not to the
					    full-bleed track — the image is centred once past 2048px. */}
					<div className="relative mx-auto w-full max-w-[2048px]">
						{/* Real intrinsic dimensions, not the width/height 0 trick: without
						    them the hero reserves no height, the whole page sits collapsed
						    until the AVIF decodes, and every ScrollTrigger below is measured
						    against a layout that is about to move 900px. */}
						<Image
							src={`/main/${image.src}.avif`}
							alt={image.title}
							width={1920}
							height={900}
							sizes="100vw"
							className="h-auto w-full"
							// Only the first slide is above the fold; preloading all four
							// pushed ~2.3 MB in front of first paint.
							priority={index === 0}
							// The photograph's own colours, blurred, from the first frame
							// — the alternative is a 900px grey band while it downloads.
							{...(image.blurDataURL
								? {
										placeholder: 'blur' as const,
										blurDataURL: image.blurDataURL
									}
								: {})}
							// The rest of the slideshow follows once this one is on
							// screen, so it never competes with it for bandwidth.
							onLoad={index === 0 ? () => setArmed(true) : undefined}
						/>

						{/* Legibility scrim, not decoration: the captions sit on
						    photographs whose bottom edge is light on some slides. */}
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
