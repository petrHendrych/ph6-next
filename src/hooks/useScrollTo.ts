'use client';
import { gsap } from '@/lib/gsap';

import { useReducedMotion } from './useReducedMotion';

/** Height reserved for the fixed header when scrolling to a section. */
export const HEADER_OFFSET = 100;

const SCROLL_DURATION = 0.8;

export const useScrollTo = () => {
	const reduced = useReducedMotion();

	const scrollTo = (target: string | number) => {
		gsap.to(window, {
			duration: reduced ? 0 : SCROLL_DURATION,
			scrollTo:
				typeof target === 'number'
					? target
					: { y: target, offsetY: HEADER_OFFSET },
			ease: 'power2.inOut'
		});
	};

	return { scrollTo, scrollToTop: () => scrollTo(0) };
};
