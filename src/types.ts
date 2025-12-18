export type Image = {
	src: string;
	title: string;
	className?: string;
};

export type RewardHoverColor = 'gold' | 'silver' | 'bronze';

export type Reward = {
	title: string;
	description: string;
	hoverColor: RewardHoverColor;
};
