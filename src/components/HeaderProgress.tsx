'use client';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

/**
 * The hairline at the bottom edge of a header that tracks how far down the
 * document the reader is. Shared by `Header` and `SubpageHeader`; it is styled
 * in `globals.css` and only shows once the bar is opaque, which on a subpage is
 * from the start.
 *
 * Must be placed inside a `relative` element that spans the bar's full width.
 */
const HeaderProgress = () => {
	const ref = useRef<HTMLSpanElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			if (!ref.current) return;

			// Scroll-linked, so it stays under reduced motion — only the scrub
			// smoothing is dropped, otherwise the bar lags behind the wheel.
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
