'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';

import HeaderProgress from '@/components/HeaderProgress';
import ScrollLink from '@/components/ScrollLink';
import Wordmark from '@/components/Wordmark';
import { navLinks, subpageTitles } from '@/data';
import { useMobileMenu } from '@/hooks/useMobileMenu';

const SubpageHeader = () => {
	const pathname = usePathname();
	const title = subpageTitles[pathname] ?? '';
	const menuRef = useRef<HTMLDivElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);

	const { isMenuOpen, toggleMenu } = useMobileMenu({ menuRef, hamburgerRef });

	// Permanently in the scrolled state — subpages have no hero to sit on, but
	// the bar should still match the one on the landing page.
	return (
		<header className="site-header is-scrolled fixed top-0 z-10 w-full">
			<div className="relative">
				<div className="header-bar container mx-auto flex items-center justify-between px-6">
					<Link
						href="/"
						aria-label="Domů"
						className="header-logo cursor-pointer"
					>
						<Wordmark className="text-xl text-neutral-900 md:text-2xl" />
					</Link>

					<div className="flex flex-row items-center gap-4 md:hidden">
						<span className="nav-label font-medium text-neutral-500">
							{title}
						</span>
						<button
							ref={hamburgerRef}
							type="button"
							className="flex h-6 w-6 flex-col justify-center gap-1.5"
							onClick={toggleMenu}
							aria-expanded={isMenuOpen}
							aria-controls="subpage-menu-panel"
							aria-label="Menu"
						>
							<span className="hamburger-line h-0.5 w-full bg-black" />
							<span className="hamburger-line h-0.5 w-full bg-black" />
							<span className="hamburger-line h-0.5 w-full bg-black" />
						</button>
					</div>

					<div className="hidden flex-row items-center gap-10 md:flex">
						<div className="flex-1 text-right">
							<span className="nav-label font-medium text-neutral-500">
								{title}
							</span>
						</div>
						<div className="h-5 w-px bg-gray-300" />
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
				id="subpage-menu-panel"
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

export default SubpageHeader;
