/** Bucket a project belongs to. The label in `previewCategories` defines what
 *  belongs in each one, and `/projekty` renders one section per bucket. */
export type PreviewCategory =
	| 'interiery'
	| 'bytove-domy'
	| 'rodinne-domy'
	| 'verejne';

/**
 * Every project that has a detail page. This union is the source of truth for
 * those routes: `projects` is keyed by it, and a preview tile points at a page
 * by slug rather than by a hand-written path, so a tile can never link to a
 * project that does not exist.
 *
 * Adding a detail page starts here — TypeScript then points at the `projects`
 * entry that is missing.
 */
export type ProjectSlug = 'restaurace-garden';

export type Image = {
	src: string;
	title: string;
	/** Filter bucket. Drives `data-category`, not styling. */
	category?: PreviewCategory;
	/** When set, the tile links to that project's detail page. */
	slug?: ProjectSlug;
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

export type ProjectPhoto = {
	/** Bare name; the component builds `/projects/${slug}/${src}.jpg`. */
	src: string;
	alt: string;
	/** Real intrinsic size, so the figure reserves its box before the jpg lands. */
	width: number;
	height: number;
	/** Sits two-up in a row instead of spanning the column. */
	span?: 'half';
};

export type Project = {
	/** Route segment and the directory under `public/projects/`. */
	slug: ProjectSlug;
	title: string;
	location: string;
	year: string;
	facts: Fact[];
	paragraphs: string[];
	photos: ProjectPhoto[];
};

export type Contact = {
	addressLines: string[];
	email: string;
	phone: string;
	mapUrl: string;
	facebookUrl: string;
};
