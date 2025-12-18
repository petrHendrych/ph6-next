import React from 'react';

import { rewards } from '@/data';

const RewardsContent = () => (
	<div className="container mx-auto my-20 flex flex-wrap justify-center gap-12">
		{rewards.map((reward, index) => (
			<div
				key={index}
				className="flex h-[220px] w-[220px] flex-col items-center justify-center gap-4 rounded-full border-4 border-gray-300 text-center uppercase"
			>
				<span>{reward.title}</span>
				<span className="mx-2 text-[14px] text-gray-400">
					{reward.description}
				</span>
			</div>
		))}
	</div>
);

export default RewardsContent;
