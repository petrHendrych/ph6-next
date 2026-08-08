'use client';
import { useGSAP } from '@gsap/react';
import { useState, type RefObject } from 'react';

import { gsap } from '@/lib/gsap';

import { useReducedMotion } from './useReducedMotion';

type UseMobileMenuProps = {
	menuRef: RefObject<HTMLDivElement | null>;
	/** Button holding the three `.hamburger-line` bars. */
	hamburgerRef: RefObject<HTMLButtonElement | null>;
	/** Optional — subpages have no filter dropdown. */
	filterRef?: RefObject<HTMLDivElement | null>;
};

const PANEL_DURATION = 0.3;

export const useMobileMenu = ({
	menuRef,
	hamburgerRef,
	filterRef
}: UseMobileMenuProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const reduced = useReducedMotion();
	const { contextSafe } = useGSAP();

	const duration = reduced ? 0 : PANEL_DURATION;

	const animateHamburger = (tl: gsap.core.Timeline, open: boolean) => {
		const lines = gsap.utils.toArray<HTMLElement>(
			'.hamburger-line',
			hamburgerRef.current
		);
		if (lines.length < 3) return;

		tl.to(
			lines[0],
			{ rotation: open ? 45 : 0, y: open ? 8 : 0, duration: duration * 0.7 },
			0
		)
			.to(lines[1], { opacity: open ? 0 : 1, duration: duration * 0.7 }, 0)
			.to(
				lines[2],
				{
					rotation: open ? -45 : 0,
					y: open ? -8 : 0,
					duration: duration * 0.7
				},
				0
			);
	};

	const animatePanel = (
		tl: gsap.core.Timeline,
		el: HTMLElement | null | undefined,
		open: boolean
	) => {
		if (!el) return;

		if (open) {
			tl.fromTo(
				el,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration, ease: 'power2.out' },
				0
			);
		} else {
			tl.to(el, { height: 0, opacity: 0, duration, ease: 'power2.in' }, 0);
		}
	};

	const toggleMenu = contextSafe(() => {
		const open = !isMenuOpen;
		const tl = gsap.timeline();

		setIsMenuOpen(open);
		animateHamburger(tl, open);
		animatePanel(tl, menuRef.current, open);

		if (open && isFilterOpen) {
			setIsFilterOpen(false);
			animatePanel(tl, filterRef?.current, false);
		}
	});

	const toggleFilter = contextSafe(() => {
		const open = !isFilterOpen;
		const tl = gsap.timeline();

		setIsFilterOpen(open);
		animatePanel(tl, filterRef?.current, open);

		if (open && isMenuOpen) {
			setIsMenuOpen(false);
			animateHamburger(tl, false);
			animatePanel(tl, menuRef.current, false);
		}
	});

	return { isMenuOpen, isFilterOpen, toggleMenu, toggleFilter };
};
