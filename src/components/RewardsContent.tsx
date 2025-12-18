import React from 'react';

import { rewards } from '@/data';

const RewardsContent = () => (
	<div className="lg:md-20 container mx-auto my-14 flex flex-wrap justify-center gap-12">
		{rewards.map((reward, index) => (
			<div
				key={index}
				className="flex h-[180px] w-[180px] flex-col items-center justify-center gap-2 rounded-full border-4 border-gray-300 text-center uppercase lg:h-[220px] lg:w-[220px] lg:gap-4"
			>
				<span className="text-sm lg:text-base lg:text-black">
					{reward.title}
				</span>
				<span className="lg:sm mx-4 text-xs text-gray-400">
					{reward.description}
				</span>
			</div>
		))}
	</div>
);

export default RewardsContent;
