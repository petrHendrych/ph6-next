'use client';
import { useCallback, useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Reads prefers-reduced-motion once and keeps it in sync.
 *
 * Animations should branch on the returned boolean (`duration: reduced ? 0 : x`)
 * instead of creating a `gsap.matchMedia()` per interaction — those contexts
 * register media listeners that are never reverted.
 */
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
