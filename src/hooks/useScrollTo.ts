'use client';
import { gsap } from '@/lib/gsap';

import { useReducedMotion } from './useReducedMotion';

/** Height reserved for the fixed header when scrolling to a section. */
export const HEADER_OFFSET = 100;

const SCROLL_DURATION = 0.8;

type ScrollOptions = {
	/** Jump instead of easing — for correcting a position the reader is on. */
	immediate?: boolean;
	onComplete?: () => void;
};

export const useScrollTo = () => {
	const reduced = useReducedMotion();

	const scrollTo = (
		target: string | number | Element,
		{ immediate, onComplete }: ScrollOptions = {}
	) => {
		gsap.to(window, {
			duration: reduced || immediate ? 0 : SCROLL_DURATION,
			scrollTo:
				typeof target === 'number'
					? target
					: { y: target, offsetY: HEADER_OFFSET },
			ease: 'power2.inOut',
			onComplete
		});
	};

	return { scrollTo, scrollToTop: () => scrollTo(0) };
};
