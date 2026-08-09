import type {
	Atelier,
	Contact,
	Image,
	NavLink,
	PreviewCategory,
	Project,
	Reward,
	TeamMember
} from '@/types';

export const navLinks: NavLink[] = [
	{ hash: '#preview-section', label: 'Projekty' },
	{ hash: '#atelier-section', label: 'Ateliér' },
	{ hash: '#kontakt-section', label: 'Kontakt' }
];

// The label defines what belongs in the bucket — a project is tagged by what
// its label describes, not the other way round. `/projekty` orders its sections
// by how many projects each bucket holds, so this order is only a fallback.
export const previewCategories: { key: PreviewCategory; label: string }[] = [
	{ key: 'interiery', label: 'Interiéry a gastro' },
	{ key: 'bytove-domy', label: 'Bytové domy a apartmány' },
	{ key: 'rodinne-domy', label: 'Rodinné domy' },
	{ key: 'verejne', label: 'Veřejné a administrativní' }
];

export const team: TeamMember[] = [
	{ src: 'simon', name: 'Ing. arch. Šimon Brnada' },
	{ src: 'kristina', name: 'Ing. arch. Kristina Hanzlová' },
	{ src: 'pavel', name: 'Ing. arch. Pavel Hendrych' }
];

/** Studio copy. The lead is the sentence that used to open the second half of
 *  the original single block; the facts restate the same information in a
 *  scannable column next to the prose. */
export const atelier: Atelier = {
	lead: 'Ke každému klientovi přistupujeme individuálně — nepoužíváme zaběhlá schémata, ale hledáme originální a jedinečné řešení.',
	paragraphs: [
		'Architektonický ateliér PH6 založil Ing. arch. Šimon Brnada v roce 2002. V současné době se ateliér zabývá širokým spektrem zakázek od interiérové tvorby, přes návrhy rodinných i bytových domů až po objekty administrativní, obchodní, sportovní a školské stavby a je schopen zajistit veškeré přípravné, projektové i průzkumné práce.',
		'Snahou je poskytovat klientovi komplexní služby od urbanistického řešení až po projekty interiérů. V oboru interiérů se zabýváme hlavně navrhováním gastro provozů – máme za sebou desítky realizovaných restaurací a kaváren a zkušenosti s návrhy konceptových řetězců restaurací.',
		'V případě větších zakázek spolupracujeme s projekčními kancelářemi ARPLAN s.r.o. a ORTOGONAL s.r.o., které poskytují kvalitní projekční zázemí.'
	],
	facts: [
		{ label: 'Založeno', value: '2002' },
		{ label: 'Zakladatel', value: 'Ing. arch. Šimon Brnada' },
		{
			label: 'Zaměření',
			value:
				'Interiéry a gastro provozy, rodinné a bytové domy, administrativní, obchodní, sportovní a školské stavby'
		},
		{
			label: 'Služby',
			value:
				'Přípravné, projektové i průzkumné práce — od urbanistického řešení po projekty interiérů'
		},
		{ label: 'Spolupráce', value: 'ARPLAN s.r.o., ORTOGONAL s.r.o.' },
		{ label: '3D vizualizace', value: 'Ing. Jan Haspra — 3dvizualizace.cz' }
	],
	closing: 'Těšíme se na spolupráci'
};

/**
 * Projects with a detail page. Each one needs an entry here and a directory of
 * the same name under `public/projects/` — the `[slug]` route and
 * `subpageTitles` are both derived from this array.
 *
 * TODO: every value marked below is a placeholder. Only the location is known,
 * taken from the project's title in `previewImages`. Fill in the year, the
 * scope and the description before this goes live.
 */
export const projects: Project[] = [
	{
		slug: 'restaurace-garden',
		title: 'Restaurace Garden & Pub',
		location: 'Brno',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Brno' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gr1',
				alt: 'Restaurace Garden & Pub — interiér',
				width: 1440,
				height: 900
			},
			{
				src: 'gr2',
				alt: 'Restaurace Garden & Pub — interiér',
				width: 1440,
				height: 900
			},
			{
				src: 'gr3',
				alt: 'Restaurace Garden & Pub — detail interiéru',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gr4',
				alt: 'Restaurace Garden & Pub — detail interiéru',
				width: 542,
				height: 900,
				span: 'half'
			},
			{
				src: 'gr5',
				alt: 'Restaurace Garden & Pub — interiér',
				width: 1440,
				height: 900
			},
			{
				src: 'gr6',
				alt: 'Restaurace Garden & Pub — interiér',
				width: 1350,
				height: 900
			},
			{
				src: 'gr7',
				alt: 'Restaurace Garden & Pub — interiér',
				width: 1600,
				height: 900
			}
		]
	}
];

