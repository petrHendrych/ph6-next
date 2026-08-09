'use client';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

/** Scroll-progress hairline along the bottom edge of the header, styled in
 *  `globals.css`. Must sit inside a `relative` element spanning the full bar. */
const HeaderProgress = () => {
	const ref = useRef<HTMLSpanElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			if (!ref.current) return;

			// Scroll-linked, so it stays under reduced motion — only the scrub
			// smoothing drops.
			gsap.to(ref.current, {
				scaleX: 1,
				transformOrigin: 'left center',
				ease: 'none',
				scrollTrigger: {
					trigger: document.body,
					start: 'top top',
					end: 'max',
					scrub: reduced ? true : 0.3
				}
			});
		},
		{ scope: ref, dependencies: [reduced], revertOnUpdate: true }
	);

	return <span ref={ref} className="header-progress" aria-hidden="true" />;
};

export default HeaderProgress;
