'use client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import React, { useRef } from 'react';

import { navLinks } from '@/data';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useScrollTo } from '@/hooks/useScrollTo';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const Header = () => {
	const headerRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);

	const reduced = useReducedMotion();
	const { scrollTo, scrollToTop } = useScrollTo();
	const { isMenuOpen, toggleMenu } = useMobileMenu({
		menuRef,
		hamburgerRef
	});

	useGSAP(
		() => {
			if (headerRef.current) {
				// Built-in toggleClass instead of hand-rolled classList juggling.
				ScrollTrigger.create({
					trigger: document.body,
					start: '80px top',
					end: 'max',
					toggleClass: { targets: headerRef.current, className: 'is-scrolled' }
				});
			}

			// Scroll-linked, so it stays under reduced motion — only the scrub
			// smoothing is dropped, otherwise the bar lags behind the wheel.
			gsap.to('.header-progress', {
				scaleX: 1,
				transformOrigin: 'left center',
				ease: 'none',
				scrollTrigger: {
					trigger: document.body,
					start: 'top top',
					end: 'max',
					scrub: reduced ? true : 0.3
				}
			});
		},
		{ scope: headerRef, dependencies: [reduced], revertOnUpdate: true }
	);

	const goTo = (hash: string) => (event: React.MouseEvent) => {
		event.preventDefault();
		scrollTo(hash);
	};

	return (
		<header ref={headerRef} className="site-header fixed top-0 z-10 w-full">
			<div className="relative">
				<div className="header-bar container mx-auto flex items-center justify-between px-6">
					<button
						type="button"
						onClick={scrollToTop}
						aria-label="Zpět nahoru"
						className="header-logo cursor-pointer"
					>
						<Image src="/logo.png" alt="PH6" width={30} height={33} priority />
					</button>

					<div className="flex flex-row items-center gap-4 md:hidden">
						<button
							ref={hamburgerRef}
							type="button"
							className="flex h-6 w-6 flex-col justify-center gap-1.5"
							onClick={toggleMenu}
							aria-expanded={isMenuOpen}
							aria-controls="mobile-menu-panel"
							aria-label="Menu"
						>
							<span className="hamburger-line h-0.5 w-full bg-black" />
							<span className="hamburger-line h-0.5 w-full bg-black" />
							<span className="hamburger-line h-0.5 w-full bg-black" />
						</button>
					</div>

					<div className="hidden flex-row items-center gap-10 md:flex">
						<nav>
							<ol className="flex select-none flex-row gap-8 uppercase">
								{navLinks.map(({ hash, label }) => (
									<li key={hash}>
										<a
											href={hash}
											onClick={goTo(hash)}
											className="nav-underline cursor-pointer"
										>
											{label}
										</a>
									</li>
								))}
							</ol>
						</nav>
					</div>
				</div>
				<span className="header-progress" aria-hidden="true" />
			</div>

			<div
				id="mobile-menu-panel"
				ref={menuRef}
				className="overflow-hidden bg-white md:hidden"
				style={{ height: 0 }}
			>
				<nav className="flex flex-col items-center">
					{navLinks.map(({ hash, label }, index) => (
						<a
							key={hash}
							href={hash}
							onClick={event => {
								goTo(hash)(event);
								toggleMenu();
							}}
							className={`w-full py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50 ${
								index < navLinks.length - 1 ? 'border-b border-gray-100' : ''
							}`}
						>
							{label}
						</a>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
