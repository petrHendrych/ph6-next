'use client';
import { useCallback, useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Branch on this (`duration: reduced ? 0 : x`) rather than creating a
 *  `gsap.matchMedia()` per interaction — those listeners are never reverted. */
export const useReducedMotion = () => {
	const subscribe = useCallback((onChange: () => void) => {
		const mq = window.matchMedia(QUERY);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	}, []);

	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(QUERY).matches,
		() => false
	);
};
