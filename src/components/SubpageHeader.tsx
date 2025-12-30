'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useMobileMenu } from '@/hooks/useMobileMenu';

const titles: Record<string, string> = {
	'/bistro-hlubocepy': 'BISTRO HLUBOCEPY',
	'/restaurace-garden': 'RESTAURACE GARDEN'
};

const SubpageHeader = () => {
	const pathname = usePathname();
	const title = titles[pathname] || '';
	const menuRef = useRef<HTMLDivElement>(null);
	const filterDropdownRef = useRef<HTMLDivElement>(null);

	const { toggleMenu } = useMobileMenu({
		menuRef,
		filterDropdownRef
	});

	return (
		<header className="fixed top-0 z-10 w-full bg-white shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-6 py-3 shadow-sm md:shadow-none">
				<Link href="/">
					<Image
						src="/logo.png"
						alt="Logo image"
						width={30}
						height={33}
						priority
						className="cursor-pointer"
					/>
				</Link>

				<div className="flex flex-row items-center gap-4 md:hidden">
					<span className="text-sm font-medium uppercase tracking-widest text-gray-500">
						{title}
					</span>
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
					<div className="flex-1 text-right">
						<span className="text-sm font-medium uppercase tracking-widest text-gray-500">
							{title}
						</span>
					</div>
					<div className="h-5 w-px bg-gray-300" />
					<nav>
						<ol className="flex select-none flex-row gap-8 uppercase">
							<li>
								<Link
									href="/#preview-section"
									className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black hover:after:left-0 hover:after:w-full motion-safe:after:transition-all motion-safe:after:ease-out"
								>
									Projekty
								</Link>
							</li>
							<li>
								<Link
									href="/#atelier-section"
									className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black hover:after:left-0 hover:after:w-full motion-safe:after:transition-all motion-safe:after:ease-out"
								>
									Ateliér
								</Link>
							</li>
							<li>
								<Link
									href="/#kontakt-section"
									className="relative cursor-pointer tracking-wider after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-black hover:after:left-0 hover:after:w-full motion-safe:after:transition-all motion-safe:after:ease-out"
								>
									Kontakt
								</Link>
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
					<Link
						href="/#preview-section"
						className="w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={toggleMenu}
					>
						Projekty
					</Link>
					<Link
						href="/#atelier-section"
						className="w-full border-b border-gray-100 py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={toggleMenu}
					>
						Ateliér
					</Link>
					<Link
						href="/#kontakt-section"
						className="w-full py-4 text-center text-sm uppercase tracking-widest hover:bg-gray-50"
						onClick={toggleMenu}
					>
						Kontakt
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default SubpageHeader;