/** Title shown in `SubpageHeader`, derived so a new project needs no second
 *  edit. Natural case — the header uppercases it. */
export const subpageTitles: Record<string, string> = {
	'/projekty': 'Projekty',
	...Object.fromEntries(projects.map(({ slug, title }) => [`/${slug}`, title]))
};

export const contact: Contact = {
	addressLines: ['Národní obrany 31', 'Praha 6', '160 00, Česká republika'],
	email: 'brnada@ph6.cz',
	phone: '+420 602 236 516',
	mapUrl:
		'https://mapy.com/en/zakladni?q=narodni%20obrany%2031&source=firm&id=13622813&x=14.3965261&y=50.1012649&z=16',
	facebookUrl: 'https://www.facebook.com/ph6atelier/?fref=ts'
};

export const mainImages: Image[] = [
	{
		src: 'uvod_1',
		title: 'First image title'
	},
	{
		src: 'uvod_2',
		title: 'Second image title'
	},
	{
		src: 'uvod_3',
		title: 'Third image title'
	},
	{
		src: 'uvod_4',
		title: 'Fourth image title'
	}
];

export const rewards: Reward[] = [
	{
		title: 'interiér roku 2011',
		description: 'Návštěvnické centrum pivovaru staropramen',
		medal: 'gold'
	},
	{
		title: 'soutěž 1. místo',
		description: 'zimní stadion praha letňany',
		medal: 'gold'
	},
	{
		title: 'soutěž 1. místo',
		description: 'zahradní čtvrť praha-zbraslav',
		medal: 'gold'
	},
	{
		title: 'soutěž 2. místo',
		description: 'sos dětská vesnička brno mendlánky',
		medal: 'silver'
	},
	{
		title: 'český interiér',
		description: 'ambiente pizzanuova praha',
		medal: 'bronze'
	}
];

/** Projects shown on the landing page; the 20th tile links to `/projekty`.
 *  Lives here rather than in `PreviewGrid` because every export of a
 *  `'use client'` module is a client reference on the server — a server
 *  component importing it would get a proxy, not this number. */
export const HOME_PREVIEW_COUNT = 19;

/** Of those, how many a phone gets before the overview tile. 19 tiles in one or
 *  two columns is a very long scroll to reach the rest of the page. */
export const MOBILE_PREVIEW_COUNT = 9;

