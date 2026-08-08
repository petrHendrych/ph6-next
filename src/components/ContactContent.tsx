import Image from 'next/image';
import React from 'react';

import Reveal from '@/components/Reveal';
import { contact } from '@/data';

const ContactContent = () => (
	<div className="flex flex-col gap-8 md:gap-16">
		<Reveal className="grid gap-10 sm:grid-cols-3 sm:gap-8" stagger>
			<div className="border-t border-neutral-900/80 pt-4">
				<p className="label-micro text-neutral-500">Adresa</p>
				<a
					href={contact.mapUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="nav-underline mt-3 inline-block text-lg leading-snug tracking-tight text-neutral-900"
				>
					{contact.addressLines.map(line => (
						<span key={line} className="block">
							{line}
						</span>
					))}
				</a>
			</div>

			<div className="border-t border-neutral-900/80 pt-4">
				<p className="label-micro text-neutral-500">Email</p>
				<a
					href={`mailto:${contact.email}`}
					className="nav-underline mt-3 inline-block text-lg tracking-tight text-neutral-900"
				>
					{contact.email}
				</a>
			</div>

			<div className="border-t border-neutral-900/80 pt-4">
				<p className="label-micro text-neutral-500">Telefon</p>
				<a
					href={`tel:${contact.phone.replace(/\s/g, '')}`}
					className="nav-underline mt-3 inline-block text-lg tracking-tight text-neutral-900"
				>
					{contact.phone}
				</a>
			</div>
		</Reveal>

		<Reveal>
			<a
				href={contact.mapUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Otevřít mapu v novém okně"
				// The source map is a 2017×377 strip. Its native ratio is only usable
				// once the viewport is wide — at 360px it collapses to a 67px sliver,
				// so the phone gets a fixed height and crops to the right instead.
				className="group relative block h-[220px] w-full overflow-hidden bg-neutral-100 sm:h-[280px] md:aspect-[2017/377] md:h-auto md:max-h-[340px]"
			>
				<Image
					src="/map.png"
					alt=""
					fill
					sizes="100vw"
					className="object-cover object-right grayscale group-hover:grayscale-0 motion-safe:transition-[filter,scale] motion-safe:duration-700 motion-safe:ease-out motion-safe:will-change-[filter,scale] motion-safe:group-hover:scale-[1.015]"
				/>
				<span className="label-micro absolute right-0 bottom-0 bg-white px-4 py-3 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white motion-safe:transition-colors">
					Otevřít v mapách
				</span>
			</a>
		</Reveal>
	</div>
);

export default ContactContent;
