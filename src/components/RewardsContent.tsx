import React from 'react';

import { rewards } from '@/data';
import { type RewardHoverColor } from '@/types';

// Full class names — Tailwind scans source text, so a composed
// `motion-reduce:group-hover:${x}` string is never generated.
const RING_BORDER: Record<RewardHoverColor, string> = {
	gold: 'border-gold',
	silver: 'border-silver',
	bronze: 'border-bronze'
};

const REDUCED_HOVER_BORDER: Record<RewardHoverColor, string> = {
	gold: 'motion-reduce:hover:border-gold',
	silver: 'motion-reduce:hover:border-silver',
	bronze: 'motion-reduce:hover:border-bronze'
};

const RewardsContent = () => (
	<div className="container mx-auto my-14 flex flex-wrap justify-center gap-12 lg:mb-20">
		{rewards.map(reward => (
			<div
				key={`${reward.title}-${reward.description}`}
				className={`group relative flex h-[180px] w-[180px] flex-col items-center justify-center gap-2 rounded-full border-4 border-gray-200 text-center uppercase transition-colors duration-500 lg:h-[220px] lg:w-[220px] lg:gap-4 ${
					REDUCED_HOVER_BORDER[reward.hoverColor]
				}`}
			>
				{/* Ring wipes in on hover; a child element, so group-hover applies. */}
				<div
					className={`motion-safe:absolute motion-safe:-inset-1 motion-safe:rounded-full motion-safe:border-4 ${
						RING_BORDER[reward.hoverColor]
					} motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out motion-safe:[clip-path:inset(100%_0_0_0)] group-hover:motion-safe:opacity-100 group-hover:motion-safe:[clip-path:inset(0_0_0_0)]`}
				/>
				<span className="relative z-10 text-sm lg:text-base">
					{reward.title}
				</span>
				<span className="relative z-10 mx-4 text-xs text-gray-400 lg:text-sm">
					{reward.description}
				</span>
			</div>
		))}
	</div>
);

export default RewardsContent;