export const previewImages: Image[] = [
	{
		src: 'preview1',
		title: 'Restaurace Garden&Pub - Brno',
		category: 'interiery',
		slug: 'restaurace-garden'
	},
	{
		src: 'preview2',
		title: 'Restaurace Semmering - Hlubočepy',
		category: 'interiery'
	},
	{
		src: 'preview3',
		title: 'Penzion Kovárna - Český Krumlov',
		category: 'interiery'
	},
	{
		src: 'preview4',
		title: 'Restaurace Modrý dveře',
		category: 'interiery'
	},
	{
		src: 'preview5',
		title: 'Ocean`s bistro - Brno',
		category: 'interiery'
	},
	{
		src: 'preview6',
		title: 'Restaurace Steakgrill - Kralupy',
		category: 'interiery'
	},
	{
		src: 'preview7',
		title: 'Apartmány Harrachov',
		category: 'bytove-domy'
	},
	{
		src: 'preview8',
		title: 'Bistro GOOD FOOD',
		category: 'interiery'
	},
	{
		src: 'preview9',
		title: 'Pizzerie Michalengelo',
		category: 'interiery'
	},
	{
		src: 'preview10',
		title: 'Rodinný dům u Prahy',
		category: 'rodinne-domy'
	},
	{
		src: 'preview11',
		title: 'Rodinný dům Albrechtice',
		category: 'rodinne-domy'
	},
	{
		src: 'preview12',
		title: 'Srdcovka Spálená',
		category: 'interiery'
	},
	{
		src: 'preview13',
		title: 'Apartmány Albrechtice v Jizerských horách',
		category: 'bytove-domy'
	},
	{
		src: 'preview14',
		title: 'Rodinná vila - Černošice',
		category: 'rodinne-domy'
	},
	{
		src: 'preview15',
		title: 'Lokál - Korunní',
		category: 'interiery'
	},
	{
		src: 'preview16',
		title: 'Restaurace Passberg',
		category: 'interiery'
	},
	{
		src: 'preview17',
		title: 'pekárna PANNE NUOVO',
		category: 'interiery'
	},
	{
		src: 'preview18',
		title: 'Restaurace Solnice',
		category: 'interiery'
	},
	{
		src: 'preview19',
		title: 'Food story tržnice',
		category: 'interiery'
	},
	{
		src: 'preview20',
		title: 'Savoy Ambiente',
		category: 'interiery'
	},
	{
		src: 'preview21',
		title: 'Srdcovka Gurmanie = Praha Smíchov',
		category: 'interiery'
	},
	{
		src: 'preview22',
		title: 'Pizzanuova Ambiente',
		category: 'interiery'
	},
	{
		src: 'preview23',
		title: 'Budova společnosti MND',
		category: 'verejne'
	},
	{
		src: 'preview24',
		title: 'Naše maso - řeznictví',
		category: 'interiery'
	},
	{
		src: 'preview25',
		title: 'Lokál Pod Divadlem - Plzeň',
		category: 'interiery'
	},
	{
		src: 'preview26',
		title: 'Bytové domy Jesenice',
		category: 'bytove-domy'
	},
	{
		src: 'preview27',
		title: 'Kampus park Hodkovičky',
		category: 'verejne'
	},
	{
		src: 'preview28',
		title: 'Cantineta Florentina - Pařížská',
		category: 'interiery'
	},
	{
		src: 'preview29',
		title: 'Srdcovka Otrokovice',
		category: 'interiery'
	},
	{
		src: 'preview30',
		title: 'Restaurace Havelák',
		category: 'interiery'
	},
	{
		src: 'preview31',
		title: 'Restaurace GOOD FOOD',
		category: 'interiery'
	},
	{
		src: 'preview32',
		title: 'Areál bydlení a služeb pro seniory Chářovice',
		category: 'bytove-domy'
	},
	{
		src: 'preview33',
		title: 'Lokál U Caipla - Brno',
		category: 'interiery'
	},
	{
		src: 'preview34',
		title: 'Bytové domy Letňany',
		category: 'bytove-domy'
	},
	{
		src: 'preview35',
		title: 'Ambasada Saudské Arabie',
		category: 'verejne'
	},
	{
		src: 'preview36',
		title: 'XL restaurant - Praha',
		category: 'interiery'
	},
	{
		src: 'preview37',
		title: 'Golfový klub - Ropice',
		category: 'verejne'
	},
	{
		src: 'preview38',
		title: 'Wellness Reitenberger',
		category: 'interiery'
	},
	{
		src: 'preview39',
		title: 'Naše maso - prodejna',
		category: 'interiery'
	},
	{
		src: 'preview40',
		title: 'Nádraží Mladá Boleslav',
		category: 'verejne'
	},
	{
		src: 'preview41',
		title: 'Rodinné domy Kunratice',
		category: 'rodinne-domy'
	},
	{
		src: 'preview42',
		title: 'Koncept prodejen Gorenje',
		category: 'interiery'
	},
	{
		src: 'preview43',
		title: 'Koncept prodejen Alpine',
		category: 'interiery'
	},
	{
		src: 'preview44',
		title: 'Rodinné domy - Lučany',
		category: 'rodinne-domy'
	},
	{
		src: 'preview45',
		title: 'Obytný soubor Hostavice',
		category: 'bytove-domy'
	},
	{
		src: 'preview46',
		title: 'Restaurant La Degustation',
		category: 'interiery'
	},
	{
		src: 'preview47',
		title: 'Bytový dům Stodůlky',
		category: 'bytove-domy'
	},
	{
		src: 'preview48',
		title: 'Bytové domy - Zbraslav',
		category: 'bytove-domy'
	},
	{
		src: 'preview49',
		title: 'Bytový dům - Zbraslav',
		category: 'bytove-domy'
	},
	{
		src: 'preview50',
		title: 'Fresh Gyros - Praha',
		category: 'interiery'
	},
	{
		src: 'preview51',
		title: 'Rodinné domy - Makotřasy',
		category: 'rodinne-domy'
	},
	{
		src: 'preview52',
		title: 'Restaurace Klobásovna',
		category: 'interiery'
	},
	{
		src: 'preview53',
		title: 'Restaurace Zvonařka - Praha',
		category: 'interiery'
	},
	{
		src: 'preview54',
		title: 'T-Mobile administrativní objekt',
		category: 'verejne'
	}
];
