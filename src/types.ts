export type PreviewCategory = 'one' | 'two' | 'three';

export type Image = {
	src: string;
	title: string;
	/** Filter bucket. Drives `data-category`, not styling. */
	category?: PreviewCategory;
	/** When set, the preview tile links to this route. */
	href?: string;
};

/** Placement the award represents; drives the accent colour of its row. */
export type RewardMedal = 'gold' | 'silver' | 'bronze';

export type Reward = {
	title: string;
	description: string;
	medal: RewardMedal;
};

export type NavLink = {
	hash: string;
	label: string;
};

export type TeamMember = {
	src: string;
	name: string;
};

/** Label/value pair in the studio fact column. */
export type Fact = {
	label: string;
	value: string;
};

export type Atelier = {
	/** Pull quote above the body copy. */
	lead: string;
	paragraphs: string[];
	facts: Fact[];
	/** Everyone on the team, including the members without a portrait. */
	roster: string[];
	visualization: string;
	closing: string;
};

export type Contact = {
	addressLines: string[];
	email: string;
	phone: string;
	mapUrl: string;
	facebookUrl: string;
};
