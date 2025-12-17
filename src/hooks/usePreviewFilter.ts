import { useRef, useState } from 'react';
import { gsap } from 'gsap';

type FilterClass = 'one' | 'two' | 'three';

type Options = {
	scopeSelector?: string; // defaults to #preview-section
	duration?: number; // seconds, default 0.25
};

export const usePreviewFilter = (options: Options = {}) => {
	const scopeSelector = options.scopeSelector ?? '#preview-section';
	const totalDuration = options.duration ?? 0.25; // 250ms

	const [activeFilter, setActiveFilter] = useState<null | FilterClass>(null);
	const cleanupCallRef = useRef<gsap.core.Tween | null>(null);
	// prevent starting a new transition while one is running
	const isAnimatingRef = useRef(false);

	const qAll = (selector: string): HTMLElement[] =>
		Array.from(document.querySelectorAll(selector)) as HTMLElement[];

	const getAllGridItems = (): HTMLElement[] =>
		qAll(
			`${scopeSelector} .one, ${scopeSelector} .two, ${scopeSelector} .three`
		);

	const isDisplayed = (el: Element) =>
		typeof window !== 'undefined' &&
		window.getComputedStyle(el).display !== 'none';

	const measureRects = (els: HTMLElement[]) => {
		const map = new Map<HTMLElement, DOMRect>();
		els.forEach(el => {
			if (isDisplayed(el)) map.set(el, el.getBoundingClientRect());
		});
		return map;
	};

	const finalize = () => {
		const all = getAllGridItems();
		const visible = all.filter(isDisplayed);
		const hidden = all.filter(el => !isDisplayed(el));
		gsap.killTweensOf(all);
		if (visible.length) {
			gsap.set(visible, {
				opacity: 1,
				clearProps: 'opacity,transform,willChange'
			});
		}
		if (hidden.length) {
			gsap.set(hidden, {
				clearProps: 'opacity,transform,willChange',
				display: 'none'
			});
		}
	};

	// Internal runner to execute a single transition step (either show-all or filter-on)
	const runTransition = (
		targetClass: FilterClass,
		togglingOff: boolean,
		onDone?: () => void
	) => {
		const all = getAllGridItems();

		const classes: FilterClass[] = ['one', 'two', 'three'];
		const others = classes.filter(c => c !== targetClass) as FilterClass[];

		// Snapshot BEFORE state
		const beforeVisible = all.filter(isDisplayed);
		const beforeRects = measureRects(all);

		// Helpers to target elements by class
		const byClass = (c: FilterClass) => qAll(`${scopeSelector} .${c}`);
		const othersEls = byClass(others[0]).concat(byClass(others[1]));
		const selectedEls = byClass(targetClass);

		// Record current display to restore after measuring target state
		const recordedDisplay = new Map<HTMLElement, string>();
		all.forEach(el => {
			recordedDisplay.set(el, el.style.display);
		});

		// Apply TARGET layout for measurement
		if (togglingOff) {
			// show all
			all.forEach(el => {
				el.style.display = 'block';
			});
		} else {
			// hide others, show selected
			othersEls.forEach(el => {
				el.style.display = 'none';
			});
			selectedEls.forEach(el => {
				el.style.display = 'block';
			});
		}

		// Force layout and measure AFTER rects for items visible in target state
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		(document.body as HTMLBodyElement).offsetHeight;
		const afterVisibleEls = all.filter(isDisplayed);
		const afterRects = new Map<HTMLElement, DOMRect>();
		afterVisibleEls.forEach(el =>
			afterRects.set(el, el.getBoundingClientRect())
		);

		// Revert DOM display to recorded values (restore BEFORE state)
		all.forEach(el => {
			const rec = recordedDisplay.get(el);
			if (rec !== undefined) el.style.display = rec;
		});

		// Determine groups for animation
		const willBeVisible = new Set(afterVisibleEls);
		const willBeHidden = all.filter(el => !willBeVisible.has(el));

		// Prepare showing elements that are currently hidden
		const currentlyHidden = all.filter(el => !beforeVisible.includes(el));
		const toShow = afterVisibleEls.filter(el => currentlyHidden.includes(el));
		if (toShow.length) {
			// Show them in layout immediately, but start fully transparent
			gsap.set(toShow, { display: 'block', opacity: 0 });
		}

		// Start simultaneous animations at t=0
		// 1) Move visible-after elements using FLIP from BEFORE -> AFTER
		afterVisibleEls.forEach(el => {
			const prev = beforeRects.get(el);
			const next = afterRects.get(el);
			if (!next) return;
			// If element didn't exist before (was hidden), no FLIP move needed
			if (prev) {
				const dx = prev.left - next.left;
				const dy = prev.top - next.top;
				if (dx || dy) {
					gsap.set(el, { willChange: 'transform' });
					gsap.fromTo(
						el,
						{ x: dx, y: dy },
						{
							x: 0,
							y: 0,
							duration: totalDuration,
							clearProps: 'transform,willChange'
						}
					);
				}
			}
		});

		// 2) Fade out elements that will be hidden; at end set display:none
		if (willBeHidden.length) {
			const willBeHiddenVisible = willBeHidden.filter(
				isDisplayed
			) as HTMLElement[];

			// Use absolute decoupling for soon-to-hide items so the grid reflows immediately
			const container = all[0]?.parentElement as HTMLElement | undefined;
			if (container) {
				if (getComputedStyle(container).position === 'static') {
					gsap.set(container, { position: 'relative' });
				}
				const cr = container.getBoundingClientRect();
				willBeHiddenVisible.forEach(el => {
					const r = el.getBoundingClientRect();
					const left = r.left - cr.left + container.scrollLeft;
					const top = r.top - cr.top + container.scrollTop;
					gsap.set(el, {
						position: 'absolute',
						left,
						top,
						width: r.width,
						height: r.height,
						zIndex: 1,
						pointerEvents: 'none'
					});
				});

				if (willBeHiddenVisible.length) {
					gsap.to(willBeHiddenVisible, {
						opacity: 0,
						duration: totalDuration,
						onComplete: () => {
							gsap.set(willBeHiddenVisible, {
								display: 'none',
								clearProps:
									'opacity,position,left,top,width,height,zIndex,pointerEvents'
							});
						}
					});
				}
			} else {
				// Fallback: simple fade
				gsap.to(willBeHidden, {
					opacity: 0,
					duration: totalDuration,
					onComplete: () => {
						gsap.set(willBeHidden, {
							display: 'none',
							clearProps: 'opacity'
						});
					}
				});
			}
		}

		// 3) Fade in elements that will be shown
		if (toShow.length) {
			gsap.to(toShow, {
				opacity: 1,
				duration: totalDuration
			});
		}

		// Schedule finalization to ensure correct end state
		cleanupCallRef.current = gsap.delayedCall(totalDuration, () => {
			// Apply final target display state definitively
			if (togglingOff) {
				all.forEach(el => {
					el.style.display = 'block';
				});
				setActiveFilter(null);
			} else {
				othersEls.forEach(el => {
					el.style.display = 'none';
				});
				selectedEls.forEach(el => {
					el.style.display = 'block';
				});
				setActiveFilter(targetClass);
			}

			// Clear any temporary properties that might have been set on items
			const allNow = getAllGridItems();
			gsap.set(allNow, { clearProps: 'visibility,pointerEvents' });

			finalize();
			cleanupCallRef.current = null;
			// transition finished
			isAnimatingRef.current = false;
			if (onDone) onDone();
		});
	};

	const handleFilterClick = (className: FilterClass) => {
		// Ignore clicks while a transition is in progress
		if (isAnimatingRef.current) return;

		// mark transition start
		isAnimatingRef.current = true;

		const togglingOff = activeFilter === className; // show all when clicking the same filter
		// Single-phase behavior:
		// - If toggling off: show all
		// - Else: directly apply the new filter (no intermediate show-all phase)
		runTransition(className, togglingOff);
	};

	return { activeFilter, handleFilterClick } as const;
};
