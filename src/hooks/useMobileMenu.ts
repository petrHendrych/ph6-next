'use client';
import { useState, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

type UseMobileMenuProps = {
	menuRef: RefObject<HTMLDivElement | null>;
	filterDropdownRef: RefObject<HTMLDivElement | null>;
};

export const useMobileMenu = ({
	menuRef,
	filterDropdownRef
}: UseMobileMenuProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const { contextSafe } = useGSAP();

	const toggleMenu = contextSafe(() => {
		const newState = !isMenuOpen;
		setIsMenuOpen(newState);

		const tl = gsap.timeline();
		if (newState) {
			if (isFilterOpen) {
				setIsFilterOpen(false);
				tl.to(
					filterDropdownRef.current,
					{ height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' },
					0
				);
			}

			tl.to('#hamburger-line-1', { rotation: 45, y: 8, duration: 0.2 }, 0)
				.to('#hamburger-line-2', { opacity: 0, duration: 0.2 }, 0)
				.to('#hamburger-line-3', { rotation: -45, y: -8, duration: 0.2 }, 0)
				.fromTo(
					menuRef.current,
					{ height: 0, opacity: 0 },
					{ height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' },
					0
				);
		} else {
			tl.to('#hamburger-line-1', { rotation: 0, y: 0, duration: 0.2 }, 0)
				.to('#hamburger-line-2', { opacity: 1, duration: 0.2 }, 0)
				.to('#hamburger-line-3', { rotation: 0, y: 0, duration: 0.2 }, 0)
				.to(
					menuRef.current,
					{ height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' },
					0
				);
		}
	});

	const toggleFilter = contextSafe(() => {
		const newState = !isFilterOpen;
		setIsFilterOpen(newState);

		const tl = gsap.timeline();
		if (newState) {
			if (isMenuOpen) {
				setIsMenuOpen(false);
				tl.to('#hamburger-line-1', { rotation: 0, y: 0, duration: 0.2 }, 0)
					.to('#hamburger-line-2', { opacity: 1, duration: 0.2 }, 0)
					.to('#hamburger-line-3', { rotation: 0, y: 0, duration: 0.2 }, 0)
					.to(
						menuRef.current,
						{ height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' },
						0
					);
			}

			tl.fromTo(
				filterDropdownRef.current,
				{ height: 0, opacity: 0 },
				{ height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
			);
		} else {
			tl.to(filterDropdownRef.current, {
				height: 0,
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in'
			});
		}
	});

	return {
		isMenuOpen,
		isFilterOpen,
		toggleMenu,
		toggleFilter
	};
};
