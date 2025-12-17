'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { useScrollTo } from '@/hooks/useScrollTo';
import { usePreviewFilter } from '@/hooks/usePreviewFilter';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const { scrollToProjects, scrollToTop, scrollToAtelier } = useScrollTo();

	const { activeFilter, handleFilterClick } = usePreviewFilter({
		scopeSelector: '#preview-section'
	});

	useGSAP(() => {
		gsap.to('#filter-container', {
			scrollTrigger: {
				trigger: '#preview-section',
				start: 'top top+=110px',
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
	});

	// moved into usePreviewFilter

	return (
		<header
			ref={headerRef}
			className="fixed top-0 z-10 w-full bg-white/60 shadow-sm transition-colors duration-500"
		>
			<div className="container mx-auto flex items-center justify-between px-6 py-3">
				<Image
					src="/logo.png"
					alt="Logo image"
					width={30}
					height={33}
					priority
					onClick={scrollToTop}
					className="cursor-pointer"
				/>
				<div className="flex flex-row items-center gap-10">
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
		</header>
	);
};

export default Header;
