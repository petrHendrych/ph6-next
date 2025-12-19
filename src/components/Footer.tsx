import React from 'react';
import Image from 'next/image';

const Footer = () => (
	<footer className="h-[100px] w-full bg-[#515151]">
		<div className="mx-auto flex h-full items-center px-6">
			<div className="flex-1" />

			<div className="flex gap-6">
				<a
					href="https://www.facebook.com/ph6atelier/?fref=ts"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook"
					className="hover:opacity-80"
				>
					<Image
						src="/icons/facebook.svg"
						alt=""
						width={24}
						height={24}
						className="brightness-0 invert"
						aria-hidden="true"
					/>
				</a>
				<a
					href="mailto:brnada@ph6.cz"
					aria-label="Email"
					className="hover:opacity-80"
				>
					<Image
						src="/icons/envelope.svg"
						alt=""
						width={24}
						height={24}
						className="brightness-0 invert"
						aria-hidden="true"
					/>
				</a>
			</div>

			<div className="flex flex-1 justify-end">
				<span className="text-sm text-[#c5c5c5]">© PaP design 2018</span>
			</div>
		</div>
	</footer>
);

export default Footer;
