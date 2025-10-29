import React from 'react';
import Image from 'next/image';

const Header = () => (
	<header className="fixed z-10 w-full bg-white/60">
		<div className="container mx-auto flex items-center justify-between py-3">
			<Image src="/logo.png" alt="Logo image" width={30} height={33} priority />
			<nav>
				<ol className="seleng-none flex cursor-pointer flex-row gap-8 uppercase">
					<li className="tracking-wider">Projekty</li>
					<li className="tracking-wider">Ateliér</li>
					<li className="tracking-wider">Kontakt</li>
				</ol>
			</nav>
		</div>
	</header>
);

export default Header;
