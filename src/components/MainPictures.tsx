'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useRef } from 'react';

import { mainImages } from '@/data';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, SplitText } from '@/lib/gsap';

const HOLD = 5; // seconds a slide stays up
const FADE = 1.5; // crossfade length

const MainPictures = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			const slides = gsap.utils.toArray<HTMLElement>('.motiv');
			if (slides.length < 2) return;

			// Split once per slide. The previous version re-split on every cycle
			// without reverting, nesting char spans forever.
			const splits = slides.map(slide => {
				const caption = slide.querySelector('p');
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
						x: -10,
						duration: 0.1,
						ease: 'power2.inOut',
						stagger: 0.035
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
		{ scope: containerRef, dependencies: [reduced], revertOnUpdate: true }
	);

	return (
		<div
			ref={containerRef}
			id="imgContainer"
			className="relative mt-14 w-full overflow-hidden xl:mt-0"
		>
			{mainImages.map((image, index) => (
				<div
					key={image.src}
					className="motiv absolute left-0 top-0 w-full opacity-0 first:relative first:opacity-100"
				>
					<Image
						src={`/main/${image.src}.avif`}
						alt={image.title}
						width={0}
						height={0}
						sizes="100vw"
						className="mx-auto h-auto w-full max-w-[2048px]"
						// Only the first slide is above the fold; preloading all four
						// pushed ~2.3 MB in front of first paint.
						priority={index === 0}
						style={{ width: '100%', height: 'auto' }}
					/>
					<p className="text-shadow-lg xs:text-base absolute bottom-1 left-1 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-50 sm:text-lg lg:bottom-5 lg:left-2 lg:text-2xl">
						{image.title}
					</p>
				</div>
			))}
		</div>
	);
};

export default MainPictures;
