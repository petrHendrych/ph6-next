import Image from 'next/image';
import React from 'react';

import Reveal from '@/components/Reveal';
import { atelier, team } from '@/data';

const AtelierContent = () => (
	<div className="flex flex-col gap-10 md:gap-28">
		<Reveal className="max-w-6xl">
			<p className="text-2xl leading-tight tracking-tight text-neutral-900 sm:text-3xl md:text-5xl md:leading-[1.1]">
				{atelier.lead}
			</p>
		</Reveal>

		<div className="grid gap-12 md:grid-cols-12 md:gap-10">
			<Reveal className="flex flex-col gap-6 md:col-span-8" stagger>
				{atelier.paragraphs.map(paragraph => (
					<p
						key={paragraph}
						// Wider than `max-w-prose` but still capped — the 8-column span
						// is over 1000px at the top container step, which is past a
						// readable measure at this size.
						className="max-w-[78ch] text-base leading-relaxed text-neutral-700 md:text-lg"
					>
						{paragraph}
					</p>
				))}
			</Reveal>

			<Reveal as="dl" className="md:col-span-4 md:col-start-9" stagger>
				{atelier.facts.map(({ label, value }) => (
					<div
						key={label}
						className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0"
					>
						<dt className="label-micro text-neutral-500">{label}</dt>
						<dd className="mt-2 text-base leading-relaxed text-neutral-900">
							{value}
						</dd>
					</div>
				))}
			</Reveal>
		</div>

		<div>
			<div className="flex items-center gap-5">
				<span className="label-micro text-neutral-500">Tým</span>
				<span className="h-px flex-1 bg-neutral-200" />
			</div>

			<Reveal
				className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-y-12 md:mt-10"
				stagger
			>
				{team.map((member, index) => (
					<figure key={member.src} className="group">
						{/* Square crop: the source portraits are 350×350, so any other
						    ratio would cut into them blindly. */}
						<div className="relative aspect-square overflow-hidden bg-neutral-100">
							<Image
								src={`/people/${member.src}.jpg`}
								alt={member.name}
								fill
								sizes="(min-width: 640px) 30vw, 90vw"
								quality={90}
								className="object-cover grayscale group-hover:grayscale-0 motion-safe:transition-[filter,scale] motion-safe:duration-700 motion-safe:ease-out motion-safe:will-change-[filter,scale] motion-safe:group-hover:scale-[1.04]"
							/>
						</div>
						<figcaption className="mt-4 flex items-baseline gap-4 border-t border-neutral-900/80 pt-3">
							<span className="label-micro text-neutral-500">
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className="text-sm tracking-[0.06em] text-neutral-900 md:text-base">
								{member.name}
							</span>
						</figcaption>
					</figure>
				))}
			</Reveal>

			<div className="mt-10 grid gap-6 border-t border-neutral-200 pt-6 sm:mt-12 sm:gap-8 sm:pt-8 md:grid-cols-3">
				<div className="md:col-span-2">
					<p className="label-micro text-neutral-500">Pracovní tým</p>
					{/* One name per row with a hairline between while the column is
					    narrow; a wrapping row once there is width for it. */}
					<ul className="mt-3 flex flex-col divide-y divide-neutral-200 md:mt-4 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-1.5 md:divide-y-0">
						{atelier.roster.map(name => (
							<li
								key={name}
								className="py-2 text-base text-neutral-700 md:py-0"
							>
								{name}
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="label-micro text-neutral-500">Vizualizace</p>
					<p className="mt-3 text-base text-neutral-700 md:mt-4">
						{atelier.visualization}
					</p>
				</div>
			</div>

			<p className="mt-10 text-sm uppercase tracking-[0.3em] text-neutral-900 md:mt-14">
				{atelier.closing}
			</p>
		</div>
	</div>
);

export default AtelierContent;
