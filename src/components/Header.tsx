'use client';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

import HeaderProgress from '@/components/HeaderProgress';
import ScrollLink from '@/components/ScrollLink';
import Wordmark from '@/components/Wordmark';
import { navLinks } from '@/data';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useScrollTo } from '@/hooks/useScrollTo';
import { ScrollTrigger } from '@/lib/gsap';

const Header = () => {
	const headerRef = useRef<HTMLElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);

	const { scrollToTop } = useScrollTo();
	const { isMenuOpen, toggleMenu } = useMobileMenu({
		menuRef,
		hamburgerRef
	});

	useGSAP(
		() => {
			if (!headerRef.current) return;

			ScrollTrigger.create({
				trigger: document.body,
				start: '80px top',
				end: 'max',
				toggleClass: { targets: headerRef.current, className: 'is-scrolled' }
			});
		},
		{ scope: headerRef }
	);

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
						<Wordmark className="text-xl text-neutral-900 md:text-2xl" />
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
							<ol className="flex flex-row gap-8 select-none">
								{navLinks.map(({ hash, label }) => (
									<li key={hash}>
										<ScrollLink
											hash={hash}
											className="nav-label nav-underline cursor-pointer"
										>
											{label}
										</ScrollLink>
									</li>
								))}
							</ol>
						</nav>
					</div>
				</div>
				<HeaderProgress />
			</div>

			<div
				id="mobile-menu-panel"
				ref={menuRef}
				className="overflow-hidden bg-white md:hidden"
				style={{ height: 0 }}
			>
				<nav className="flex flex-col items-center">
					{navLinks.map(({ hash, label }, index) => (
						<ScrollLink
							key={hash}
							hash={hash}
							onNavigate={toggleMenu}
							className={`nav-label w-full py-4 text-center hover:bg-neutral-50 ${
								index < navLinks.length - 1 ? 'border-b border-neutral-100' : ''
							}`}
						>
							{label}
						</ScrollLink>
					))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
