import Link from 'next/link';
import React from 'react';

import Reveal from '@/components/Reveal';
import { rewards } from '@/data';
import { type RewardMedal } from '@/types';

// Full class names — Tailwind scans source text, so a composed
// `bg-${medal}` string is never generated.
const MEDAL_MARK: Record<RewardMedal, string> = {
	gold: 'bg-gold',
	silver: 'bg-silver',
	bronze: 'bg-bronze'
};

const MEDAL_WASH: Record<RewardMedal, string> = {
	gold: 'bg-gold/12',
	silver: 'bg-silver/20',
	bronze: 'bg-bronze/12'
};

const RewardsContent = () => (
	<Reveal as="ul" className="border-b border-neutral-200" stagger>
		{rewards.map((reward, index) => {
			const row = (
				<div className="relative flex flex-col gap-2 px-1 py-6 sm:flex-row sm:items-baseline sm:gap-8 md:py-8">
					<span className="label-micro w-8 shrink-0 text-neutral-500">
						{String(index + 1).padStart(2, '0')}
					</span>
					<h3 className="text-base tracking-[0.16em] text-neutral-900 uppercase sm:w-2/5 sm:shrink-0 md:text-lg">
						{reward.title}
					</h3>
					<p className="flex-1 text-sm text-neutral-600 group-hover:text-neutral-900 motion-safe:transition-colors sm:text-right">
						{reward.description}
					</p>
					{/* Only a handful of awards have a page behind them, so the row
					    says so in words — hover carries none of that on touch. */}
					{reward.slug ? (
						<span className="label-micro shrink-0 text-neutral-500 underline decoration-neutral-300 underline-offset-4 group-hover:text-neutral-900 group-hover:decoration-neutral-900 motion-safe:transition-colors">
							Detail
						</span>
					) : null}
					{/* Colour alone carries no information the title does not already
					    state, so it is decorative. */}
					<span
						className={`h-2.5 w-2.5 shrink-0 self-start sm:self-center ${
							MEDAL_MARK[reward.medal]
						}`}
						aria-hidden="true"
					/>
				</div>
			);

			return (
				<li
					key={`${reward.title}-${reward.description}`}
					className="group relative border-t border-neutral-200"
				>
					{/* Placement wash. Wipes across the row from the left on hover, so
					    the medal colour reads as a fill rather than a border. */}
					<span
						className={`pointer-events-none absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out ${
							MEDAL_WASH[reward.medal]
						}`}
						aria-hidden="true"
					/>

					{reward.slug ? (
						<Link href={`/${reward.slug}`} className="block">
							{row}
						</Link>
					) : (
						row
					)}
				</li>
			);
		})}
	</Reveal>
);

export default RewardsContent;
