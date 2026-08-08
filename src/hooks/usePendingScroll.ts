'use client';
import { useEffect } from 'react';

import { useScrollTo } from './useScrollTo';

/**
 * How a section link on a subpage reaches its section without leaving the hash
 * in the URL: the link navigates to `/#section` as an ordinary cross-page link
 * — the hash is what actually carries the target through the navigation — and
 * the landing page consumes it on mount.
 *
 * Consuming it means two things the browser's own hash jump does not do: seat
 * the section below the fixed header, then strip the hash back off the URL with
 * `replaceState` so the address bar reads `/` again. Handing the target over
 * through `sessionStorage` instead was tried and landed at the top of the page.
 */
export const usePendingScroll = () => {
	const { scrollTo } = useScrollTo();

	useEffect(() => {
		const { hash, pathname, search } = window.location;
		// `getElementById`, not a selector: the hash comes from the URL bar and
		// need not be a valid one.
		const target = hash && document.getElementById(hash.slice(1));
		if (!target) return;

		// One frame so the section is laid out before it is measured. Every image
		// on the page reserves its box up front, so the offset is already final.
		const frame = requestAnimationFrame(() =>
			scrollTo(target, {
				// The browser has already jumped here; this only re-seats it.
				immediate: true,
				onComplete: () =>
					window.history.replaceState(null, '', `${pathname}${search}`)
			})
		);
		return () => cancelAnimationFrame(frame);
		// Mount only: this consumes a one-shot handover, not an ongoing state.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
