'use client';
import { useEffect } from 'react';

import { useScrollTo } from './useScrollTo';

/**
 * Consumes the `/#section` a subpage `ScrollLink` navigated to, doing the two
 * things the browser's own hash jump does not: seat the section below the fixed
 * header, then strip the hash off the URL so it reads `/` again.
 */
export const usePendingScroll = () => {
	const { scrollTo } = useScrollTo();

	useEffect(() => {
		const { hash, pathname, search } = window.location;
		// `getElementById`, not a selector — the hash comes from the URL bar and
		// need not be a valid one.
		const target = hash && document.getElementById(hash.slice(1));
		if (!target) return;

		// One frame so the section is laid out before it is measured.
		const frame = requestAnimationFrame(() =>
			scrollTo(target, {
				// The browser has already jumped here; this only re-seats it.
				immediate: true,
				onComplete: () =>
					window.history.replaceState(null, '', `${pathname}${search}`)
			})
		);
		return () => cancelAnimationFrame(frame);
		// Mount only — a one-shot handover, not an ongoing state.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
