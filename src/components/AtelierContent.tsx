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

				{/* Sign-off, not a label — set in the prose voice and separated from
				    the body copy by colour rather than caps and tracking. */}
				<p className="max-w-[78ch] text-base leading-relaxed text-neutral-700 md:text-lg">
					{atelier.closing}
				</p>
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
						    ratio would cut into them blindly. The average colour holds
						    the frame until the jpg lands — near-grey here anyway, since
						    the portraits are shown desaturated. */}
						<div
							className="relative aspect-square overflow-hidden bg-neutral-100"
							style={
								member.color ? { backgroundColor: member.color } : undefined
							}
						>
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
		</div>
	</div>
);

export default AtelierContent;
