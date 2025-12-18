import React from 'react';

import { rewards } from '@/data';
import { type RewardHoverColor } from '@/types';

const RewardsContent = () => {
	const getHoverBorderColor = (color: RewardHoverColor) => {
		switch (color) {
			case 'gold':
				return 'border-gold';
			case 'silver':
				return 'border-silver';
			case 'bronze':
				return 'border-bronze';
			default:
				return 'border-gold';
		}
	};

	return (
		<div className="lg:md-20 container mx-auto my-14 flex flex-wrap justify-center gap-12">
			{rewards.map((reward, index) => {
				const borderColorClass = getHoverBorderColor(reward.hoverColor);

				return (
					<div
						key={index}
						className={`group relative flex h-[180px] w-[180px] flex-col items-center justify-center gap-2 rounded-full border-4 border-gray-200 text-center uppercase transition-colors duration-500 motion-reduce:group-hover:${borderColorClass} lg:h-[220px] lg:w-[220px] lg:gap-4`}
					>
						<div
							className={`motion-safe:absolute motion-safe:-inset-1 motion-safe:rounded-full motion-safe:border-4 ${borderColorClass} motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-in-out motion-safe:[clip-path:inset(100%_0_0_0)] group-hover:motion-safe:opacity-100 group-hover:motion-safe:[clip-path:inset(0_0_0_0)]`}
						/>
						<span className="relative z-10 text-sm lg:text-base lg:text-black">
							{reward.title}
						</span>
						<span className="lg:sm relative z-10 mx-4 text-xs text-gray-400">
							{reward.description}
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default RewardsContent;
