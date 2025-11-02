'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
	const headerRef = useRef<HTMLDivElement>(null);

	const scrollToTop = () => {
		gsap.to(window, {
			duration: 0.8,
			scrollTo: 0,
			ease: 'power2.inOut'
		});
	};

	const scrollToProjects = () => {
		gsap.to(window, {
			duration: 0.8,
			scrollTo: {
				y: '#preview-container',
				offsetY: +150
			},
			ease: 'power2.inOut'
		});
	};

	useGSAP(() => {
		gsap.to('#filter-container', {
			scrollTrigger: {
				trigger: '#preview-container',
				start: 'top top+=160px',
				toggleActions: 'play none none reverse'
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
						<span>one</span>
						<span>two</span>
						<span>three</span>
						<div className="ml-4 h-5 w-[1px] bg-gray-300" />
					</div>
					<nav>
						<ol className="flex select-none flex-row gap-8 uppercase">
							<li
								role="presentation"
								className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:duration-[400ms] after:ease-out hover:after:left-0 hover:after:w-full"
								onClick={scrollToProjects}
							>
								Projekty
							</li>
							<li className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:duration-[400ms] after:ease-out hover:after:left-0 hover:after:w-full">
								Ateliér
							</li>
							<li className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black after:transition-all after:duration-[400ms] after:ease-out hover:after:left-0 hover:after:w-full">
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
