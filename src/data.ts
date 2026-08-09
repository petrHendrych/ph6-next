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

/**
 * Origin every canonical URL, sitemap entry and absolute OG image is built
 * from. A preview deployment sets `NEXT_PUBLIC_SITE_URL` to its own origin so
 * it does not advertise the production URLs as its own.
 *
 * The apex is the canonical host: `www.ph6.cz` is a CNAME onto it and today
 * both answer 200, which is a duplicate the new hosting should settle with a
 * 301 from `www` to the apex, and from `http` to `https`.
 */
export const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ph6.cz'
).replace(/\/$/, '');

/**
 * Whether this deployment may be indexed. **Opt-in on purpose**: the studio's
 * old site is live on the domain, and a staging build that indexes itself
 * competes with it for the same Czech queries under a URL nobody should land
 * on. Only the deployment that sets `NEXT_PUBLIC_INDEXABLE=true` is crawlable;
 * everything else serves `noindex` and a `Disallow: /` robots file.
 *
 * Set it when the new site takes over the domain — not before.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';

/** The one-sentence pitch: search result snippet, OG description, JSON-LD. */
export const siteDescription =
	'Architektonický ateliér PH6 z Prahy — návrhy interiérů a gastro provozů, rodinných a bytových domů i veřejných a administrativních staveb. Od roku 2002.';

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
	{ src: 'simon', name: 'Ing. arch. Šimon Brnada', color: '#5b5b5b' },
	{ src: 'kristina', name: 'Ing. arch. Kristina Hanzlová', color: '#9c9a9b' },
	{ src: 'pavel', name: 'Ing. arch. Pavel Hendrych', color: '#656565' }
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
 * The 54 entries and their photo lists were generated from the old site's
 * `images/` tree: one folder per project, file names kept, `width`/`height`
 * read off the jpgs and `span: 'half'` set on every portrait shot.
 *
 * TODO: the old pages carried no copy, so `year`, `Rozsah` and `paragraphs`
 * are placeholders everywhere, and `location` is filled in only where the
 * title in `previewImages` names a place — the rest read `TODO`. The alt texts
 * are indexed rather than descriptive for the same reason. Fill all of it in
 * before this goes live.
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
				alt: 'Restaurace Garden & Pub — fotografie 1',
				width: 1440,
				height: 900,
				color: '#87836e'
			},
			{
				src: 'gr2',
				alt: 'Restaurace Garden & Pub — fotografie 2',
				width: 1440,
				height: 900,
				color: '#989375'
			},
			{
				src: 'gr3',
				alt: 'Restaurace Garden & Pub — fotografie 3',
				width: 600,
				height: 900,
				span: 'half',
				color: '#9d967e'
			},
			{
				src: 'gr4',
				alt: 'Restaurace Garden & Pub — fotografie 4',
				width: 542,
				height: 900,
				span: 'half',
				color: '#8d714b'
			},
			{
				src: 'gr5',
				alt: 'Restaurace Garden & Pub — fotografie 5',
				width: 1440,
				height: 900,
				color: '#91896f'
			},
			{
				src: 'gr6',
				alt: 'Restaurace Garden & Pub — fotografie 6',
				width: 1350,
				height: 900,
				color: '#9e9480'
			},
			{
				src: 'gr7',
				alt: 'Restaurace Garden & Pub — fotografie 7',
				width: 1600,
				height: 900,
				color: '#5b8056'
			}
		]
	},
	{
		slug: 'restaurace-semmering-hlubocepy',
		title: 'Restaurace Semmering',
		location: 'Praha — Hlubočepy',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Hlubočepy' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'hl1',
				alt: 'Restaurace Semmering — fotografie 1',
				width: 1350,
				height: 900,
				color: '#8f8981'
			},
			{
				src: 'hl2',
				alt: 'Restaurace Semmering — fotografie 2',
				width: 1199,
				height: 900,
				color: '#77786a'
			},
			{
				src: 'hl3',
				alt: 'Restaurace Semmering — fotografie 3',
				width: 1350,
				height: 900,
				color: '#7c7a74'
			},
			{
				src: 'hl4',
				alt: 'Restaurace Semmering — fotografie 4',
				width: 1350,
				height: 900,
				color: '#7e7567'
			},
			{
				src: 'hl5',
				alt: 'Restaurace Semmering — fotografie 5',
				width: 1350,
				height: 900,
				color: '#8a7868'
			},
			{
				src: 'hl6',
				alt: 'Restaurace Semmering — fotografie 6',
				width: 1350,
				height: 900,
				color: '#9c806c'
			},
			{
				src: 'hl7',
				alt: 'Restaurace Semmering — fotografie 7',
				width: 1350,
				height: 900,
				color: '#846956'
			},
			{
				src: 'hl8',
				alt: 'Restaurace Semmering — fotografie 8',
				width: 1350,
				height: 900,
				color: '#856c57'
			},
			{
				src: 'hl9',
				alt: 'Restaurace Semmering — fotografie 9',
				width: 1350,
				height: 900,
				color: '#5d4a26'
			}
		]
	},
	{
		slug: 'penzion-kovarna',
		title: 'Penzion Kovárna',
		location: 'Český Krumlov',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Český Krumlov' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'kov1',
				alt: 'Penzion Kovárna — fotografie 1',
				width: 1200,
				height: 900,
				color: '#968a7c'
			},
			{
				src: 'kov2',
				alt: 'Penzion Kovárna — fotografie 2',
				width: 1351,
				height: 900,
				color: '#a6978d'
			},
			{
				src: 'kov3',
				alt: 'Penzion Kovárna — fotografie 3',
				width: 1351,
				height: 900,
				color: '#aca39b'
			},
			{
				src: 'kov4',
				alt: 'Penzion Kovárna — fotografie 4',
				width: 1351,
				height: 900,
				color: '#aba8a5'
			},
			{
				src: 'kov5',
				alt: 'Penzion Kovárna — fotografie 5',
				width: 675,
				height: 900,
				span: 'half',
				color: '#98784f'
			},
			{
				src: 'kov6',
				alt: 'Penzion Kovárna — fotografie 6',
				width: 1351,
				height: 900,
				color: '#a99f98'
			},
			{
				src: 'kov7',
				alt: 'Penzion Kovárna — fotografie 7',
				width: 1235,
				height: 900,
				color: '#75758a'
			}
		]
	},
	{
		slug: 'restaurace-modry-dvere',
		title: 'Restaurace Modré dveře',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'mo1',
				alt: 'Restaurace Modré dveře — fotografie 1',
				width: 1350,
				height: 900,
				color: '#86705b'
			},
			{
				src: 'mo2',
				alt: 'Restaurace Modré dveře — fotografie 2',
				width: 1350,
				height: 900,
				color: '#766c5e'
			},
			{
				src: 'mo3',
				alt: 'Restaurace Modré dveře — fotografie 3',
				width: 1350,
				height: 900,
				color: '#746353'
			},
			{
				src: 'mo4',
				alt: 'Restaurace Modré dveře — fotografie 4',
				width: 1350,
				height: 900,
				color: '#a19380'
			},
			{
				src: 'mo5',
				alt: 'Restaurace Modré dveře — fotografie 5',
				width: 600,
				height: 900,
				span: 'half',
				color: '#99866c'
			},
			{
				src: 'mo6',
				alt: 'Restaurace Modré dveře — fotografie 6',
				width: 1350,
				height: 900,
				color: '#68492b'
			}
		]
	},
	{
		slug: 'oceans-bistro',
		title: 'Ocean’s bistro',
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
				src: 'oc1',
				alt: 'Ocean’s bistro — fotografie 1',
				width: 1350,
				height: 900,
				color: '#849c9c'
			},
			{
				src: 'oc2',
				alt: 'Ocean’s bistro — fotografie 2',
				width: 1337,
				height: 900,
				color: '#949ea2'
			},
			{
				src: 'oc3',
				alt: 'Ocean’s bistro — fotografie 3',
				width: 1385,
				height: 900,
				color: '#989891'
			},
			{
				src: 'oc5',
				alt: 'Ocean’s bistro — fotografie 4',
				width: 739,
				height: 900,
				span: 'half',
				color: '#9dbcbb'
			}
		]
	},
	{
		slug: 'restaurace-steakgrill-kralupy',
		title: 'Restaurace Steakgrill',
		location: 'Kralupy nad Vltavou',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Kralupy nad Vltavou' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'st1',
				alt: 'Restaurace Steakgrill — fotografie 1',
				width: 1350,
				height: 900,
				color: '#988981'
			},
			{
				src: 'st2',
				alt: 'Restaurace Steakgrill — fotografie 2',
				width: 1350,
				height: 900,
				color: '#7e736c'
			},
			{
				src: 'st3',
				alt: 'Restaurace Steakgrill — fotografie 3',
				width: 1350,
				height: 900,
				color: '#5f5045'
			},
			{
				src: 'st4',
				alt: 'Restaurace Steakgrill — fotografie 4',
				width: 600,
				height: 900,
				span: 'half',
				color: '#93857f'
			},
			{
				src: 'st5',
				alt: 'Restaurace Steakgrill — fotografie 5',
				width: 600,
				height: 900,
				span: 'half',
				color: '#604d3d'
			},
			{
				src: 'st6',
				alt: 'Restaurace Steakgrill — fotografie 6',
				width: 1350,
				height: 900,
				color: '#897366'
			},
			{
				src: 'st7',
				alt: 'Restaurace Steakgrill — fotografie 7',
				width: 626,
				height: 900,
				span: 'half',
				color: '#7d6c53'
			},
			{
				src: 'st8',
				alt: 'Restaurace Steakgrill — fotografie 8',
				width: 600,
				height: 900,
				span: 'half',
				color: '#987868'
			}
		]
	},
	{
		slug: 'apartmany-harrachov',
		title: 'Apartmány Harrachov',
		location: 'Harrachov',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Harrachov' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'hr1',
				alt: 'Apartmány Harrachov — fotografie 1',
				width: 1096,
				height: 900,
				color: '#7d8274'
			},
			{
				src: 'hr3',
				alt: 'Apartmány Harrachov — fotografie 2',
				width: 1200,
				height: 900,
				color: '#506359'
			},
			{
				src: 'hr2',
				alt: 'Apartmány Harrachov — fotografie 3',
				width: 800,
				height: 900,
				span: 'half',
				color: '#6f7867'
			},
			{
				src: 'hr4',
				alt: 'Apartmány Harrachov — fotografie 4',
				width: 1200,
				height: 900,
				color: '#53655b'
			}
		]
	},
	{
		slug: 'bistro-good-food',
		title: 'Bistro GOOD FOOD',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gf1',
				alt: 'Bistro GOOD FOOD — fotografie 1',
				width: 900,
				height: 900,
				color: '#93816c'
			},
			{
				src: 'gf2',
				alt: 'Bistro GOOD FOOD — fotografie 2',
				width: 600,
				height: 900,
				span: 'half',
				color: '#837054'
			},
			{
				src: 'gf3',
				alt: 'Bistro GOOD FOOD — fotografie 3',
				width: 600,
				height: 900,
				span: 'half',
				color: '#a48e71'
			},
			{
				src: 'gf5',
				alt: 'Bistro GOOD FOOD — fotografie 4',
				width: 900,
				height: 900,
				color: '#6d6759'
			},
			{
				src: 'gf4',
				alt: 'Bistro GOOD FOOD — fotografie 5',
				width: 600,
				height: 900,
				span: 'half',
				color: '#766955'
			}
		]
	},
	{
		slug: 'pizzerie-michelangelo',
		title: 'Pizzerie Michelangelo',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'piz1',
				alt: 'Pizzerie Michelangelo — fotografie 1',
				width: 1350,
				height: 900,
				color: '#887b65'
			},
			{
				src: 'piz2',
				alt: 'Pizzerie Michelangelo — fotografie 2',
				width: 1350,
				height: 900,
				color: '#6c634e'
			},
			{
				src: 'piz3',
				alt: 'Pizzerie Michelangelo — fotografie 3',
				width: 1350,
				height: 900,
				color: '#88785d'
			},
			{
				src: 'piz4',
				alt: 'Pizzerie Michelangelo — fotografie 4',
				width: 1350,
				height: 900,
				color: '#7d6a56'
			}
		]
	},
	{
		slug: 'rodinny-dum-u-prahy',
		title: 'Rodinný dům u Prahy',
		location: 'Okolí Prahy',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Okolí Prahy' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'sim1',
				alt: 'Rodinný dům u Prahy — fotografie 1',
				width: 1558,
				height: 900,
				color: '#7d7c6f'
			},
			{
				src: 'sim2',
				alt: 'Rodinný dům u Prahy — fotografie 2',
				width: 1558,
				height: 900,
				color: '#97999a'
			}
		]
	},
	{
		slug: 'rodinny-dum-albrechtice',
		title: 'Rodinný dům Albrechtice',
		location: 'Albrechtice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Albrechtice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'al1',
				alt: 'Rodinný dům Albrechtice — fotografie 1',
				width: 1200,
				height: 900,
				color: '#81816f'
			},
			{
				src: 'al2',
				alt: 'Rodinný dům Albrechtice — fotografie 2',
				width: 1200,
				height: 900,
				color: '#87836c'
			}
		]
	},
	{
		slug: 'srdcovka-spalena',
		title: 'Srdcovka Spálená',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'sp1',
				alt: 'Srdcovka Spálená — fotografie 1',
				width: 1350,
				height: 900,
				color: '#74675a'
			},
			{
				src: 'sp2',
				alt: 'Srdcovka Spálená — fotografie 2',
				width: 1350,
				height: 900,
				color: '#81766a'
			},
			{
				src: 'sp3',
				alt: 'Srdcovka Spálená — fotografie 3',
				width: 1350,
				height: 900,
				color: '#937e6f'
			},
			{
				src: 'sp4',
				alt: 'Srdcovka Spálená — fotografie 4',
				width: 1350,
				height: 900,
				color: '#7f6a57'
			},
			{
				src: 'sp5',
				alt: 'Srdcovka Spálená — fotografie 5',
				width: 1350,
				height: 900,
				color: '#877161'
			},
			{
				src: 'sp6',
				alt: 'Srdcovka Spálená — fotografie 6',
				width: 1350,
				height: 900,
				color: '#7e736c'
			}
		]
	},
	{
		slug: 'apartmany-albrechtice',
		title: 'Apartmány Albrechtice v Jizerských horách',
		location: 'Albrechtice v Jizerských horách',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Albrechtice v Jizerských horách' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'alb1',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 1',
				width: 1475,
				height: 900,
				color: '#8c9281'
			},
			{
				src: 'alb2',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 2',
				width: 1475,
				height: 900,
				color: '#959b8e'
			},
			{
				src: 'alb3',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 3',
				width: 1475,
				height: 900,
				color: '#647164'
			},
			{
				src: 'alb4',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 4',
				width: 1350,
				height: 900,
				color: '#8c8864'
			},
			{
				src: 'alb5',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 5',
				width: 1473,
				height: 900,
				color: '#797c5c'
			}
		]
	},
	{
		slug: 'rodinna-vila-cernosice',
		title: 'Rodinná vila Černošice',
		location: 'Černošice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Černošice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'cer1',
				alt: 'Rodinná vila Černošice — fotografie 1',
				width: 1349,
				height: 900,
				color: '#485255'
			},
			{
				src: 'cer2',
				alt: 'Rodinná vila Černošice — fotografie 2',
				width: 601,
				height: 900,
				span: 'half',
				color: '#616e73'
			},
			{
				src: 'cer3',
				alt: 'Rodinná vila Černošice — fotografie 3',
				width: 601,
				height: 900,
				span: 'half',
				color: '#4d565a'
			},
			{
				src: 'cer4',
				alt: 'Rodinná vila Černošice — fotografie 4',
				width: 1349,
				height: 900,
				color: '#565b5e'
			},
			{
				src: 'cer5',
				alt: 'Rodinná vila Černošice — fotografie 5',
				width: 1349,
				height: 900,
				color: '#666d60'
			},
			{
				src: 'cer6',
				alt: 'Rodinná vila Černošice — fotografie 6',
				width: 1349,
				height: 900,
				color: '#6e6d6c'
			},
			{
				src: 'cer7',
				alt: 'Rodinná vila Černošice — fotografie 7',
				width: 1349,
				height: 900,
				color: '#5f6b61'
			},
			{
				src: 'cer8',
				alt: 'Rodinná vila Černošice — fotografie 8',
				width: 1350,
				height: 900,
				color: '#64615d'
			},
			{
				src: 'cer9',
				alt: 'Rodinná vila Černošice — fotografie 9',
				width: 1350,
				height: 900,
				color: '#67696c'
			},
			{
				src: 'cer10',
				alt: 'Rodinná vila Černošice — fotografie 10',
				width: 600,
				height: 900,
				span: 'half',
				color: '#7a838c'
			},
			{
				src: 'cer11',
				alt: 'Rodinná vila Černošice — fotografie 11',
				width: 601,
				height: 900,
				span: 'half',
				color: '#746b67'
			},
			{
				src: 'cer13',
				alt: 'Rodinná vila Černošice — fotografie 12',
				width: 1350,
				height: 900,
				color: '#665e58'
			},
			{
				src: 'cer12',
				alt: 'Rodinná vila Černošice — fotografie 13',
				width: 601,
				height: 900,
				span: 'half',
				color: '#798289'
			}
		]
	},
	{
		slug: 'lokal-korunni',
		title: 'Lokál Korunní',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'lok1',
				alt: 'Lokál Korunní — fotografie 1',
				width: 1350,
				height: 900,
				color: '#a99686'
			},
			{
				src: 'lok2',
				alt: 'Lokál Korunní — fotografie 2',
				width: 1350,
				height: 900,
				color: '#9e8a7b'
			},
			{
				src: 'lok3',
				alt: 'Lokál Korunní — fotografie 3',
				width: 675,
				height: 900,
				span: 'half',
				color: '#b4a8a0'
			},
			{
				src: 'lok4',
				alt: 'Lokál Korunní — fotografie 4',
				width: 600,
				height: 900,
				span: 'half',
				color: '#a9a096'
			},
			{
				src: 'lok5',
				alt: 'Lokál Korunní — fotografie 5',
				width: 1350,
				height: 900,
				color: '#968c82'
			}
		]
	},
	{
		slug: 'restaurace-passberg',
		title: 'Restaurace Passberg',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'pas1',
				alt: 'Restaurace Passberg — fotografie 1',
				width: 1350,
				height: 900,
				color: '#b69475'
			},
			{
				src: 'pas2',
				alt: 'Restaurace Passberg — fotografie 2',
				width: 1350,
				height: 900,
				color: '#b58a60'
			},
			{
				src: 'pas3',
				alt: 'Restaurace Passberg — fotografie 3',
				width: 1350,
				height: 900,
				color: '#ae8558'
			},
			{
				src: 'pas4',
				alt: 'Restaurace Passberg — fotografie 4',
				width: 1350,
				height: 900,
				color: '#ad8d6f'
			},
			{
				src: 'pas5',
				alt: 'Restaurace Passberg — fotografie 5',
				width: 1350,
				height: 900,
				color: '#ad8964'
			},
			{
				src: 'pas6',
				alt: 'Restaurace Passberg — fotografie 6',
				width: 1350,
				height: 900,
				color: '#9b7c60'
			},
			{
				src: 'pas7',
				alt: 'Restaurace Passberg — fotografie 7',
				width: 1350,
				height: 900,
				color: '#a48e75'
			}
		]
	},
	{
		slug: 'pekarna-panne-nuovo',
		title: 'Pekárna PANNE NUOVO',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'piz1',
				alt: 'Pekárna PANNE NUOVO — fotografie 1',
				width: 1350,
				height: 900,
				color: '#95907f'
			},
			{
				src: 'piz2',
				alt: 'Pekárna PANNE NUOVO — fotografie 2',
				width: 1350,
				height: 900,
				color: '#87867e'
			},
			{
				src: 'piz3',
				alt: 'Pekárna PANNE NUOVO — fotografie 3',
				width: 1350,
				height: 900,
				color: '#726e6b'
			},
			{
				src: 'piz4',
				alt: 'Pekárna PANNE NUOVO — fotografie 4',
				width: 1200,
				height: 900,
				color: '#746460'
			},
			{
				src: 'piz5',
				alt: 'Pekárna PANNE NUOVO — fotografie 5',
				width: 675,
				height: 900,
				span: 'half',
				color: '#897869'
			},
			{
				src: 'piz6',
				alt: 'Pekárna PANNE NUOVO — fotografie 6',
				width: 1200,
				height: 900,
				color: '#796755'
			},
			{
				src: 'piz7',
				alt: 'Pekárna PANNE NUOVO — fotografie 7',
				width: 1200,
				height: 900,
				color: '#7f7261'
			}
		]
	},
	{
		slug: 'restaurace-solnice',
		title: 'Restaurace Solnice',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 's2',
				alt: 'Restaurace Solnice — fotografie 1',
				width: 1037,
				height: 900,
				color: '#614239'
			},
			{
				src: 's1',
				alt: 'Restaurace Solnice — fotografie 2',
				width: 600,
				height: 900,
				span: 'half',
				color: '#734e45'
			},
			{
				src: 's3',
				alt: 'Restaurace Solnice — fotografie 3',
				width: 600,
				height: 900,
				span: 'half',
				color: '#7b5d4f'
			},
			{
				src: 's4',
				alt: 'Restaurace Solnice — fotografie 4',
				width: 1350,
				height: 900,
				color: '#62493f'
			},
			{
				src: 's5',
				alt: 'Restaurace Solnice — fotografie 5',
				width: 1350,
				height: 900,
				color: '#583a35'
			},
			{
				src: 's6',
				alt: 'Restaurace Solnice — fotografie 6',
				width: 900,
				height: 900,
				color: '#694940'
			},
			{
				src: 's7',
				alt: 'Restaurace Solnice — fotografie 7',
				width: 1350,
				height: 900,
				color: '#593c32'
			},
			{
				src: 's8',
				alt: 'Restaurace Solnice — fotografie 8',
				width: 600,
				height: 900,
				span: 'half',
				color: '#573d37'
			},
			{
				src: 's15',
				alt: 'Restaurace Solnice — fotografie 9',
				width: 600,
				height: 900,
				span: 'half',
				color: '#6e5849'
			},
			{
				src: 's9',
				alt: 'Restaurace Solnice — fotografie 10',
				width: 1350,
				height: 900,
				color: '#5c4339'
			},
			{
				src: 's10',
				alt: 'Restaurace Solnice — fotografie 11',
				width: 1350,
				height: 900,
				color: '#795e4f'
			},
			{
				src: 's11',
				alt: 'Restaurace Solnice — fotografie 12',
				width: 1350,
				height: 900,
				color: '#634d44'
			},
			{
				src: 's12',
				alt: 'Restaurace Solnice — fotografie 13',
				width: 1350,
				height: 900,
				color: '#523d34'
			},
			{
				src: 's13',
				alt: 'Restaurace Solnice — fotografie 14',
				width: 1350,
				height: 900,
				color: '#665245'
			},
			{
				src: 's14',
				alt: 'Restaurace Solnice — fotografie 15',
				width: 1350,
				height: 900,
				color: '#766b64'
			},
			{
				src: 's16',
				alt: 'Restaurace Solnice — fotografie 16',
				width: 1350,
				height: 900,
				color: '#59453d'
			},
			{
				src: 's17',
				alt: 'Restaurace Solnice — fotografie 17',
				width: 600,
				height: 900,
				span: 'half',
				color: '#5a3d32'
			},
			{
				src: 's20',
				alt: 'Restaurace Solnice — fotografie 18',
				width: 601,
				height: 900,
				span: 'half',
				color: '#5b3f37'
			},
			{
				src: 's18',
				alt: 'Restaurace Solnice — fotografie 19',
				width: 1350,
				height: 900,
				color: '#513d35'
			},
			{
				src: 's19',
				alt: 'Restaurace Solnice — fotografie 20',
				width: 1350,
				height: 900,
				color: '#534136'
			},
			{
				src: 's21',
				alt: 'Restaurace Solnice — fotografie 21',
				width: 1350,
				height: 900,
				color: '#5e4f45'
			},
			{
				src: 's22',
				alt: 'Restaurace Solnice — fotografie 22',
				width: 1350,
				height: 900,
				color: '#776358'
			},
			{
				src: 's23',
				alt: 'Restaurace Solnice — fotografie 23',
				width: 600,
				height: 900,
				span: 'half',
				color: '#999390'
			},
			{
				src: 's24',
				alt: 'Restaurace Solnice — fotografie 24',
				width: 1350,
				height: 900,
				color: '#513d32'
			}
		]
	},
	{
		slug: 'food-story-trznice',
		title: 'Food story tržnice',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'dlouha1',
				alt: 'Food story tržnice — fotografie 1',
				width: 1520,
				height: 1000,
				color: '#b09471'
			},
			{
				src: 'dlouha2',
				alt: 'Food story tržnice — fotografie 2',
				width: 1520,
				height: 1000,
				color: '#bfa87b'
			},
			{
				src: 'dlouha3',
				alt: 'Food story tržnice — fotografie 3',
				width: 1520,
				height: 1000,
				color: '#b89c70'
			},
			{
				src: 'dlouha4',
				alt: 'Food story tržnice — fotografie 4',
				width: 1520,
				height: 1000,
				color: '#af866a'
			},
			{
				src: 'dlouha5',
				alt: 'Food story tržnice — fotografie 5',
				width: 1520,
				height: 1000,
				color: '#bb9f83'
			},
			{
				src: 'dlouha6',
				alt: 'Food story tržnice — fotografie 6',
				width: 1520,
				height: 1000,
				color: '#796752'
			},
			{
				src: 'dlouha7',
				alt: 'Food story tržnice — fotografie 7',
				width: 1500,
				height: 1000,
				color: '#bd946c'
			},
			{
				src: 'dlouha8',
				alt: 'Food story tržnice — fotografie 8',
				width: 1694,
				height: 1000,
				color: '#775132'
			},
			{
				src: 'dlouha9',
				alt: 'Food story tržnice — fotografie 9',
				width: 1500,
				height: 1000,
				color: '#684927'
			},
			{
				src: 'dlouha10',
				alt: 'Food story tržnice — fotografie 10',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#886a43'
			}
		]
	},
	{
		slug: 'savoy-ambiente',
		title: 'Savoy Ambiente',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'savoy2',
				alt: 'Savoy Ambiente — fotografie 1',
				width: 1335,
				height: 1000,
				color: '#967746'
			},
			{
				src: 'savoy1',
				alt: 'Savoy Ambiente — fotografie 2',
				width: 792,
				height: 1000,
				span: 'half',
				color: '#937c66'
			},
			{
				src: 'savoy3',
				alt: 'Savoy Ambiente — fotografie 3',
				width: 749,
				height: 1000,
				span: 'half',
				color: '#98794d'
			},
			{
				src: 'savoy4',
				alt: 'Savoy Ambiente — fotografie 4',
				width: 1333,
				height: 1000,
				color: '#886e54'
			},
			{
				src: 'savoy5',
				alt: 'Savoy Ambiente — fotografie 5',
				width: 1333,
				height: 1000,
				color: '#aa8a66'
			}
		]
	},
	{
		slug: 'srdcovka-gurmanie',
		title: 'Srdcovka Gurmanie',
		location: 'Praha — Smíchov',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Smíchov' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gur1',
				alt: 'Srdcovka Gurmanie — fotografie 1',
				width: 1350,
				height: 900,
				color: '#716860'
			},
			{
				src: 'gur2',
				alt: 'Srdcovka Gurmanie — fotografie 2',
				width: 1350,
				height: 900,
				color: '#725748'
			},
			{
				src: 'gur3',
				alt: 'Srdcovka Gurmanie — fotografie 3',
				width: 1350,
				height: 900,
				color: '#614d47'
			},
			{
				src: 'gur4',
				alt: 'Srdcovka Gurmanie — fotografie 4',
				width: 1350,
				height: 900,
				color: '#6b5648'
			},
			{
				src: 'gur5',
				alt: 'Srdcovka Gurmanie — fotografie 5',
				width: 600,
				height: 900,
				span: 'half',
				color: '#3b302b'
			},
			{
				src: 'gur12',
				alt: 'Srdcovka Gurmanie — fotografie 6',
				width: 600,
				height: 900,
				span: 'half',
				color: '#432e2a'
			},
			{
				src: 'gur6',
				alt: 'Srdcovka Gurmanie — fotografie 7',
				width: 1350,
				height: 900,
				color: '#6f5d54'
			},
			{
				src: 'gur7',
				alt: 'Srdcovka Gurmanie — fotografie 8',
				width: 1350,
				height: 900,
				color: '#776252'
			},
			{
				src: 'gur8',
				alt: 'Srdcovka Gurmanie — fotografie 9',
				width: 1350,
				height: 900,
				color: '#7c6251'
			},
			{
				src: 'gur9',
				alt: 'Srdcovka Gurmanie — fotografie 10',
				width: 1350,
				height: 900,
				color: '#755849'
			},
			{
				src: 'gur10',
				alt: 'Srdcovka Gurmanie — fotografie 11',
				width: 1350,
				height: 900,
				color: '#756159'
			},
			{
				src: 'gur11',
				alt: 'Srdcovka Gurmanie — fotografie 12',
				width: 1350,
				height: 900,
				color: '#a57c6b'
			}
		]
	},
	{
		slug: 'pizzanuova-ambiente',
		title: 'Pizzanuova Ambiente',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'pizza1',
				alt: 'Pizzanuova Ambiente — fotografie 1',
				width: 1378,
				height: 1000,
				color: '#736650'
			},
			{
				src: 'pizza2',
				alt: 'Pizzanuova Ambiente — fotografie 2',
				width: 1335,
				height: 1000,
				color: '#77654a'
			},
			{
				src: 'pizza3',
				alt: 'Pizzanuova Ambiente — fotografie 3',
				width: 1335,
				height: 1000,
				color: '#7b6d58'
			},
			{
				src: 'pizza4',
				alt: 'Pizzanuova Ambiente — fotografie 4',
				width: 1337,
				height: 1000,
				color: '#6c6256'
			},
			{
				src: 'pizza5',
				alt: 'Pizzanuova Ambiente — fotografie 5',
				width: 1335,
				height: 1000,
				color: '#7c6d56'
			},
			{
				src: 'pizza6',
				alt: 'Pizzanuova Ambiente — fotografie 6',
				width: 1333,
				height: 1000,
				color: '#6a5843'
			},
			{
				src: 'pizzatitul',
				alt: 'Pizzanuova Ambiente — fotografie 7',
				width: 1333,
				height: 1000,
				color: '#8b826e'
			}
		]
	},
	{
		slug: 'budova-mnd',
		title: 'Budova společnosti MND',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'mnd1',
				alt: 'Budova společnosti MND — fotografie 1',
				width: 1350,
				height: 900,
				color: '#565c5f'
			},
			{
				src: 'mnd2',
				alt: 'Budova společnosti MND — fotografie 2',
				width: 533,
				height: 900,
				span: 'half',
				color: '#8390a1'
			},
			{
				src: 'mnd3',
				alt: 'Budova společnosti MND — fotografie 3',
				width: 600,
				height: 900,
				span: 'half',
				color: '#59615a'
			},
			{
				src: 'mnd5',
				alt: 'Budova společnosti MND — fotografie 4',
				width: 600,
				height: 900,
				span: 'half',
				color: '#686661'
			},
			{
				src: 'mnd6',
				alt: 'Budova společnosti MND — fotografie 5',
				width: 600,
				height: 900,
				span: 'half',
				color: '#85898e'
			},
			{
				src: 'mnd4',
				alt: 'Budova společnosti MND — fotografie 6',
				width: 1350,
				height: 900,
				color: '#585c5a'
			},
			{
				src: 'mnd7',
				alt: 'Budova společnosti MND — fotografie 7',
				width: 582,
				height: 900,
				span: 'half',
				color: '#777472'
			}
		]
	},
	{
		slug: 'nase-maso-reznictvi',
		title: 'Naše maso — řeznictví',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'maso_tit',
				alt: 'Naše maso — řeznictví — fotografie 1',
				width: 1497,
				height: 1000,
				color: '#63483a'
			},
			{
				src: 'maso2',
				alt: 'Naše maso — řeznictví — fotografie 2',
				width: 1333,
				height: 1000,
				color: '#756353'
			},
			{
				src: 'maso3',
				alt: 'Naše maso — řeznictví — fotografie 3',
				width: 1333,
				height: 1000,
				color: '#877675'
			},
			{
				src: 'maso4',
				alt: 'Naše maso — řeznictví — fotografie 4',
				width: 1333,
				height: 1000,
				color: '#78624c'
			}
		]
	},
	{
		slug: 'lokal-pod-divadlem-plzen',
		title: 'Lokál Pod Divadlem',
		location: 'Plzeň',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Plzeň' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'lokalplzen1',
				alt: 'Lokál Pod Divadlem — fotografie 1',
				width: 1499,
				height: 1000,
				color: '#978e86'
			},
			{
				src: 'lokalplzen2',
				alt: 'Lokál Pod Divadlem — fotografie 2',
				width: 1499,
				height: 1000,
				color: '#a4a2a3'
			},
			{
				src: 'lokalplzen3',
				alt: 'Lokál Pod Divadlem — fotografie 3',
				width: 1499,
				height: 1000,
				color: '#72635c'
			},
			{
				src: 'lokalplzen4',
				alt: 'Lokál Pod Divadlem — fotografie 4',
				width: 1499,
				height: 1000,
				color: '#8d877e'
			},
			{
				src: 'lokalplzen5',
				alt: 'Lokál Pod Divadlem — fotografie 5',
				width: 1340,
				height: 1000,
				color: '#7e736a'
			},
			{
				src: 'lokalplzen6',
				alt: 'Lokál Pod Divadlem — fotografie 6',
				width: 1335,
				height: 1000,
				color: '#897d6d'
			},
			{
				src: 'lokalplzen7',
				alt: 'Lokál Pod Divadlem — fotografie 7',
				width: 749,
				height: 1000,
				span: 'half',
				color: '#887b67'
			},
			{
				src: 'lokalplzen8',
				alt: 'Lokál Pod Divadlem — fotografie 8',
				width: 1335,
				height: 1000,
				color: '#958875'
			}
		]
	},
	{
		slug: 'bytove-domy-jesenice',
		title: 'Bytové domy Jesenice',
		location: 'Jesenice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Jesenice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'jesenice1',
				alt: 'Bytové domy Jesenice — fotografie 1',
				width: 1799,
				height: 1000,
				color: '#a4ab9b'
			},
			{
				src: 'jesenice2',
				alt: 'Bytové domy Jesenice — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#8d9692'
			},
			{
				src: 'jesenice3',
				alt: 'Bytové domy Jesenice — fotografie 3',
				width: 1500,
				height: 1000,
				color: '#9b9c79'
			},
			{
				src: 'jesenice4',
				alt: 'Bytové domy Jesenice — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#8b8e67'
			}
		]
	},
	{
		slug: 'kampus-park-hodkovicky',
		title: 'Kampus park Hodkovičky',
		location: 'Praha — Hodkovičky',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Hodkovičky' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'kampus1',
				alt: 'Kampus park Hodkovičky — fotografie 1',
				width: 1609,
				height: 1000,
				color: '#878174'
			},
			{
				src: 'kampus2',
				alt: 'Kampus park Hodkovičky — fotografie 2',
				width: 1609,
				height: 1000,
				color: '#8c887b'
			},
			{
				src: 'kampus3',
				alt: 'Kampus park Hodkovičky — fotografie 3',
				width: 1611,
				height: 1000,
				color: '#889fa7'
			},
			{
				src: 'kampus4',
				alt: 'Kampus park Hodkovičky — fotografie 4',
				width: 1611,
				height: 1000,
				color: '#6d7a79'
			},
			{
				src: 'kampus5',
				alt: 'Kampus park Hodkovičky — fotografie 5',
				width: 1613,
				height: 1000,
				color: '#818a8c'
			},
			{
				src: 'kampus6',
				alt: 'Kampus park Hodkovičky — fotografie 6',
				width: 1611,
				height: 1000,
				color: '#626e62'
			}
		]
	},
	{
		slug: 'cantinetta-fiorentina',
		title: 'Cantinetta Fiorentina',
		location: 'Praha — Pařížská',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Pařížská' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'fio1',
				alt: 'Cantinetta Fiorentina — fotografie 1',
				width: 1501,
				height: 1000,
				color: '#856d54'
			},
			{
				src: 'fio2',
				alt: 'Cantinetta Fiorentina — fotografie 2',
				width: 1501,
				height: 1000,
				color: '#88745b'
			},
			{
				src: 'fio7',
				alt: 'Cantinetta Fiorentina — fotografie 3',
				width: 1773,
				height: 1000,
				color: '#7b675d'
			},
			{
				src: 'fio8',
				alt: 'Cantinetta Fiorentina — fotografie 4',
				width: 1773,
				height: 1000,
				color: '#7e603f'
			},
			{
				src: 'fio11',
				alt: 'Cantinetta Fiorentina — fotografie 5',
				width: 1501,
				height: 1000,
				color: '#c5b2a4'
			},
			{
				src: 'fio12',
				alt: 'Cantinetta Fiorentina — fotografie 6',
				width: 1501,
				height: 1000,
				color: '#b29e95'
			},
			{
				src: 'fio13',
				alt: 'Cantinetta Fiorentina — fotografie 7',
				width: 1501,
				height: 1000,
				color: '#b7a998'
			},
			{
				src: 'fio20',
				alt: 'Cantinetta Fiorentina — fotografie 8',
				width: 1501,
				height: 1000,
				color: '#ab947a'
			}
		]
	},
	{
		slug: 'srdcovka-otrokovice',
		title: 'Srdcovka Otrokovice',
		location: 'Otrokovice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Otrokovice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'ot1',
				alt: 'Srdcovka Otrokovice — fotografie 1',
				width: 1350,
				height: 900,
				color: '#927e6e'
			},
			{
				src: 'ot2',
				alt: 'Srdcovka Otrokovice — fotografie 2',
				width: 1350,
				height: 900,
				color: '#857d70'
			},
			{
				src: 'ot3',
				alt: 'Srdcovka Otrokovice — fotografie 3',
				width: 1350,
				height: 900,
				color: '#59524c'
			},
			{
				src: 'ot4',
				alt: 'Srdcovka Otrokovice — fotografie 4',
				width: 1350,
				height: 900,
				color: '#716257'
			},
			{
				src: 'ot5',
				alt: 'Srdcovka Otrokovice — fotografie 5',
				width: 1350,
				height: 900,
				color: '#827872'
			},
			{
				src: 'ot6',
				alt: 'Srdcovka Otrokovice — fotografie 6',
				width: 1350,
				height: 900,
				color: '#7b7067'
			},
			{
				src: 'ot7',
				alt: 'Srdcovka Otrokovice — fotografie 7',
				width: 1350,
				height: 900,
				color: '#6e584a'
			},
			{
				src: 'ot8',
				alt: 'Srdcovka Otrokovice — fotografie 8',
				width: 1350,
				height: 900,
				color: '#625a55'
			},
			{
				src: 'ot9',
				alt: 'Srdcovka Otrokovice — fotografie 9',
				width: 1350,
				height: 900,
				color: '#776d63'
			},
			{
				src: 'ot10',
				alt: 'Srdcovka Otrokovice — fotografie 10',
				width: 1350,
				height: 900,
				color: '#a58369'
			},
			{
				src: 'ot11',
				alt: 'Srdcovka Otrokovice — fotografie 11',
				width: 1350,
				height: 900,
				color: '#716455'
			},
			{
				src: 'ot12',
				alt: 'Srdcovka Otrokovice — fotografie 12',
				width: 1350,
				height: 900,
				color: '#312d28'
			},
			{
				src: 'ot13',
				alt: 'Srdcovka Otrokovice — fotografie 13',
				width: 1350,
				height: 900,
				color: '#3c352c'
			},
			{
				src: 'ot14',
				alt: 'Srdcovka Otrokovice — fotografie 14',
				width: 1350,
				height: 900,
				color: '#b44f38'
			},
			{
				src: 'ot15',
				alt: 'Srdcovka Otrokovice — fotografie 15',
				width: 1350,
				height: 900,
				color: '#955a2f'
			},
			{
				src: 'ot16',
				alt: 'Srdcovka Otrokovice — fotografie 16',
				width: 1350,
				height: 900,
				color: '#83827f'
			}
		]
	},
	{
		slug: 'restaurace-havelak',
		title: 'Restaurace Havelák',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'havel1',
				alt: 'Restaurace Havelák — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#6b4b2e'
			},
			{
				src: 'havel2',
				alt: 'Restaurace Havelák — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#71553e'
			},
			{
				src: 'havel3',
				alt: 'Restaurace Havelák — fotografie 3',
				width: 1500,
				height: 1000,
				color: '#6b5539'
			},
			{
				src: 'havel4',
				alt: 'Restaurace Havelák — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#98693b'
			},
			{
				src: 'havel5',
				alt: 'Restaurace Havelák — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#8e5834'
			},
			{
				src: 'havel6',
				alt: 'Restaurace Havelák — fotografie 6',
				width: 1500,
				height: 1000,
				color: '#644a28'
			},
			{
				src: 'havel7',
				alt: 'Restaurace Havelák — fotografie 7',
				width: 1500,
				height: 1000,
				color: '#513e22'
			},
			{
				src: 'havel8',
				alt: 'Restaurace Havelák — fotografie 8',
				width: 1500,
				height: 1000,
				color: '#7e5934'
			},
			{
				src: 'havel9',
				alt: 'Restaurace Havelák — fotografie 9',
				width: 1481,
				height: 1000,
				color: '#302516'
			},
			{
				src: 'havel11',
				alt: 'Restaurace Havelák — fotografie 10',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#733e20'
			},
			{
				src: 'havel12',
				alt: 'Restaurace Havelák — fotografie 11',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#c48752'
			},
			{
				src: 'havel10',
				alt: 'Restaurace Havelák — fotografie 12',
				width: 1500,
				height: 1000,
				color: '#774d2d'
			},
			{
				src: 'havel13',
				alt: 'Restaurace Havelák — fotografie 13',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#84502e'
			}
		]
	},
	{
		slug: 'restaurace-good-food',
		title: 'Restaurace GOOD FOOD',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gf1',
				alt: 'Restaurace GOOD FOOD — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#78786e'
			},
			{
				src: 'gf2',
				alt: 'Restaurace GOOD FOOD — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#6d6155'
			},
			{
				src: 'gf3',
				alt: 'Restaurace GOOD FOOD — fotografie 3',
				width: 1596,
				height: 1000,
				color: '#70685d'
			},
			{
				src: 'gf4',
				alt: 'Restaurace GOOD FOOD — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#807a6a'
			},
			{
				src: 'gf5',
				alt: 'Restaurace GOOD FOOD — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#786e5f'
			},
			{
				src: 'gf6',
				alt: 'Restaurace GOOD FOOD — fotografie 6',
				width: 1357,
				height: 1000,
				color: '#77665a'
			}
		]
	},
	{
		slug: 'charovice-seniori',
		title: 'Areál bydlení a služeb pro seniory Chářovice',
		location: 'Chářovice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Chářovice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'senior1',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 1',
				width: 1613,
				height: 1000,
				color: '#9f9d7e'
			},
			{
				src: 'senior2',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 2',
				width: 1613,
				height: 1000,
				color: '#8b8a6b'
			},
			{
				src: 'senior3',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 3',
				width: 1613,
				height: 1000,
				color: '#88918b'
			},
			{
				src: 'senior4',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 4',
				width: 1612,
				height: 1000,
				color: '#7b847d'
			},
			{
				src: 'senior5',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 5',
				width: 1612,
				height: 1000,
				color: '#838d85'
			}
		]
	},
	{
		slug: 'lokal-u-caipla',
		title: 'Lokál U Caipla',
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
				src: 'lokalbrno1',
				alt: 'Lokál U Caipla — fotografie 1',
				width: 1501,
				height: 1000,
				color: '#988a7e'
			},
			{
				src: 'lokalbrno2',
				alt: 'Lokál U Caipla — fotografie 2',
				width: 1499,
				height: 1000,
				color: '#9a8876'
			},
			{
				src: 'lokalbrno3',
				alt: 'Lokál U Caipla — fotografie 3',
				width: 1499,
				height: 1000,
				color: '#918271'
			},
			{
				src: 'lokalbrno4',
				alt: 'Lokál U Caipla — fotografie 4',
				width: 1499,
				height: 1000,
				color: '#81796f'
			},
			{
				src: 'lokalbrno5',
				alt: 'Lokál U Caipla — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#836d5d'
			},
			{
				src: 'lokalbrno6',
				alt: 'Lokál U Caipla — fotografie 6',
				width: 1499,
				height: 1000,
				color: '#978877'
			}
		]
	},
	{
		slug: 'bytove-domy-letnany',
		title: 'Bytové domy Letňany',
		location: 'Praha — Letňany',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Letňany' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'letnany_tit',
				alt: 'Bytové domy Letňany — fotografie 1',
				width: 1585,
				height: 1000,
				color: '#52644b'
			},
			{
				src: 'letnany1',
				alt: 'Bytové domy Letňany — fotografie 2',
				width: 1585,
				height: 1000,
				color: '#52644b'
			},
			{
				src: 'letnany2',
				alt: 'Bytové domy Letňany — fotografie 3',
				width: 1613,
				height: 1000,
				color: '#95a9b0'
			},
			{
				src: 'letnany3',
				alt: 'Bytové domy Letňany — fotografie 4',
				width: 1568,
				height: 1000,
				color: '#758e8f'
			},
			{
				src: 'letnany4',
				alt: 'Bytové domy Letňany — fotografie 5',
				width: 1666,
				height: 1000,
				color: '#859b8e'
			}
		]
	},
	{
		slug: 'ambasada-saudske-arabie',
		title: 'Ambasáda Saúdské Arábie',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'ambasada1',
				alt: 'Ambasáda Saúdské Arábie — fotografie 1',
				width: 1501,
				height: 1000,
				color: '#6b6d60'
			},
			{
				src: 'ambasada2',
				alt: 'Ambasáda Saúdské Arábie — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#717573'
			},
			{
				src: 'ambasada3',
				alt: 'Ambasáda Saúdské Arábie — fotografie 3',
				width: 1500,
				height: 1000,
				color: '#696f53'
			},
			{
				src: 'ambasada4',
				alt: 'Ambasáda Saúdské Arábie — fotografie 4',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#848584'
			},
			{
				src: 'ambasada5',
				alt: 'Ambasáda Saúdské Arábie — fotografie 5',
				width: 746,
				height: 1000,
				span: 'half',
				color: '#7f7f73'
			}
		]
	},
	{
		slug: 'xl-restaurant',
		title: 'XL restaurant',
		location: 'Praha',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'xl2',
				alt: 'XL restaurant — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#7a7672'
			},
			{
				src: 'xl1',
				alt: 'XL restaurant — fotografie 2',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#9b7962'
			},
			{
				src: 'xl8',
				alt: 'XL restaurant — fotografie 3',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#5e5a57'
			},
			{
				src: 'xl3',
				alt: 'XL restaurant — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#695e54'
			},
			{
				src: 'xl4',
				alt: 'XL restaurant — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#766e64'
			},
			{
				src: 'xl5',
				alt: 'XL restaurant — fotografie 6',
				width: 1500,
				height: 1000,
				color: '#605c5a'
			},
			{
				src: 'xl6',
				alt: 'XL restaurant — fotografie 7',
				width: 1500,
				height: 1000,
				color: '#5f5a54'
			},
			{
				src: 'xl7',
				alt: 'XL restaurant — fotografie 8',
				width: 1500,
				height: 1000,
				color: '#5e5a59'
			},
			{
				src: 'xl9',
				alt: 'XL restaurant — fotografie 9',
				width: 1500,
				height: 1000,
				color: '#88766c'
			},
			{
				src: 'xl10',
				alt: 'XL restaurant — fotografie 10',
				width: 1500,
				height: 1000,
				color: '#7e654e'
			},
			{
				src: 'xl11',
				alt: 'XL restaurant — fotografie 11',
				width: 1500,
				height: 1000,
				color: '#604454'
			}
		]
	},
	{
		slug: 'golfovy-klub-ropice',
		title: 'Golfový klub Ropice',
		location: 'Ropice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Ropice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'golf2',
				alt: 'Golfový klub Ropice — fotografie 1',
				width: 1293,
				height: 900,
				color: '#5a7d82'
			},
			{
				src: 'golf3',
				alt: 'Golfový klub Ropice — fotografie 2',
				width: 1287,
				height: 900,
				color: '#5a7577'
			},
			{
				src: 'golf1',
				alt: 'Golfový klub Ropice — fotografie 3',
				width: 675,
				height: 900,
				span: 'half',
				color: '#607e7d'
			},
			{
				src: 'golf4',
				alt: 'Golfový klub Ropice — fotografie 4',
				width: 1200,
				height: 900,
				color: '#516a48'
			},
			{
				src: 'golf5',
				alt: 'Golfový klub Ropice — fotografie 5',
				width: 971,
				height: 900,
				color: '#879489'
			}
		]
	},
	{
		slug: 'wellness-reitenberger',
		title: 'Wellness Reitenberger',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'welnes1',
				alt: 'Wellness Reitenberger — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#617268'
			},
			{
				src: 'welnes2',
				alt: 'Wellness Reitenberger — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#39453a'
			},
			{
				src: 'welnes3',
				alt: 'Wellness Reitenberger — fotografie 3',
				width: 1500,
				height: 1000,
				color: '#79908d'
			},
			{
				src: 'welnes4',
				alt: 'Wellness Reitenberger — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#504b43'
			},
			{
				src: 'welnes5',
				alt: 'Wellness Reitenberger — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#917a63'
			},
			{
				src: 'welnes6',
				alt: 'Wellness Reitenberger — fotografie 6',
				width: 1500,
				height: 1000,
				color: '#9b836f'
			}
		]
	},
	{
		slug: 'nase-maso-prodejna',
		title: 'Naše maso — prodejna',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'masoshop1',
				alt: 'Naše maso — prodejna — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#918577'
			},
			{
				src: 'masoshop2',
				alt: 'Naše maso — prodejna — fotografie 2',
				width: 1501,
				height: 1000,
				color: '#596768'
			},
			{
				src: 'masoshop3',
				alt: 'Naše maso — prodejna — fotografie 3',
				width: 1499,
				height: 1000,
				color: '#897965'
			}
		]
	},
	{
		slug: 'nadrazi-mlada-boleslav',
		title: 'Nádraží Mladá Boleslav',
		location: 'Mladá Boleslav',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Mladá Boleslav' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'nadrazi1',
				alt: 'Nádraží Mladá Boleslav — fotografie 1',
				width: 1615,
				height: 1000,
				color: '#5f5b47'
			},
			{
				src: 'nadrazi2',
				alt: 'Nádraží Mladá Boleslav — fotografie 2',
				width: 1615,
				height: 1000,
				color: '#889ead'
			},
			{
				src: 'nadrazi3',
				alt: 'Nádraží Mladá Boleslav — fotografie 3',
				width: 1615,
				height: 1000,
				color: '#a6a99d'
			},
			{
				src: 'nadrazi4',
				alt: 'Nádraží Mladá Boleslav — fotografie 4',
				width: 1615,
				height: 1000,
				color: '#414f63'
			},
			{
				src: 'nadrazi5',
				alt: 'Nádraží Mladá Boleslav — fotografie 5',
				width: 1615,
				height: 1000,
				color: '#919e99'
			},
			{
				src: 'nadrazi6',
				alt: 'Nádraží Mladá Boleslav — fotografie 6',
				width: 1615,
				height: 1000,
				color: '#8c9ba0'
			}
		]
	},
	{
		slug: 'rodinne-domy-kunratice',
		title: 'Rodinné domy Kunratice',
		location: 'Praha — Kunratice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Kunratice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'kun1',
				alt: 'Rodinné domy Kunratice — fotografie 1',
				width: 1366,
				height: 900,
				color: '#757c6f'
			},
			{
				src: 'kun2',
				alt: 'Rodinné domy Kunratice — fotografie 2',
				width: 1366,
				height: 900,
				color: '#7e8278'
			},
			{
				src: 'kun3',
				alt: 'Rodinné domy Kunratice — fotografie 3',
				width: 1366,
				height: 900,
				color: '#867668'
			},
			{
				src: 'kun4',
				alt: 'Rodinné domy Kunratice — fotografie 4',
				width: 1366,
				height: 900,
				color: '#757d87'
			}
		]
	},
	{
		slug: 'prodejny-gorenje',
		title: 'Koncept prodejen Gorenje',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gor1',
				alt: 'Koncept prodejen Gorenje — fotografie 1',
				width: 1349,
				height: 900,
				color: '#aaa59f'
			},
			{
				src: 'gor2',
				alt: 'Koncept prodejen Gorenje — fotografie 2',
				width: 1350,
				height: 900,
				color: '#93887c'
			},
			{
				src: 'gor3',
				alt: 'Koncept prodejen Gorenje — fotografie 3',
				width: 1349,
				height: 900,
				color: '#c4c3c1'
			},
			{
				src: 'gor4',
				alt: 'Koncept prodejen Gorenje — fotografie 4',
				width: 1349,
				height: 900,
				color: '#b9b7b4'
			},
			{
				src: 'gor5',
				alt: 'Koncept prodejen Gorenje — fotografie 5',
				width: 1349,
				height: 900,
				color: '#b6b7b8'
			}
		]
	},
	{
		slug: 'prodejny-alpine',
		title: 'Koncept prodejen Alpine',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'al1',
				alt: 'Koncept prodejen Alpine — fotografie 1',
				width: 1447,
				height: 900,
				color: '#8b7f72'
			},
			{
				src: 'al2',
				alt: 'Koncept prodejen Alpine — fotografie 2',
				width: 1447,
				height: 900,
				color: '#938271'
			},
			{
				src: 'al3',
				alt: 'Koncept prodejen Alpine — fotografie 3',
				width: 1447,
				height: 900,
				color: '#917a67'
			},
			{
				src: 'al4',
				alt: 'Koncept prodejen Alpine — fotografie 4',
				width: 1447,
				height: 900,
				color: '#937d6b'
			},
			{
				src: 'al5',
				alt: 'Koncept prodejen Alpine — fotografie 5',
				width: 1447,
				height: 900,
				color: '#8b7b72'
			}
		]
	},
	{
		slug: 'rodinne-domy-lucany',
		title: 'Rodinné domy Lučany',
		location: 'Lučany nad Nisou',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Lučany nad Nisou' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'luc1',
				alt: 'Rodinné domy Lučany — fotografie 1',
				width: 1382,
				height: 900,
				color: '#505356'
			},
			{
				src: 'luc2',
				alt: 'Rodinné domy Lučany — fotografie 2',
				width: 1200,
				height: 900,
				color: '#606149'
			},
			{
				src: 'luc3',
				alt: 'Rodinné domy Lučany — fotografie 3',
				width: 1366,
				height: 900,
				color: '#5b5a4a'
			},
			{
				src: 'luc4',
				alt: 'Rodinné domy Lučany — fotografie 4',
				width: 1200,
				height: 900,
				color: '#525a52'
			}
		]
	},
	{
		slug: 'obytny-soubor-hostavice',
		title: 'Obytný soubor Hostavice',
		location: 'Praha — Hostavice',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Hostavice' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'hos2',
				alt: 'Obytný soubor Hostavice — fotografie 1',
				width: 1350,
				height: 900,
				color: '#837f64'
			},
			{
				src: 'hos1',
				alt: 'Obytný soubor Hostavice — fotografie 2',
				width: 600,
				height: 900,
				span: 'half',
				color: '#7a7966'
			},
			{
				src: 'hos4',
				alt: 'Obytný soubor Hostavice — fotografie 3',
				width: 603,
				height: 900,
				span: 'half',
				color: '#56534a'
			},
			{
				src: 'hos3',
				alt: 'Obytný soubor Hostavice — fotografie 4',
				width: 1344,
				height: 900,
				color: '#4d4a43'
			}
		]
	},
	{
		slug: 'la-degustation',
		title: 'Restaurant La Degustation',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'la1',
				alt: 'Restaurant La Degustation — fotografie 1',
				width: 1350,
				height: 900,
				color: '#4f4e4c'
			},
			{
				src: 'la2',
				alt: 'Restaurant La Degustation — fotografie 2',
				width: 1200,
				height: 900,
				color: '#564435'
			},
			{
				src: 'la3',
				alt: 'Restaurant La Degustation — fotografie 3',
				width: 1201,
				height: 900,
				color: '#705941'
			},
			{
				src: 'la4',
				alt: 'Restaurant La Degustation — fotografie 4',
				width: 1379,
				height: 900,
				color: '#75726e'
			},
			{
				src: 'la5',
				alt: 'Restaurant La Degustation — fotografie 5',
				width: 1350,
				height: 900,
				color: '#716562'
			},
			{
				src: 'la6',
				alt: 'Restaurant La Degustation — fotografie 6',
				width: 1350,
				height: 900,
				color: '#808a8d'
			},
			{
				src: 'la7',
				alt: 'Restaurant La Degustation — fotografie 7',
				width: 1200,
				height: 900,
				color: '#80553a'
			}
		]
	},
	{
		slug: 'bytovy-dum-stodulky',
		title: 'Bytový dům Stodůlky',
		location: 'Praha — Stodůlky',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Stodůlky' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'sto1',
				alt: 'Bytový dům Stodůlky — fotografie 1',
				width: 1200,
				height: 900,
				color: '#98a290'
			},
			{
				src: 'sto2',
				alt: 'Bytový dům Stodůlky — fotografie 2',
				width: 1350,
				height: 900,
				color: '#889596'
			},
			{
				src: 'sto3',
				alt: 'Bytový dům Stodůlky — fotografie 3',
				width: 1200,
				height: 900,
				color: '#92957a'
			},
			{
				src: 'sto4',
				alt: 'Bytový dům Stodůlky — fotografie 4',
				width: 1200,
				height: 900,
				color: '#989b8a'
			},
			{
				src: 'sto5',
				alt: 'Bytový dům Stodůlky — fotografie 5',
				width: 1351,
				height: 900,
				color: '#595d6b'
			}
		]
	},
	{
		slug: 'bytove-domy-zbraslav',
		title: 'Bytové domy Zbraslav',
		location: 'Praha — Zbraslav',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Zbraslav' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'zbr2',
				alt: 'Bytové domy Zbraslav — fotografie 1',
				width: 1358,
				height: 1000,
				color: '#89909d'
			},
			{
				src: 'zbr3',
				alt: 'Bytové domy Zbraslav — fotografie 2',
				width: 1461,
				height: 1000,
				color: '#7e7e89'
			},
			{
				src: 'zbr1',
				alt: 'Bytové domy Zbraslav — fotografie 3',
				width: 666,
				height: 1000,
				span: 'half',
				color: '#8493a9'
			},
			{
				src: 'zbr4',
				alt: 'Bytové domy Zbraslav — fotografie 4',
				width: 1333,
				height: 1000,
				color: '#7e898e'
			},
			{
				src: 'zbr5',
				alt: 'Bytové domy Zbraslav — fotografie 5',
				width: 1333,
				height: 1000,
				color: '#7a8d8f'
			}
		]
	},
	{
		slug: 'bytovy-dum-zbraslav',
		title: 'Bytový dům Zbraslav',
		location: 'Praha — Zbraslav',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha — Zbraslav' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Bytový dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'zb1',
				alt: 'Bytový dům Zbraslav — fotografie 1',
				width: 1333,
				height: 1000,
				color: '#abafaa'
			},
			{
				src: 'zb2',
				alt: 'Bytový dům Zbraslav — fotografie 2',
				width: 1333,
				height: 1000,
				color: '#979c97'
			},
			{
				src: 'zb3',
				alt: 'Bytový dům Zbraslav — fotografie 3',
				width: 750,
				height: 1000,
				span: 'half',
				color: '#7c8683'
			}
		]
	},
	{
		slug: 'fresh-gyros',
		title: 'Fresh Gyros',
		location: 'Praha',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'gyros1',
				alt: 'Fresh Gyros — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#a29c8f'
			},
			{
				src: 'gyros2',
				alt: 'Fresh Gyros — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#9f9582'
			},
			{
				src: 'gyros3',
				alt: 'Fresh Gyros — fotografie 3',
				width: 1458,
				height: 1000,
				color: '#999a92'
			},
			{
				src: 'gyros4',
				alt: 'Fresh Gyros — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#9f8d74'
			},
			{
				src: 'gyros5',
				alt: 'Fresh Gyros — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#9a8b71'
			}
		]
	},
	{
		slug: 'rodinne-domy-makotrasy',
		title: 'Rodinné domy Makotřasy',
		location: 'Makotřasy',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Makotřasy' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Rodinný dům' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'mak1',
				alt: 'Rodinné domy Makotřasy — fotografie 1',
				width: 1389,
				height: 1000,
				color: '#76879b'
			},
			{
				src: 'mak2',
				alt: 'Rodinné domy Makotřasy — fotografie 2',
				width: 1517,
				height: 1000,
				color: '#647b7c'
			},
			{
				src: 'mak3',
				alt: 'Rodinné domy Makotřasy — fotografie 3',
				width: 1496,
				height: 1000,
				color: '#909c90'
			},
			{
				src: 'mak4',
				alt: 'Rodinné domy Makotřasy — fotografie 4',
				width: 1496,
				height: 1000,
				color: '#949490'
			},
			{
				src: 'mak5',
				alt: 'Rodinné domy Makotřasy — fotografie 5',
				width: 1500,
				height: 1000,
				color: '#b5aea8'
			},
			{
				src: 'mak6',
				alt: 'Rodinné domy Makotřasy — fotografie 6',
				width: 1499,
				height: 1000,
				color: '#8e8f89'
			}
		]
	},
	{
		slug: 'restaurace-klobasovna',
		title: 'Restaurace Klobásovna',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'klob1',
				alt: 'Restaurace Klobásovna — fotografie 1',
				width: 1501,
				height: 1000,
				color: '#7c5f3f'
			},
			{
				src: 'klob3',
				alt: 'Restaurace Klobásovna — fotografie 2',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#a06339'
			},
			{
				src: 'klob4',
				alt: 'Restaurace Klobásovna — fotografie 3',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#84502e'
			},
			{
				src: 'klob2',
				alt: 'Restaurace Klobásovna — fotografie 4',
				width: 1501,
				height: 1000,
				color: '#72573d'
			},
			{
				src: 'klob5',
				alt: 'Restaurace Klobásovna — fotografie 5',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#723e20'
			}
		]
	},
	{
		slug: 'restaurace-zvonarka',
		title: 'Restaurace Zvonařka',
		location: 'Praha',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'Praha' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Interiér, gastro provoz' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 'zvon1',
				alt: 'Restaurace Zvonařka — fotografie 1',
				width: 1500,
				height: 1000,
				color: '#593a21'
			},
			{
				src: 'zvon2',
				alt: 'Restaurace Zvonařka — fotografie 2',
				width: 1500,
				height: 1000,
				color: '#4c3820'
			},
			{
				src: 'zvon3',
				alt: 'Restaurace Zvonařka — fotografie 3',
				width: 1500,
				height: 1000,
				color: '#4f361e'
			},
			{
				src: 'zvon4',
				alt: 'Restaurace Zvonařka — fotografie 4',
				width: 1500,
				height: 1000,
				color: '#3a2a14'
			},
			{
				src: 'zvon5',
				alt: 'Restaurace Zvonařka — fotografie 5',
				width: 667,
				height: 1000,
				span: 'half',
				color: '#514027'
			}
		]
	},
	{
		slug: 'tmobile-administrativni-objekt',
		title: 'T-Mobile administrativní objekt',
		location: 'TODO',
		year: 'TODO',
		facts: [
			{ label: 'Místo', value: 'TODO' },
			{ label: 'Rok', value: 'TODO' },
			{ label: 'Rozsah', value: 'TODO — rozsah prací' },
			{ label: 'Typ', value: 'Veřejná stavba' }
		],
		paragraphs: ['TODO: popis projektu.'],
		photos: [
			{
				src: 't1',
				alt: 'T-Mobile administrativní objekt — fotografie 1',
				width: 1299,
				height: 900,
				color: '#95a1a7'
			},
			{
				src: 't2',
				alt: 'T-Mobile administrativní objekt — fotografie 2',
				width: 1299,
				height: 900,
				color: '#74848c'
			},
			{
				src: 't3',
				alt: 'T-Mobile administrativní objekt — fotografie 3',
				width: 1304,
				height: 900,
				color: '#6d6967'
			},
			{
				src: 't4',
				alt: 'T-Mobile administrativní objekt — fotografie 4',
				width: 624,
				height: 900,
				span: 'half',
				color: '#8f918f'
			},
			{
				src: 't5',
				alt: 'T-Mobile administrativní objekt — fotografie 5',
				width: 1296,
				height: 900,
				color: '#7a7a78'
			},
			{
				src: 't6',
				alt: 'T-Mobile administrativní objekt — fotografie 6',
				width: 1786,
				height: 900,
				color: '#777685'
			},
			{
				src: 't7',
				alt: 'T-Mobile administrativní objekt — fotografie 7',
				width: 1259,
				height: 900,
				color: '#5b5e5b'
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
		title: 'First image title',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIFA//EACUQAAIBAgUDBQAAAAAAAAAAAAECAAMRBAUTITESQVEiMjNxcv/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//EABcRAQEBAQAAAAAAAAAAAAAAAAEAEUH/2gAMAwEAAhEDEQA/ABM4ey1Gr6bHlQBa9vHaOcwxbYVw9qxVtrHpLA+fqQq3ypNqHL/kyBneTYnMRq+imrCw3v3hJb+8wjZq7f/Z'
	},
	{
		src: 'uvod_2',
		title: 'Second image title',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAF/8QAIxAAAQMDAgcAAAAAAAAAAAAAAQACAxESITJyBAUUQUJxgf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8AKI8IYxG5wtdlwAJz7SAcsAvEjRTvccLKbqfvSv1t+qdOFbzRZemurEatOagnKkUnjtUjRrJ//9k='
	},
	{
		src: 'uvod_3',
		title: 'Third image title',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMCBAb/xAAmEAACAQMCBAcAAAAAAAAAAAABAgADBBESIQU0QbExM2Fxc4HB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwL/xAAYEQACAwAAAAAAAAAAAAAAAAAAAQISIf/aAAwDAQACEQMRAD8AlTuEpUtVRijFd2H4It6tulRCajAMhcasHJ33wPXpKN7yX0Ik+ZS9h3hQ1CzxmgF1a3CK4ZHOMM2PFusIjhvLN8j9zCXRB3P/2Q=='
	},
	{
		src: 'uvod_4',
		title: 'Fourth image title',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMFAv/EACQQAAEDAgQHAAAAAAAAAAAAAAEAAgQDERIyQYEFEzFRcXKx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwH/xAAWEQEBAQAAAAAAAAAAAAAAAAABAgD/2gAMAwEAAhEDEQA/AHMicM5oOA4ACXG/iy3JdDFANjYQ4O0GlkqL02HxMkZqXsFZpHHcCJqFOu0sBFz3sNUKLVz7IRzSmRnf/9k='
	}
];

/** The title is set uppercase by `RewardsContent`, the description is not —
 *  so the description carries normal Czech sentence case with the proper
 *  nouns capitalised, and both are stored in natural case here. */
export const rewards: Reward[] = [
	{
		title: 'Interiér roku 2011',
		description: 'Návštěvnické centrum pivovaru Staropramen',
		medal: 'gold'
	},
	{
		title: 'Soutěž 1. místo',
		description: 'Zimní stadion Praha-Letňany',
		medal: 'gold'
	},
	{
		title: 'Soutěž 1. místo',
		description: 'Zahradní čtvrť Praha-Zbraslav',
		medal: 'gold',
		// The Zbraslav garden quarter, not the single block filed under
		// `bytove-domy-zbraslav` — this is the row of low houses with gardens.
		slug: 'bytovy-dum-zbraslav'
	},
	{
		title: 'Soutěž 2. místo',
		description: 'SOS dětská vesnička Brno-Medlánky',
		medal: 'silver'
	},
	{
		title: 'Český interiér',
		description: 'Ambiente Pizzanuova Praha',
		medal: 'bronze',
		slug: 'pizzanuova-ambiente'
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
		title: 'Restaurace Garden & Pub - Brno',
		category: 'interiery',
		slug: 'restaurace-garden',
		color: '#93907a'
	},
	{
		src: 'preview2',
		title: 'Restaurace Semmering - Hlubočepy',
		category: 'interiery',
		slug: 'restaurace-semmering-hlubocepy',
		color: '#99958d'
	},
	{
		src: 'preview3',
		title: 'Penzion Kovárna - Český Krumlov',
		category: 'interiery',
		slug: 'penzion-kovarna',
		color: '#9a8d7e'
	},
	{
		src: 'preview4',
		title: 'Restaurace Modré dveře',
		category: 'interiery',
		slug: 'restaurace-modry-dvere',
		color: '#978874'
	},
	{
		src: 'preview5',
		title: 'Ocean’s bistro - Brno',
		category: 'interiery',
		slug: 'oceans-bistro',
		color: '#7c9da1'
	},
	{
		src: 'preview6',
		title: 'Restaurace Steakgrill - Kralupy',
		category: 'interiery',
		slug: 'restaurace-steakgrill-kralupy',
		color: '#998a83'
	},
	{
		src: 'preview7',
		title: 'Apartmány Harrachov',
		category: 'bytove-domy',
		slug: 'apartmany-harrachov',
		color: '#898e82'
	},
	{
		src: 'preview8',
		title: 'Bistro GOOD FOOD',
		category: 'interiery',
		slug: 'bistro-good-food',
		color: '#92816e'
	},
	{
		src: 'preview9',
		title: 'Pizzerie Michelangelo',
		category: 'interiery',
		slug: 'pizzerie-michelangelo',
		color: '#867963'
	},
	{
		src: 'preview10',
		title: 'Rodinný dům u Prahy',
		category: 'rodinne-domy',
		slug: 'rodinny-dum-u-prahy',
		color: '#7b796f'
	},
	{
		src: 'preview11',
		title: 'Rodinný dům Albrechtice',
		category: 'rodinne-domy',
		slug: 'rodinny-dum-albrechtice',
		color: '#858571'
	},
	{
		src: 'preview12',
		title: 'Srdcovka Spálená',
		category: 'interiery',
		slug: 'srdcovka-spalena',
		color: '#7d7266'
	},
	{
		src: 'preview13',
		title: 'Apartmány Albrechtice v Jizerských horách',
		category: 'bytove-domy',
		slug: 'apartmany-albrechtice',
		color: '#999f98'
	},
	{
		src: 'preview14',
		title: 'Rodinná vila - Černošice',
		category: 'rodinne-domy',
		slug: 'rodinna-vila-cernosice',
		color: '#778b92'
	},
	{
		src: 'preview15',
		title: 'Lokál - Korunní',
		category: 'interiery',
		slug: 'lokal-korunni',
		color: '#af9988'
	},
	{
		src: 'preview16',
		title: 'Restaurace Passberg',
		category: 'interiery',
		slug: 'restaurace-passberg',
		color: '#b78b5d'
	},
	{
		src: 'preview17',
		title: 'Pekárna PANNE NUOVO',
		category: 'interiery',
		slug: 'pekarna-panne-nuovo',
		color: '#999687'
	},
	{
		src: 'preview18',
		title: 'Restaurace Solnice',
		category: 'interiery',
		slug: 'restaurace-solnice',
		color: '#67483f'
	},
	{
		src: 'preview19',
		title: 'Food story tržnice',
		category: 'interiery',
		slug: 'food-story-trznice',
		color: '#796551'
	},
	{
		src: 'preview20',
		title: 'Savoy Ambiente',
		category: 'interiery',
		slug: 'savoy-ambiente',
		color: '#977d66'
	},
	{
		src: 'preview21',
		title: 'Srdcovka Gurmanie - Praha Smíchov',
		category: 'interiery',
		slug: 'srdcovka-gurmanie',
		color: '#605853'
	},
	{
		src: 'preview22',
		title: 'Pizzanuova Ambiente',
		category: 'interiery',
		slug: 'pizzanuova-ambiente',
		color: '#756854'
	},
	{
		src: 'preview23',
		title: 'Budova společnosti MND',
		category: 'verejne',
		slug: 'budova-mnd',
		color: '#5d6265'
	},
	{
		src: 'preview24',
		title: 'Naše maso - řeznictví',
		category: 'interiery',
		slug: 'nase-maso-reznictvi',
		color: '#684e40'
	},
	{
		src: 'preview25',
		title: 'Lokál Pod Divadlem - Plzeň',
		category: 'interiery',
		slug: 'lokal-pod-divadlem-plzen',
		color: '#8f8372'
	},
	{
		src: 'preview26',
		title: 'Bytové domy Jesenice',
		category: 'bytove-domy',
		slug: 'bytove-domy-jesenice',
		color: '#a3ac9c'
	},
	{
		src: 'preview27',
		title: 'Kampus park Hodkovičky',
		category: 'verejne',
		slug: 'kampus-park-hodkovicky',
		color: '#898476'
	},
	{
		src: 'preview28',
		title: 'Cantinetta Fiorentina - Pařížská',
		category: 'interiery',
		slug: 'cantinetta-fiorentina',
		color: '#917a62'
	},
	{
		src: 'preview29',
		title: 'Srdcovka Otrokovice',
		category: 'interiery',
		slug: 'srdcovka-otrokovice',
		color: '#938273'
	},
	{
		src: 'preview30',
		title: 'Restaurace Havelák',
		category: 'interiery',
		slug: 'restaurace-havelak',
		color: '#6c573f'
	},
	{
		src: 'preview31',
		title: 'Restaurace GOOD FOOD',
		category: 'interiery',
		slug: 'restaurace-good-food',
		color: '#848273'
	},
	{
		src: 'preview32',
		title: 'Areál bydlení a služeb pro seniory Chářovice',
		category: 'bytove-domy',
		slug: 'charovice-seniori',
		color: '#949a8f'
	},
	{
		src: 'preview33',
		title: 'Lokál U Caipla - Brno',
		category: 'interiery',
		slug: 'lokal-u-caipla',
		color: '#856d5a'
	},
	{
		src: 'preview34',
		title: 'Bytové domy Letňany',
		category: 'bytove-domy',
		slug: 'bytove-domy-letnany',
		color: '#596857'
	},
	{
		src: 'preview35',
		title: 'Ambasáda Saúdské Arábie',
		category: 'verejne',
		slug: 'ambasada-saudske-arabie',
		color: '#717671'
	},
	{
		src: 'preview36',
		title: 'XL restaurant - Praha',
		category: 'interiery',
		slug: 'xl-restaurant',
		color: '#9b7a63'
	},
	{
		src: 'preview37',
		title: 'Golfový klub - Ropice',
		category: 'verejne',
		slug: 'golfovy-klub-ropice',
		color: '#677f7a'
	},
	{
		src: 'preview38',
		title: 'Wellness Reitenberger',
		category: 'interiery',
		slug: 'wellness-reitenberger',
		color: '#65776d'
	},
	{
		src: 'preview39',
		title: 'Naše maso - prodejna',
		category: 'interiery',
		slug: 'nase-maso-prodejna',
		color: '#978776'
	},
	{
		src: 'preview40',
		title: 'Nádraží Mladá Boleslav',
		category: 'verejne',
		slug: 'nadrazi-mlada-boleslav',
		color: '#8e9da1'
	},
	{
		src: 'preview41',
		title: 'Rodinné domy Kunratice',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-kunratice',
		color: '#6f756a'
	},
	{
		src: 'preview42',
		title: 'Koncept prodejen Gorenje',
		category: 'interiery',
		slug: 'prodejny-gorenje',
		color: '#b3ada8'
	},
	{
		src: 'preview43',
		title: 'Koncept prodejen Alpine',
		category: 'interiery',
		slug: 'prodejny-alpine',
		color: '#918273'
	},
	{
		src: 'preview44',
		title: 'Rodinné domy - Lučany',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-lucany',
		color: '#5c5c5d'
	},
	{
		src: 'preview45',
		title: 'Obytný soubor Hostavice',
		category: 'bytove-domy',
		slug: 'obytny-soubor-hostavice',
		color: '#9f9f87'
	},
	{
		src: 'preview46',
		title: 'Restaurant La Degustation',
		category: 'interiery',
		slug: 'la-degustation',
		color: '#4d4d4b'
	},
	{
		src: 'preview47',
		title: 'Bytový dům Stodůlky',
		category: 'bytove-domy',
		slug: 'bytovy-dum-stodulky',
		color: '#939c87'
	},
	{
		src: 'preview48',
		title: 'Bytové domy - Zbraslav',
		category: 'bytove-domy',
		slug: 'bytove-domy-zbraslav',
		color: '#8ca4c4'
	},
	{
		src: 'preview49',
		title: 'Bytový dům - Zbraslav',
		category: 'bytove-domy',
		slug: 'bytovy-dum-zbraslav',
		color: '#aeb0ab'
	},
	{
		src: 'preview50',
		title: 'Fresh Gyros - Praha',
		category: 'interiery',
		slug: 'fresh-gyros',
		color: '#aba396'
	},
	{
		src: 'preview51',
		title: 'Rodinné domy - Makotřasy',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-makotrasy',
		color: '#899bb1'
	},
	{
		src: 'preview52',
		title: 'Restaurace Klobásovna',
		category: 'interiery',
		slug: 'restaurace-klobasovna',
		color: '#81603a'
	},
	{
		src: 'preview53',
		title: 'Restaurace Zvonařka - Praha',
		category: 'interiery',
		slug: 'restaurace-zvonarka',
		color: '#674628'
	},
	{
		src: 'preview54',
		title: 'T-Mobile administrativní objekt',
		category: 'verejne',
		slug: 'tmobile-administrativni-objekt',
		color: '#96a0a5'
	}
];
