'use client';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';

import { Flip, gsap, ScrollTrigger } from '@/lib/gsap';
import type { PreviewCategory } from '@/types';

import { useReducedMotion } from './useReducedMotion';

type Options = {
	/** Container that holds the `[data-category]` tiles. */
	scopeSelector?: string;
	duration?: number;
	/** Called after the filter is applied — used to scroll the grid into view. */
	onFiltered?: () => void;
};

const FILTER_DURATION = 0.4;

export const usePreviewFilter = ({
	scopeSelector = '#preview-section',
	duration = FILTER_DURATION,
	onFiltered
}: Options = {}) => {
	const [activeFilter, setActiveFilter] = useState<PreviewCategory | null>(
		null
	);
	const reduced = useReducedMotion();
	const { contextSafe } = useGSAP();

	const handleFilterClick = contextSafe((category: PreviewCategory) => {
		const items = gsap.utils.toArray<HTMLElement>(
			`${scopeSelector} [data-category]`
		);
		if (!items.length) return;

		// Clicking the active filter clears it.
		const next = activeFilter === category ? null : category;
		const d = reduced ? 0 : duration;
		const grid = items[0].parentElement;

		// Height the grid is showing right now — possibly mid-tween from a
		// previous click, which is exactly where this one should start.
		const fromHeight = grid?.offsetHeight ?? 0;

		if (grid) {
			// Drop any in-flight height tween so the measurement below reads the
			// natural content height rather than a leftover inline value.
			gsap.killTweensOf(grid);
			grid.style.height = '';
		}

		// FLIP: snapshot, mutate visibility, let Flip tween the difference.
		const state = Flip.getState(items);

		items.forEach(el => {
			el.style.display = !next || el.dataset.category === next ? '' : 'none';
		});

		const toHeight = grid?.offsetHeight ?? 0;

		Flip.from(state, {
			duration: d,
			ease: 'power2.inOut',
			// Only the leaving tiles go out of flow. `absolute: true` would lift
			// every tile out, collapsing the grid to zero height and letting the
			// sections below slide up behind the animation.
			absoluteOnLeave: true,
			onEnter: els =>
				gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: d }),
			onLeave: els => gsap.to(els, { opacity: 0, duration: d }),
			// Grid height changed — reveal triggers below it are now stale.
			onComplete: () => ScrollTrigger.refresh()
		});

		// Remaining tiles stay in flow, so the grid jumps straight to its new
		// height. Tween it instead so the rest of the page follows along.
		if (grid && d > 0 && fromHeight !== toHeight) {
			gsap.fromTo(
				grid,
				// `overflow: hidden` for the duration: tiles on their way out sit at
				// their old positions and entering tiles are laid out at the final
				// height, so either direction would otherwise paint over the section
				// below while the grid is still resizing.
				{ height: fromHeight, overflow: 'hidden' },
				{
					height: toHeight,
					duration: d,
					ease: 'power2.inOut',
					clearProps: 'height,overflow'
				}
			);
		}

		setActiveFilter(next);
		onFiltered?.();
	});

	return { activeFilter, handleFilterClick };
};
