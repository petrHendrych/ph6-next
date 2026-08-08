export type PreviewCategory = 'one' | 'two' | 'three';

export type Image = {
	src: string;
	title: string;
	/** Filter bucket. Drives `data-category`, not styling. */
	category?: PreviewCategory;
	/** When set, the preview tile links to this route. */
	href?: string;
};

export type RewardHoverColor = 'gold' | 'silver' | 'bronze';

export type Reward = {
	title: string;
	description: string;
	hoverColor: RewardHoverColor;
};

export type NavLink = {
	hash: string;
	label: string;
};

export type TeamMember = {
	src: string;
	name: string;
};
