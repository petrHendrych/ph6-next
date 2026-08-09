/** The label in `previewCategories` defines what belongs in each bucket. */
export type PreviewCategory =
	'interiery' | 'bytove-domy' | 'rodinne-domy' | 'verejne';

/** Source of truth for the detail routes — `projects` is keyed by it, so a tile
 *  can never link to a project that does not exist. Adding a page starts here. */
export type ProjectSlug =
	| 'restaurace-garden'
	| 'restaurace-semmering-hlubocepy'
	| 'penzion-kovarna'
	| 'restaurace-modry-dvere'
	| 'oceans-bistro'
	| 'restaurace-steakgrill-kralupy'
	| 'apartmany-harrachov'
	| 'bistro-good-food'
	| 'pizzerie-michelangelo'
	| 'rodinny-dum-u-prahy'
	| 'rodinny-dum-albrechtice'
	| 'srdcovka-spalena'
	| 'apartmany-albrechtice'
	| 'rodinna-vila-cernosice'
	| 'lokal-korunni'
	| 'restaurace-passberg'
	| 'pekarna-panne-nuovo'
	| 'restaurace-solnice'
	| 'food-story-trznice'
	| 'savoy-ambiente'
	| 'srdcovka-gurmanie'
	| 'pizzanuova-ambiente'
	| 'budova-mnd'
	| 'nase-maso-reznictvi'
	| 'lokal-pod-divadlem-plzen'
	| 'bytove-domy-jesenice'
	| 'kampus-park-hodkovicky'
	| 'cantinetta-fiorentina'
	| 'srdcovka-otrokovice'
	| 'restaurace-havelak'
	| 'restaurace-good-food'
	| 'charovice-seniori'
	| 'lokal-u-caipla'
	| 'bytove-domy-letnany'
	| 'ambasada-saudske-arabie'
	| 'xl-restaurant'
	| 'golfovy-klub-ropice'
	| 'wellness-reitenberger'
	| 'nase-maso-prodejna'
	| 'nadrazi-mlada-boleslav'
	| 'rodinne-domy-kunratice'
	| 'prodejny-gorenje'
	| 'prodejny-alpine'
	| 'rodinne-domy-lucany'
	| 'obytny-soubor-hostavice'
	| 'la-degustation'
	| 'bytovy-dum-stodulky'
	| 'bytove-domy-zbraslav'
	| 'bytovy-dum-zbraslav'
	| 'fresh-gyros'
	| 'rodinne-domy-makotrasy'
	| 'restaurace-klobasovna'
	| 'restaurace-zvonarka'
	| 'tmobile-administrativni-objekt';

export type Image = {
	src: string;
	title: string;
	category?: PreviewCategory;
	/** When set, the tile links to that project's detail page. */
	slug?: ProjectSlug;
	/** Average colour, painted behind the photo while it loads. Generated — see
	 *  `CLAUDE.md`. */
	color?: string;
	/** Inlined 20×9 JPEG. Hero images only; not worth the bytes on thumbnails. */
	blurDataURL?: string;
};

/** Placement; drives the accent colour of the row. */
export type RewardMedal = 'gold' | 'silver' | 'bronze';

export type Reward = {
	title: string;
	description: string;
	medal: RewardMedal;
	/** Set when the awarded building has a detail page; the row links to it. */
	slug?: ProjectSlug;
};

export type NavLink = {
	hash: string;
	label: string;
};

export type TeamMember = {
	src: string;
	name: string;
	/** See `Image['color']`. */
	color?: string;
};

export type Fact = {
	label: string;
	value: string;
};

export type Atelier = {
	/** Pull quote above the body copy. */
	lead: string;
	paragraphs: string[];
	facts: Fact[];
	/** Sign-off below the body copy. */
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
	/** See `Image['color']`. */
	color?: string;
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
