'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useScrollTo } from '@/hooks/useScrollTo';
import { usePreviewFilter } from '@/hooks/usePreviewFilter';
import { useMobileMenu } from '@/hooks/useMobileMenu';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const filterDropdownRef = useRef<HTMLDivElement>(null);
	const { scrollToProjects, scrollToTop, scrollToAtelier } = useScrollTo();
	const { activeFilter, handleFilterClick } = usePreviewFilter({
		scopeSelector: '#preview-section'
	});
	const { toggleMenu, toggleFilter } = useMobileMenu({
		menuRef,
		filterDropdownRef
	});

	useGSAP(
		() => {
			gsap.to(['#filter-container', '#mobile-filter-icon'], {
				scrollTrigger: {
					trigger: '#preview-section',
					start: 'top+=110px top+=110px',
					end: 'bottom top+=110px',
					toggleActions: 'play reverse play reverse'
				},
				opacity: 1,
				duration: 0.2
			});

			ScrollTrigger.create({
				trigger: 'body',
				start: '80px top',
				end: '80px top',
				onEnter: () => {
					headerRef.current?.classList.remove('bg-white/60');
					headerRef.current?.classList.add('bg-white');
				},
				onLeaveBack: () => {
					headerRef.current?.classList.remove('bg-white');
					headerRef.current?.classList.add('bg-white/60');
				}
			});
		},
		{ scope: headerRef }
	);

	return (
		<header
			ref={headerRef}
			className="fixed top-0 z-10 w-full bg-white shadow-sm transition-colors duration-500 md:bg-white/60"
		>
			<div className="container mx-auto flex items-center justify-between px-6 py-3 shadow-sm md:shadow-none">
				<Image
					src="/logo.png"
					alt="Logo image"
					width={30}
					height={33}
					priority
					onClick={scrollToTop}
					className="cursor-pointer"
				/>

				<div className="flex flex-row items-center gap-4 md:hidden">
					<div
						id="mobile-filter-icon"
						className="cursor-pointer text-sm font-medium uppercase opacity-0"
						onClick={toggleFilter}
					>
						filter
					</div>
					<button
						className="flex h-6 w-6 flex-col justify-center gap-1.5"
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<span id="hamburger-line-1" className="h-0.5 w-full bg-black" />
						<span id="hamburger-line-2" className="h-0.5 w-full bg-black" />
						<span id="hamburger-line-3" className="h-0.5 w-full bg-black" />
					</button>
				</div>

				<div className="hidden flex-row items-center gap-10 md:flex">
					<div
						id="filter-container"
						className="flex flex-row gap-6 text-sm text-gray-400 opacity-0"
					>
						<button
							className={`cursor-pointer transition-colors duration-75 hover:text-black${
								activeFilter === 'one' ? ' text-black' : ''
							}`}
							onClick={() => handleFilterClick('one')}
						>
							one
						</button>
						<button
							className={`cursor-pointer transition-colors duration-75 hover:text-black${
								activeFilter === 'two' ? ' text-black' : ''
							}`}
							onClick={() => handleFilterClick('two')}
						>
							two
						</button>
						<button
							className={`cursor-pointer transition-colors duration-75 hover:text-black${
								activeFilter === 'three' ? ' text-black' : ''
							}`}
							onClick={() => handleFilterClick('three')}
						>
							three
						</button>
						<div className="ml-4 h-5 w-px bg-gray-300" />
					</div>
					<nav>
						<ol className="flex select-none flex-row gap-8 uppercase">
							<li
								role="presentation"
								className="after:duration-400 relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:ease-out hover:after:left-0 hover:after:w-full"
								onClick={scrollToProjects}
							>
								Projekty
							</li>
							<li
								role="presentation"
								className="after:duration-400 relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:ease-out hover:after:left-0 hover:after:w-full"
								onClick={scrollToAtelier}
							>
								Ateliér
							</li>
							<li className="after:duration-400 relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:ease-out hover:after:left-0 hover:after:w-full">
								Kontakt
							</li>
						</ol>
					</nav>
				</div>
			</div>

			<div
				ref={menuRef}
				className="overflow-hidden bg-white md:hidden"
				style={{ height: 0 }}
			>
				<nav className="flex flex-col items-center">
					<button
						className="w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={() => {
							scrollToProjects();
							toggleMenu();
						}}
					>
						Projekty
					</button>
					<button
						className="w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={() => {
							scrollToAtelier();
							toggleMenu();
						}}
					>
						Ateliér
					</button>
					<button
						className="w-full py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={() => {
							toggleMenu();
						}}
					>
						Kontakt
					</button>
				</nav>
			</div>

			<div
				ref={filterDropdownRef}
				className="overflow-hidden bg-white md:hidden"
				style={{ height: 0 }}
			>
				<div className="flex flex-col items-center">
					<button
						className={`w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50 ${
							activeFilter === 'one' ? 'font-bold text-black' : 'text-gray-400'
						}`}
						onClick={() => {
							handleFilterClick('one');
							toggleFilter();
						}}
					>
						one
					</button>
					<button
						className={`w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50 ${
							activeFilter === 'two' ? 'font-bold text-black' : 'text-gray-400'
						}`}
						onClick={() => {
							handleFilterClick('two');
							toggleFilter();
						}}
					>
						two
					</button>
					<button
						className={`w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50 ${
							activeFilter === 'three'
								? 'font-bold text-black'
								: 'text-gray-400'
						}`}
						onClick={() => {
							handleFilterClick('three');
							toggleFilter();
						}}
					>
						three
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
