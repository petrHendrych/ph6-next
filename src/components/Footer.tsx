import Image from 'next/image';
import React from 'react';

import ScrollLink from '@/components/ScrollLink';
import Wordmark from '@/components/Wordmark';
import { contact, navLinks } from '@/data';

const SOCIAL = [
	{ href: contact.facebookUrl, label: 'Facebook', icon: 'facebook' },
	{ href: `mailto:${contact.email}`, label: 'Email', icon: 'envelope' }
];

const Footer = () => (
	<footer className="bg-footer text-footer-text">
		<div className="container mx-auto px-6">
			<div className="grid gap-12 border-b border-white/10 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-12">
				<div className="lg:col-span-5">
					<Wordmark className="text-3xl text-white md:text-4xl" />
					<p className="mt-5 max-w-xs text-sm leading-relaxed">
						Architektonický ateliér — interiéry, gastro provozy a stavby všech
						měřítek.
					</p>
				</div>

				<nav className="lg:col-span-3">
					<p className="label-micro text-white/50">Navigace</p>
					<ul className="mt-4 flex flex-col gap-2">
						{navLinks.map(({ hash, label }) => (
							<li key={hash}>
								<ScrollLink
									hash={hash}
									className="nav-label nav-underline text-white/90 hover:text-white"
								>
									{label}
								</ScrollLink>
							</li>
						))}
					</ul>
				</nav>

				<div className="lg:col-span-4">
					<p className="label-micro text-white/50">Kontakt</p>
					<address className="mt-4 flex flex-col gap-1 text-sm not-italic">
						<span>{contact.addressLines.join(', ')}</span>
						<a
							href={`mailto:${contact.email}`}
							className="nav-underline w-fit text-white/90 hover:text-white"
						>
							{contact.email}
						</a>
						<a
							href={`tel:${contact.phone.replace(/\s/g, '')}`}
							className="nav-underline w-fit text-white/90 hover:text-white"
						>
							{contact.phone}
						</a>
					</address>

					<div className="mt-6 flex gap-3">
						{SOCIAL.map(({ href, label, icon }) => (
							<a
								key={label}
								href={href}
								{...(href.startsWith('http')
									? { target: '_blank', rel: 'noopener noreferrer' }
									: {})}
								aria-label={label}
								className="flex h-10 w-10 items-center justify-center border border-white/20 hover:border-white/60 hover:bg-white/10 motion-safe:transition-colors"
							>
								<Image
									src={`/icons/${icon}.svg`}
									alt=""
									width={18}
									height={18}
									className="brightness-0 invert"
									aria-hidden="true"
								/>
							</a>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
				<span className="text-xs">© PaP design 2018</span>
				<span className="label-micro text-white/40">
					Praha, Česká republika
				</span>
			</div>
		</div>
	</footer>
);

export default Footer;
