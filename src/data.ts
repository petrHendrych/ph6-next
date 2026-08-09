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
				height: 900
			},
			{
				src: 'gr2',
				alt: 'Restaurace Garden & Pub — fotografie 2',
				width: 1440,
				height: 900
			},
			{
				src: 'gr3',
				alt: 'Restaurace Garden & Pub — fotografie 3',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gr4',
				alt: 'Restaurace Garden & Pub — fotografie 4',
				width: 542,
				height: 900,
				span: 'half'
			},
			{
				src: 'gr5',
				alt: 'Restaurace Garden & Pub — fotografie 5',
				width: 1440,
				height: 900
			},
			{
				src: 'gr6',
				alt: 'Restaurace Garden & Pub — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'gr7',
				alt: 'Restaurace Garden & Pub — fotografie 7',
				width: 1600,
				height: 900
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
				height: 900
			},
			{
				src: 'hl2',
				alt: 'Restaurace Semmering — fotografie 2',
				width: 1199,
				height: 900
			},
			{
				src: 'hl3',
				alt: 'Restaurace Semmering — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'hl4',
				alt: 'Restaurace Semmering — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'hl5',
				alt: 'Restaurace Semmering — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 'hl6',
				alt: 'Restaurace Semmering — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'hl7',
				alt: 'Restaurace Semmering — fotografie 7',
				width: 1350,
				height: 900
			},
			{
				src: 'hl8',
				alt: 'Restaurace Semmering — fotografie 8',
				width: 1350,
				height: 900
			},
			{
				src: 'hl9',
				alt: 'Restaurace Semmering — fotografie 9',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'kov2',
				alt: 'Penzion Kovárna — fotografie 2',
				width: 1351,
				height: 900
			},
			{
				src: 'kov3',
				alt: 'Penzion Kovárna — fotografie 3',
				width: 1351,
				height: 900
			},
			{
				src: 'kov4',
				alt: 'Penzion Kovárna — fotografie 4',
				width: 1351,
				height: 900
			},
			{
				src: 'kov5',
				alt: 'Penzion Kovárna — fotografie 5',
				width: 675,
				height: 900,
				span: 'half'
			},
			{
				src: 'kov6',
				alt: 'Penzion Kovárna — fotografie 6',
				width: 1351,
				height: 900
			},
			{
				src: 'kov7',
				alt: 'Penzion Kovárna — fotografie 7',
				width: 1235,
				height: 900
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
				height: 900
			},
			{
				src: 'mo2',
				alt: 'Restaurace Modré dveře — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'mo3',
				alt: 'Restaurace Modré dveře — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'mo4',
				alt: 'Restaurace Modré dveře — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'mo5',
				alt: 'Restaurace Modré dveře — fotografie 5',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'mo6',
				alt: 'Restaurace Modré dveře — fotografie 6',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'oc2',
				alt: 'Ocean’s bistro — fotografie 2',
				width: 1337,
				height: 900
			},
			{
				src: 'oc3',
				alt: 'Ocean’s bistro — fotografie 3',
				width: 1385,
				height: 900
			},
			{
				src: 'oc5',
				alt: 'Ocean’s bistro — fotografie 4',
				width: 739,
				height: 900,
				span: 'half'
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
				height: 900
			},
			{
				src: 'st2',
				alt: 'Restaurace Steakgrill — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'st3',
				alt: 'Restaurace Steakgrill — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'st4',
				alt: 'Restaurace Steakgrill — fotografie 4',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'st5',
				alt: 'Restaurace Steakgrill — fotografie 5',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'st6',
				alt: 'Restaurace Steakgrill — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'st7',
				alt: 'Restaurace Steakgrill — fotografie 7',
				width: 626,
				height: 900,
				span: 'half'
			},
			{
				src: 'st8',
				alt: 'Restaurace Steakgrill — fotografie 8',
				width: 600,
				height: 900,
				span: 'half'
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
				height: 900
			},
			{
				src: 'hr3',
				alt: 'Apartmány Harrachov — fotografie 2',
				width: 1200,
				height: 900
			},
			{
				src: 'hr2',
				alt: 'Apartmány Harrachov — fotografie 3',
				width: 800,
				height: 900,
				span: 'half'
			},
			{
				src: 'hr4',
				alt: 'Apartmány Harrachov — fotografie 4',
				width: 1200,
				height: 900
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
				height: 900
			},
			{
				src: 'gf2',
				alt: 'Bistro GOOD FOOD — fotografie 2',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gf3',
				alt: 'Bistro GOOD FOOD — fotografie 3',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gf5',
				alt: 'Bistro GOOD FOOD — fotografie 4',
				width: 900,
				height: 900
			},
			{
				src: 'gf4',
				alt: 'Bistro GOOD FOOD — fotografie 5',
				width: 600,
				height: 900,
				span: 'half'
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
				height: 900
			},
			{
				src: 'piz2',
				alt: 'Pizzerie Michelangelo — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'piz3',
				alt: 'Pizzerie Michelangelo — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'piz4',
				alt: 'Pizzerie Michelangelo — fotografie 4',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'sim2',
				alt: 'Rodinný dům u Prahy — fotografie 2',
				width: 1558,
				height: 900
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
				height: 900
			},
			{
				src: 'al2',
				alt: 'Rodinný dům Albrechtice — fotografie 2',
				width: 1200,
				height: 900
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
				height: 900
			},
			{
				src: 'sp2',
				alt: 'Srdcovka Spálená — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'sp3',
				alt: 'Srdcovka Spálená — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'sp4',
				alt: 'Srdcovka Spálená — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'sp5',
				alt: 'Srdcovka Spálená — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 'sp6',
				alt: 'Srdcovka Spálená — fotografie 6',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'alb2',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 2',
				width: 1475,
				height: 900
			},
			{
				src: 'alb3',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 3',
				width: 1475,
				height: 900
			},
			{
				src: 'alb4',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'alb5',
				alt: 'Apartmány Albrechtice v Jizerských horách — fotografie 5',
				width: 1473,
				height: 900
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
				height: 900
			},
			{
				src: 'cer2',
				alt: 'Rodinná vila Černošice — fotografie 2',
				width: 601,
				height: 900,
				span: 'half'
			},
			{
				src: 'cer3',
				alt: 'Rodinná vila Černošice — fotografie 3',
				width: 601,
				height: 900,
				span: 'half'
			},
			{
				src: 'cer4',
				alt: 'Rodinná vila Černošice — fotografie 4',
				width: 1349,
				height: 900
			},
			{
				src: 'cer5',
				alt: 'Rodinná vila Černošice — fotografie 5',
				width: 1349,
				height: 900
			},
			{
				src: 'cer6',
				alt: 'Rodinná vila Černošice — fotografie 6',
				width: 1349,
				height: 900
			},
			{
				src: 'cer7',
				alt: 'Rodinná vila Černošice — fotografie 7',
				width: 1349,
				height: 900
			},
			{
				src: 'cer8',
				alt: 'Rodinná vila Černošice — fotografie 8',
				width: 1350,
				height: 900
			},
			{
				src: 'cer9',
				alt: 'Rodinná vila Černošice — fotografie 9',
				width: 1350,
				height: 900
			},
			{
				src: 'cer10',
				alt: 'Rodinná vila Černošice — fotografie 10',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'cer11',
				alt: 'Rodinná vila Černošice — fotografie 11',
				width: 601,
				height: 900,
				span: 'half'
			},
			{
				src: 'cer13',
				alt: 'Rodinná vila Černošice — fotografie 12',
				width: 1350,
				height: 900
			},
			{
				src: 'cer12',
				alt: 'Rodinná vila Černošice — fotografie 13',
				width: 601,
				height: 900,
				span: 'half'
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
				height: 900
			},
			{
				src: 'lok2',
				alt: 'Lokál Korunní — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'lok3',
				alt: 'Lokál Korunní — fotografie 3',
				width: 675,
				height: 900,
				span: 'half'
			},
			{
				src: 'lok4',
				alt: 'Lokál Korunní — fotografie 4',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'lok5',
				alt: 'Lokál Korunní — fotografie 5',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'pas2',
				alt: 'Restaurace Passberg — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'pas3',
				alt: 'Restaurace Passberg — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'pas4',
				alt: 'Restaurace Passberg — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'pas5',
				alt: 'Restaurace Passberg — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 'pas6',
				alt: 'Restaurace Passberg — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'pas7',
				alt: 'Restaurace Passberg — fotografie 7',
				width: 1350,
				height: 900
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
				height: 900
			},
			{
				src: 'piz2',
				alt: 'Pekárna PANNE NUOVO — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'piz3',
				alt: 'Pekárna PANNE NUOVO — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'piz4',
				alt: 'Pekárna PANNE NUOVO — fotografie 4',
				width: 1200,
				height: 900
			},
			{
				src: 'piz5',
				alt: 'Pekárna PANNE NUOVO — fotografie 5',
				width: 675,
				height: 900,
				span: 'half'
			},
			{
				src: 'piz6',
				alt: 'Pekárna PANNE NUOVO — fotografie 6',
				width: 1200,
				height: 900
			},
			{
				src: 'piz7',
				alt: 'Pekárna PANNE NUOVO — fotografie 7',
				width: 1200,
				height: 900
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
				height: 900
			},
			{
				src: 's1',
				alt: 'Restaurace Solnice — fotografie 2',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's3',
				alt: 'Restaurace Solnice — fotografie 3',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's4',
				alt: 'Restaurace Solnice — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 's5',
				alt: 'Restaurace Solnice — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 's6',
				alt: 'Restaurace Solnice — fotografie 6',
				width: 900,
				height: 900
			},
			{
				src: 's7',
				alt: 'Restaurace Solnice — fotografie 7',
				width: 1350,
				height: 900
			},
			{
				src: 's8',
				alt: 'Restaurace Solnice — fotografie 8',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's15',
				alt: 'Restaurace Solnice — fotografie 9',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's9',
				alt: 'Restaurace Solnice — fotografie 10',
				width: 1350,
				height: 900
			},
			{
				src: 's10',
				alt: 'Restaurace Solnice — fotografie 11',
				width: 1350,
				height: 900
			},
			{
				src: 's11',
				alt: 'Restaurace Solnice — fotografie 12',
				width: 1350,
				height: 900
			},
			{
				src: 's12',
				alt: 'Restaurace Solnice — fotografie 13',
				width: 1350,
				height: 900
			},
			{
				src: 's13',
				alt: 'Restaurace Solnice — fotografie 14',
				width: 1350,
				height: 900
			},
			{
				src: 's14',
				alt: 'Restaurace Solnice — fotografie 15',
				width: 1350,
				height: 900
			},
			{
				src: 's16',
				alt: 'Restaurace Solnice — fotografie 16',
				width: 1350,
				height: 900
			},
			{
				src: 's17',
				alt: 'Restaurace Solnice — fotografie 17',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's20',
				alt: 'Restaurace Solnice — fotografie 18',
				width: 601,
				height: 900,
				span: 'half'
			},
			{
				src: 's18',
				alt: 'Restaurace Solnice — fotografie 19',
				width: 1350,
				height: 900
			},
			{
				src: 's19',
				alt: 'Restaurace Solnice — fotografie 20',
				width: 1350,
				height: 900
			},
			{
				src: 's21',
				alt: 'Restaurace Solnice — fotografie 21',
				width: 1350,
				height: 900
			},
			{
				src: 's22',
				alt: 'Restaurace Solnice — fotografie 22',
				width: 1350,
				height: 900
			},
			{
				src: 's23',
				alt: 'Restaurace Solnice — fotografie 23',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 's24',
				alt: 'Restaurace Solnice — fotografie 24',
				width: 1350,
				height: 900
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
				height: 1000
			},
			{
				src: 'dlouha2',
				alt: 'Food story tržnice — fotografie 2',
				width: 1520,
				height: 1000
			},
			{
				src: 'dlouha3',
				alt: 'Food story tržnice — fotografie 3',
				width: 1520,
				height: 1000
			},
			{
				src: 'dlouha4',
				alt: 'Food story tržnice — fotografie 4',
				width: 1520,
				height: 1000
			},
			{
				src: 'dlouha5',
				alt: 'Food story tržnice — fotografie 5',
				width: 1520,
				height: 1000
			},
			{
				src: 'dlouha6',
				alt: 'Food story tržnice — fotografie 6',
				width: 1520,
				height: 1000
			},
			{
				src: 'dlouha7',
				alt: 'Food story tržnice — fotografie 7',
				width: 1500,
				height: 1000
			},
			{
				src: 'dlouha8',
				alt: 'Food story tržnice — fotografie 8',
				width: 1694,
				height: 1000
			},
			{
				src: 'dlouha9',
				alt: 'Food story tržnice — fotografie 9',
				width: 1500,
				height: 1000
			},
			{
				src: 'dlouha10',
				alt: 'Food story tržnice — fotografie 10',
				width: 667,
				height: 1000,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'savoy1',
				alt: 'Savoy Ambiente — fotografie 2',
				width: 792,
				height: 1000,
				span: 'half'
			},
			{
				src: 'savoy3',
				alt: 'Savoy Ambiente — fotografie 3',
				width: 749,
				height: 1000,
				span: 'half'
			},
			{
				src: 'savoy4',
				alt: 'Savoy Ambiente — fotografie 4',
				width: 1333,
				height: 1000
			},
			{
				src: 'savoy5',
				alt: 'Savoy Ambiente — fotografie 5',
				width: 1333,
				height: 1000
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
				height: 900
			},
			{
				src: 'gur2',
				alt: 'Srdcovka Gurmanie — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'gur3',
				alt: 'Srdcovka Gurmanie — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'gur4',
				alt: 'Srdcovka Gurmanie — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'gur5',
				alt: 'Srdcovka Gurmanie — fotografie 5',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gur12',
				alt: 'Srdcovka Gurmanie — fotografie 6',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'gur6',
				alt: 'Srdcovka Gurmanie — fotografie 7',
				width: 1350,
				height: 900
			},
			{
				src: 'gur7',
				alt: 'Srdcovka Gurmanie — fotografie 8',
				width: 1350,
				height: 900
			},
			{
				src: 'gur8',
				alt: 'Srdcovka Gurmanie — fotografie 9',
				width: 1350,
				height: 900
			},
			{
				src: 'gur9',
				alt: 'Srdcovka Gurmanie — fotografie 10',
				width: 1350,
				height: 900
			},
			{
				src: 'gur10',
				alt: 'Srdcovka Gurmanie — fotografie 11',
				width: 1350,
				height: 900
			},
			{
				src: 'gur11',
				alt: 'Srdcovka Gurmanie — fotografie 12',
				width: 1350,
				height: 900
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
				height: 1000
			},
			{
				src: 'pizza2',
				alt: 'Pizzanuova Ambiente — fotografie 2',
				width: 1335,
				height: 1000
			},
			{
				src: 'pizza3',
				alt: 'Pizzanuova Ambiente — fotografie 3',
				width: 1335,
				height: 1000
			},
			{
				src: 'pizza4',
				alt: 'Pizzanuova Ambiente — fotografie 4',
				width: 1337,
				height: 1000
			},
			{
				src: 'pizza5',
				alt: 'Pizzanuova Ambiente — fotografie 5',
				width: 1335,
				height: 1000
			},
			{
				src: 'pizza6',
				alt: 'Pizzanuova Ambiente — fotografie 6',
				width: 1333,
				height: 1000
			},
			{
				src: 'pizzatitul',
				alt: 'Pizzanuova Ambiente — fotografie 7',
				width: 1333,
				height: 1000
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
				height: 900
			},
			{
				src: 'mnd2',
				alt: 'Budova společnosti MND — fotografie 2',
				width: 533,
				height: 900,
				span: 'half'
			},
			{
				src: 'mnd3',
				alt: 'Budova společnosti MND — fotografie 3',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'mnd5',
				alt: 'Budova společnosti MND — fotografie 4',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'mnd6',
				alt: 'Budova společnosti MND — fotografie 5',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'mnd4',
				alt: 'Budova společnosti MND — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'mnd7',
				alt: 'Budova společnosti MND — fotografie 7',
				width: 582,
				height: 900,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'maso2',
				alt: 'Naše maso — řeznictví — fotografie 2',
				width: 1333,
				height: 1000
			},
			{
				src: 'maso3',
				alt: 'Naše maso — řeznictví — fotografie 3',
				width: 1333,
				height: 1000
			},
			{
				src: 'maso4',
				alt: 'Naše maso — řeznictví — fotografie 4',
				width: 1333,
				height: 1000
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
				height: 1000
			},
			{
				src: 'lokalplzen2',
				alt: 'Lokál Pod Divadlem — fotografie 2',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalplzen3',
				alt: 'Lokál Pod Divadlem — fotografie 3',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalplzen4',
				alt: 'Lokál Pod Divadlem — fotografie 4',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalplzen5',
				alt: 'Lokál Pod Divadlem — fotografie 5',
				width: 1340,
				height: 1000
			},
			{
				src: 'lokalplzen6',
				alt: 'Lokál Pod Divadlem — fotografie 6',
				width: 1335,
				height: 1000
			},
			{
				src: 'lokalplzen7',
				alt: 'Lokál Pod Divadlem — fotografie 7',
				width: 749,
				height: 1000,
				span: 'half'
			},
			{
				src: 'lokalplzen8',
				alt: 'Lokál Pod Divadlem — fotografie 8',
				width: 1335,
				height: 1000
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
				height: 1000
			},
			{
				src: 'jesenice2',
				alt: 'Bytové domy Jesenice — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'jesenice3',
				alt: 'Bytové domy Jesenice — fotografie 3',
				width: 1500,
				height: 1000
			},
			{
				src: 'jesenice4',
				alt: 'Bytové domy Jesenice — fotografie 4',
				width: 1500,
				height: 1000
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
				height: 1000
			},
			{
				src: 'kampus2',
				alt: 'Kampus park Hodkovičky — fotografie 2',
				width: 1609,
				height: 1000
			},
			{
				src: 'kampus3',
				alt: 'Kampus park Hodkovičky — fotografie 3',
				width: 1611,
				height: 1000
			},
			{
				src: 'kampus4',
				alt: 'Kampus park Hodkovičky — fotografie 4',
				width: 1611,
				height: 1000
			},
			{
				src: 'kampus5',
				alt: 'Kampus park Hodkovičky — fotografie 5',
				width: 1613,
				height: 1000
			},
			{
				src: 'kampus6',
				alt: 'Kampus park Hodkovičky — fotografie 6',
				width: 1611,
				height: 1000
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
				height: 1000
			},
			{
				src: 'fio2',
				alt: 'Cantinetta Fiorentina — fotografie 2',
				width: 1501,
				height: 1000
			},
			{
				src: 'fio7',
				alt: 'Cantinetta Fiorentina — fotografie 3',
				width: 1773,
				height: 1000
			},
			{
				src: 'fio8',
				alt: 'Cantinetta Fiorentina — fotografie 4',
				width: 1773,
				height: 1000
			},
			{
				src: 'fio11',
				alt: 'Cantinetta Fiorentina — fotografie 5',
				width: 1501,
				height: 1000
			},
			{
				src: 'fio12',
				alt: 'Cantinetta Fiorentina — fotografie 6',
				width: 1501,
				height: 1000
			},
			{
				src: 'fio13',
				alt: 'Cantinetta Fiorentina — fotografie 7',
				width: 1501,
				height: 1000
			},
			{
				src: 'fio20',
				alt: 'Cantinetta Fiorentina — fotografie 8',
				width: 1501,
				height: 1000
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
				height: 900
			},
			{
				src: 'ot2',
				alt: 'Srdcovka Otrokovice — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'ot3',
				alt: 'Srdcovka Otrokovice — fotografie 3',
				width: 1350,
				height: 900
			},
			{
				src: 'ot4',
				alt: 'Srdcovka Otrokovice — fotografie 4',
				width: 1350,
				height: 900
			},
			{
				src: 'ot5',
				alt: 'Srdcovka Otrokovice — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 'ot6',
				alt: 'Srdcovka Otrokovice — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'ot7',
				alt: 'Srdcovka Otrokovice — fotografie 7',
				width: 1350,
				height: 900
			},
			{
				src: 'ot8',
				alt: 'Srdcovka Otrokovice — fotografie 8',
				width: 1350,
				height: 900
			},
			{
				src: 'ot9',
				alt: 'Srdcovka Otrokovice — fotografie 9',
				width: 1350,
				height: 900
			},
			{
				src: 'ot10',
				alt: 'Srdcovka Otrokovice — fotografie 10',
				width: 1350,
				height: 900
			},
			{
				src: 'ot11',
				alt: 'Srdcovka Otrokovice — fotografie 11',
				width: 1350,
				height: 900
			},
			{
				src: 'ot12',
				alt: 'Srdcovka Otrokovice — fotografie 12',
				width: 1350,
				height: 900
			},
			{
				src: 'ot13',
				alt: 'Srdcovka Otrokovice — fotografie 13',
				width: 1350,
				height: 900
			},
			{
				src: 'ot14',
				alt: 'Srdcovka Otrokovice — fotografie 14',
				width: 1350,
				height: 900
			},
			{
				src: 'ot15',
				alt: 'Srdcovka Otrokovice — fotografie 15',
				width: 1350,
				height: 900
			},
			{
				src: 'ot16',
				alt: 'Srdcovka Otrokovice — fotografie 16',
				width: 1350,
				height: 900
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
				height: 1000
			},
			{
				src: 'havel2',
				alt: 'Restaurace Havelák — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel3',
				alt: 'Restaurace Havelák — fotografie 3',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel4',
				alt: 'Restaurace Havelák — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel5',
				alt: 'Restaurace Havelák — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel6',
				alt: 'Restaurace Havelák — fotografie 6',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel7',
				alt: 'Restaurace Havelák — fotografie 7',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel8',
				alt: 'Restaurace Havelák — fotografie 8',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel9',
				alt: 'Restaurace Havelák — fotografie 9',
				width: 1481,
				height: 1000
			},
			{
				src: 'havel11',
				alt: 'Restaurace Havelák — fotografie 10',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'havel12',
				alt: 'Restaurace Havelák — fotografie 11',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'havel10',
				alt: 'Restaurace Havelák — fotografie 12',
				width: 1500,
				height: 1000
			},
			{
				src: 'havel13',
				alt: 'Restaurace Havelák — fotografie 13',
				width: 667,
				height: 1000,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'gf2',
				alt: 'Restaurace GOOD FOOD — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'gf3',
				alt: 'Restaurace GOOD FOOD — fotografie 3',
				width: 1596,
				height: 1000
			},
			{
				src: 'gf4',
				alt: 'Restaurace GOOD FOOD — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'gf5',
				alt: 'Restaurace GOOD FOOD — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'gf6',
				alt: 'Restaurace GOOD FOOD — fotografie 6',
				width: 1357,
				height: 1000
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
				height: 1000
			},
			{
				src: 'senior2',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 2',
				width: 1613,
				height: 1000
			},
			{
				src: 'senior3',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 3',
				width: 1613,
				height: 1000
			},
			{
				src: 'senior4',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 4',
				width: 1612,
				height: 1000
			},
			{
				src: 'senior5',
				alt: 'Areál bydlení a služeb pro seniory Chářovice — fotografie 5',
				width: 1612,
				height: 1000
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
				height: 1000
			},
			{
				src: 'lokalbrno2',
				alt: 'Lokál U Caipla — fotografie 2',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalbrno3',
				alt: 'Lokál U Caipla — fotografie 3',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalbrno4',
				alt: 'Lokál U Caipla — fotografie 4',
				width: 1499,
				height: 1000
			},
			{
				src: 'lokalbrno5',
				alt: 'Lokál U Caipla — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'lokalbrno6',
				alt: 'Lokál U Caipla — fotografie 6',
				width: 1499,
				height: 1000
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
				height: 1000
			},
			{
				src: 'letnany1',
				alt: 'Bytové domy Letňany — fotografie 2',
				width: 1585,
				height: 1000
			},
			{
				src: 'letnany2',
				alt: 'Bytové domy Letňany — fotografie 3',
				width: 1613,
				height: 1000
			},
			{
				src: 'letnany3',
				alt: 'Bytové domy Letňany — fotografie 4',
				width: 1568,
				height: 1000
			},
			{
				src: 'letnany4',
				alt: 'Bytové domy Letňany — fotografie 5',
				width: 1666,
				height: 1000
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
				height: 1000
			},
			{
				src: 'ambasada2',
				alt: 'Ambasáda Saúdské Arábie — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'ambasada3',
				alt: 'Ambasáda Saúdské Arábie — fotografie 3',
				width: 1500,
				height: 1000
			},
			{
				src: 'ambasada4',
				alt: 'Ambasáda Saúdské Arábie — fotografie 4',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'ambasada5',
				alt: 'Ambasáda Saúdské Arábie — fotografie 5',
				width: 746,
				height: 1000,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'xl1',
				alt: 'XL restaurant — fotografie 2',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'xl8',
				alt: 'XL restaurant — fotografie 3',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'xl3',
				alt: 'XL restaurant — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl4',
				alt: 'XL restaurant — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl5',
				alt: 'XL restaurant — fotografie 6',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl6',
				alt: 'XL restaurant — fotografie 7',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl7',
				alt: 'XL restaurant — fotografie 8',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl9',
				alt: 'XL restaurant — fotografie 9',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl10',
				alt: 'XL restaurant — fotografie 10',
				width: 1500,
				height: 1000
			},
			{
				src: 'xl11',
				alt: 'XL restaurant — fotografie 11',
				width: 1500,
				height: 1000
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
				height: 900
			},
			{
				src: 'golf3',
				alt: 'Golfový klub Ropice — fotografie 2',
				width: 1287,
				height: 900
			},
			{
				src: 'golf1',
				alt: 'Golfový klub Ropice — fotografie 3',
				width: 675,
				height: 900,
				span: 'half'
			},
			{
				src: 'golf4',
				alt: 'Golfový klub Ropice — fotografie 4',
				width: 1200,
				height: 900
			},
			{
				src: 'golf5',
				alt: 'Golfový klub Ropice — fotografie 5',
				width: 971,
				height: 900
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
				height: 1000
			},
			{
				src: 'welnes2',
				alt: 'Wellness Reitenberger — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'welnes3',
				alt: 'Wellness Reitenberger — fotografie 3',
				width: 1500,
				height: 1000
			},
			{
				src: 'welnes4',
				alt: 'Wellness Reitenberger — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'welnes5',
				alt: 'Wellness Reitenberger — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'welnes6',
				alt: 'Wellness Reitenberger — fotografie 6',
				width: 1500,
				height: 1000
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
				height: 1000
			},
			{
				src: 'masoshop2',
				alt: 'Naše maso — prodejna — fotografie 2',
				width: 1501,
				height: 1000
			},
			{
				src: 'masoshop3',
				alt: 'Naše maso — prodejna — fotografie 3',
				width: 1499,
				height: 1000
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
				height: 1000
			},
			{
				src: 'nadrazi2',
				alt: 'Nádraží Mladá Boleslav — fotografie 2',
				width: 1615,
				height: 1000
			},
			{
				src: 'nadrazi3',
				alt: 'Nádraží Mladá Boleslav — fotografie 3',
				width: 1615,
				height: 1000
			},
			{
				src: 'nadrazi4',
				alt: 'Nádraží Mladá Boleslav — fotografie 4',
				width: 1615,
				height: 1000
			},
			{
				src: 'nadrazi5',
				alt: 'Nádraží Mladá Boleslav — fotografie 5',
				width: 1615,
				height: 1000
			},
			{
				src: 'nadrazi6',
				alt: 'Nádraží Mladá Boleslav — fotografie 6',
				width: 1615,
				height: 1000
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
				height: 900
			},
			{
				src: 'kun2',
				alt: 'Rodinné domy Kunratice — fotografie 2',
				width: 1366,
				height: 900
			},
			{
				src: 'kun3',
				alt: 'Rodinné domy Kunratice — fotografie 3',
				width: 1366,
				height: 900
			},
			{
				src: 'kun4',
				alt: 'Rodinné domy Kunratice — fotografie 4',
				width: 1366,
				height: 900
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
				height: 900
			},
			{
				src: 'gor2',
				alt: 'Koncept prodejen Gorenje — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'gor3',
				alt: 'Koncept prodejen Gorenje — fotografie 3',
				width: 1349,
				height: 900
			},
			{
				src: 'gor4',
				alt: 'Koncept prodejen Gorenje — fotografie 4',
				width: 1349,
				height: 900
			},
			{
				src: 'gor5',
				alt: 'Koncept prodejen Gorenje — fotografie 5',
				width: 1349,
				height: 900
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
				height: 900
			},
			{
				src: 'al2',
				alt: 'Koncept prodejen Alpine — fotografie 2',
				width: 1447,
				height: 900
			},
			{
				src: 'al3',
				alt: 'Koncept prodejen Alpine — fotografie 3',
				width: 1447,
				height: 900
			},
			{
				src: 'al4',
				alt: 'Koncept prodejen Alpine — fotografie 4',
				width: 1447,
				height: 900
			},
			{
				src: 'al5',
				alt: 'Koncept prodejen Alpine — fotografie 5',
				width: 1447,
				height: 900
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
				height: 900
			},
			{
				src: 'luc2',
				alt: 'Rodinné domy Lučany — fotografie 2',
				width: 1200,
				height: 900
			},
			{
				src: 'luc3',
				alt: 'Rodinné domy Lučany — fotografie 3',
				width: 1366,
				height: 900
			},
			{
				src: 'luc4',
				alt: 'Rodinné domy Lučany — fotografie 4',
				width: 1200,
				height: 900
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
				height: 900
			},
			{
				src: 'hos1',
				alt: 'Obytný soubor Hostavice — fotografie 2',
				width: 600,
				height: 900,
				span: 'half'
			},
			{
				src: 'hos4',
				alt: 'Obytný soubor Hostavice — fotografie 3',
				width: 603,
				height: 900,
				span: 'half'
			},
			{
				src: 'hos3',
				alt: 'Obytný soubor Hostavice — fotografie 4',
				width: 1344,
				height: 900
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
				height: 900
			},
			{
				src: 'la2',
				alt: 'Restaurant La Degustation — fotografie 2',
				width: 1200,
				height: 900
			},
			{
				src: 'la3',
				alt: 'Restaurant La Degustation — fotografie 3',
				width: 1201,
				height: 900
			},
			{
				src: 'la4',
				alt: 'Restaurant La Degustation — fotografie 4',
				width: 1379,
				height: 900
			},
			{
				src: 'la5',
				alt: 'Restaurant La Degustation — fotografie 5',
				width: 1350,
				height: 900
			},
			{
				src: 'la6',
				alt: 'Restaurant La Degustation — fotografie 6',
				width: 1350,
				height: 900
			},
			{
				src: 'la7',
				alt: 'Restaurant La Degustation — fotografie 7',
				width: 1200,
				height: 900
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
				height: 900
			},
			{
				src: 'sto2',
				alt: 'Bytový dům Stodůlky — fotografie 2',
				width: 1350,
				height: 900
			},
			{
				src: 'sto3',
				alt: 'Bytový dům Stodůlky — fotografie 3',
				width: 1200,
				height: 900
			},
			{
				src: 'sto4',
				alt: 'Bytový dům Stodůlky — fotografie 4',
				width: 1200,
				height: 900
			},
			{
				src: 'sto5',
				alt: 'Bytový dům Stodůlky — fotografie 5',
				width: 1351,
				height: 900
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
				height: 1000
			},
			{
				src: 'zbr3',
				alt: 'Bytové domy Zbraslav — fotografie 2',
				width: 1461,
				height: 1000
			},
			{
				src: 'zbr1',
				alt: 'Bytové domy Zbraslav — fotografie 3',
				width: 666,
				height: 1000,
				span: 'half'
			},
			{
				src: 'zbr4',
				alt: 'Bytové domy Zbraslav — fotografie 4',
				width: 1333,
				height: 1000
			},
			{
				src: 'zbr5',
				alt: 'Bytové domy Zbraslav — fotografie 5',
				width: 1333,
				height: 1000
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
				height: 1000
			},
			{
				src: 'zb2',
				alt: 'Bytový dům Zbraslav — fotografie 2',
				width: 1333,
				height: 1000
			},
			{
				src: 'zb3',
				alt: 'Bytový dům Zbraslav — fotografie 3',
				width: 750,
				height: 1000,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'gyros2',
				alt: 'Fresh Gyros — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'gyros3',
				alt: 'Fresh Gyros — fotografie 3',
				width: 1458,
				height: 1000
			},
			{
				src: 'gyros4',
				alt: 'Fresh Gyros — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'gyros5',
				alt: 'Fresh Gyros — fotografie 5',
				width: 1500,
				height: 1000
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
				height: 1000
			},
			{
				src: 'mak2',
				alt: 'Rodinné domy Makotřasy — fotografie 2',
				width: 1517,
				height: 1000
			},
			{
				src: 'mak3',
				alt: 'Rodinné domy Makotřasy — fotografie 3',
				width: 1496,
				height: 1000
			},
			{
				src: 'mak4',
				alt: 'Rodinné domy Makotřasy — fotografie 4',
				width: 1496,
				height: 1000
			},
			{
				src: 'mak5',
				alt: 'Rodinné domy Makotřasy — fotografie 5',
				width: 1500,
				height: 1000
			},
			{
				src: 'mak6',
				alt: 'Rodinné domy Makotřasy — fotografie 6',
				width: 1499,
				height: 1000
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
				height: 1000
			},
			{
				src: 'klob3',
				alt: 'Restaurace Klobásovna — fotografie 2',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'klob4',
				alt: 'Restaurace Klobásovna — fotografie 3',
				width: 667,
				height: 1000,
				span: 'half'
			},
			{
				src: 'klob2',
				alt: 'Restaurace Klobásovna — fotografie 4',
				width: 1501,
				height: 1000
			},
			{
				src: 'klob5',
				alt: 'Restaurace Klobásovna — fotografie 5',
				width: 667,
				height: 1000,
				span: 'half'
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
				height: 1000
			},
			{
				src: 'zvon2',
				alt: 'Restaurace Zvonařka — fotografie 2',
				width: 1500,
				height: 1000
			},
			{
				src: 'zvon3',
				alt: 'Restaurace Zvonařka — fotografie 3',
				width: 1500,
				height: 1000
			},
			{
				src: 'zvon4',
				alt: 'Restaurace Zvonařka — fotografie 4',
				width: 1500,
				height: 1000
			},
			{
				src: 'zvon5',
				alt: 'Restaurace Zvonařka — fotografie 5',
				width: 667,
				height: 1000,
				span: 'half'
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
				height: 900
			},
			{
				src: 't2',
				alt: 'T-Mobile administrativní objekt — fotografie 2',
				width: 1299,
				height: 900
			},
			{
				src: 't3',
				alt: 'T-Mobile administrativní objekt — fotografie 3',
				width: 1304,
				height: 900
			},
			{
				src: 't4',
				alt: 'T-Mobile administrativní objekt — fotografie 4',
				width: 624,
				height: 900,
				span: 'half'
			},
			{
				src: 't5',
				alt: 'T-Mobile administrativní objekt — fotografie 5',
				width: 1296,
				height: 900
			},
			{
				src: 't6',
				alt: 'T-Mobile administrativní objekt — fotografie 6',
				width: 1786,
				height: 900
			},
			{
				src: 't7',
				alt: 'T-Mobile administrativní objekt — fotografie 7',
				width: 1259,
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
		slug: 'restaurace-garden'
	},
	{
		src: 'preview2',
		title: 'Restaurace Semmering - Hlubočepy',
		category: 'interiery',
		slug: 'restaurace-semmering-hlubocepy'
	},
	{
		src: 'preview3',
		title: 'Penzion Kovárna - Český Krumlov',
		category: 'interiery',
		slug: 'penzion-kovarna'
	},
	{
		src: 'preview4',
		title: 'Restaurace Modré dveře',
		category: 'interiery',
		slug: 'restaurace-modry-dvere'
	},
	{
		src: 'preview5',
		title: 'Ocean’s bistro - Brno',
		category: 'interiery',
		slug: 'oceans-bistro'
	},
	{
		src: 'preview6',
		title: 'Restaurace Steakgrill - Kralupy',
		category: 'interiery',
		slug: 'restaurace-steakgrill-kralupy'
	},
	{
		src: 'preview7',
		title: 'Apartmány Harrachov',
		category: 'bytove-domy',
		slug: 'apartmany-harrachov'
	},
	{
		src: 'preview8',
		title: 'Bistro GOOD FOOD',
		category: 'interiery',
		slug: 'bistro-good-food'
	},
	{
		src: 'preview9',
		title: 'Pizzerie Michelangelo',
		category: 'interiery',
		slug: 'pizzerie-michelangelo'
	},
	{
		src: 'preview10',
		title: 'Rodinný dům u Prahy',
		category: 'rodinne-domy',
		slug: 'rodinny-dum-u-prahy'
	},
	{
		src: 'preview11',
		title: 'Rodinný dům Albrechtice',
		category: 'rodinne-domy',
		slug: 'rodinny-dum-albrechtice'
	},
	{
		src: 'preview12',
		title: 'Srdcovka Spálená',
		category: 'interiery',
		slug: 'srdcovka-spalena'
	},
	{
		src: 'preview13',
		title: 'Apartmány Albrechtice v Jizerských horách',
		category: 'bytove-domy',
		slug: 'apartmany-albrechtice'
	},
	{
		src: 'preview14',
		title: 'Rodinná vila - Černošice',
		category: 'rodinne-domy',
		slug: 'rodinna-vila-cernosice'
	},
	{
		src: 'preview15',
		title: 'Lokál - Korunní',
		category: 'interiery',
		slug: 'lokal-korunni'
	},
	{
		src: 'preview16',
		title: 'Restaurace Passberg',
		category: 'interiery',
		slug: 'restaurace-passberg'
	},
	{
		src: 'preview17',
		title: 'Pekárna PANNE NUOVO',
		category: 'interiery',
		slug: 'pekarna-panne-nuovo'
	},
	{
		src: 'preview18',
		title: 'Restaurace Solnice',
		category: 'interiery',
		slug: 'restaurace-solnice'
	},
	{
		src: 'preview19',
		title: 'Food story tržnice',
		category: 'interiery',
		slug: 'food-story-trznice'
	},
	{
		src: 'preview20',
		title: 'Savoy Ambiente',
		category: 'interiery',
		slug: 'savoy-ambiente'
	},
	{
		src: 'preview21',
		title: 'Srdcovka Gurmanie - Praha Smíchov',
		category: 'interiery',
		slug: 'srdcovka-gurmanie'
	},
	{
		src: 'preview22',
		title: 'Pizzanuova Ambiente',
		category: 'interiery',
		slug: 'pizzanuova-ambiente'
	},
	{
		src: 'preview23',
		title: 'Budova společnosti MND',
		category: 'verejne',
		slug: 'budova-mnd'
	},
	{
		src: 'preview24',
		title: 'Naše maso - řeznictví',
		category: 'interiery',
		slug: 'nase-maso-reznictvi'
	},
	{
		src: 'preview25',
		title: 'Lokál Pod Divadlem - Plzeň',
		category: 'interiery',
		slug: 'lokal-pod-divadlem-plzen'
	},
	{
		src: 'preview26',
		title: 'Bytové domy Jesenice',
		category: 'bytove-domy',
		slug: 'bytove-domy-jesenice'
	},
	{
		src: 'preview27',
		title: 'Kampus park Hodkovičky',
		category: 'verejne',
		slug: 'kampus-park-hodkovicky'
	},
	{
		src: 'preview28',
		title: 'Cantinetta Fiorentina - Pařížská',
		category: 'interiery',
		slug: 'cantinetta-fiorentina'
	},
	{
		src: 'preview29',
		title: 'Srdcovka Otrokovice',
		category: 'interiery',
		slug: 'srdcovka-otrokovice'
	},
	{
		src: 'preview30',
		title: 'Restaurace Havelák',
		category: 'interiery',
		slug: 'restaurace-havelak'
	},
	{
		src: 'preview31',
		title: 'Restaurace GOOD FOOD',
		category: 'interiery',
		slug: 'restaurace-good-food'
	},
	{
		src: 'preview32',
		title: 'Areál bydlení a služeb pro seniory Chářovice',
		category: 'bytove-domy',
		slug: 'charovice-seniori'
	},
	{
		src: 'preview33',
		title: 'Lokál U Caipla - Brno',
		category: 'interiery',
		slug: 'lokal-u-caipla'
	},
	{
		src: 'preview34',
		title: 'Bytové domy Letňany',
		category: 'bytove-domy',
		slug: 'bytove-domy-letnany'
	},
	{
		src: 'preview35',
		title: 'Ambasáda Saúdské Arábie',
		category: 'verejne',
		slug: 'ambasada-saudske-arabie'
	},
	{
		src: 'preview36',
		title: 'XL restaurant - Praha',
		category: 'interiery',
		slug: 'xl-restaurant'
	},
	{
		src: 'preview37',
		title: 'Golfový klub - Ropice',
		category: 'verejne',
		slug: 'golfovy-klub-ropice'
	},
	{
		src: 'preview38',
		title: 'Wellness Reitenberger',
		category: 'interiery',
		slug: 'wellness-reitenberger'
	},
	{
		src: 'preview39',
		title: 'Naše maso - prodejna',
		category: 'interiery',
		slug: 'nase-maso-prodejna'
	},
	{
		src: 'preview40',
		title: 'Nádraží Mladá Boleslav',
		category: 'verejne',
		slug: 'nadrazi-mlada-boleslav'
	},
	{
		src: 'preview41',
		title: 'Rodinné domy Kunratice',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-kunratice'
	},
	{
		src: 'preview42',
		title: 'Koncept prodejen Gorenje',
		category: 'interiery',
		slug: 'prodejny-gorenje'
	},
	{
		src: 'preview43',
		title: 'Koncept prodejen Alpine',
		category: 'interiery',
		slug: 'prodejny-alpine'
	},
	{
		src: 'preview44',
		title: 'Rodinné domy - Lučany',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-lucany'
	},
	{
		src: 'preview45',
		title: 'Obytný soubor Hostavice',
		category: 'bytove-domy',
		slug: 'obytny-soubor-hostavice'
	},
	{
		src: 'preview46',
		title: 'Restaurant La Degustation',
		category: 'interiery',
		slug: 'la-degustation'
	},
	{
		src: 'preview47',
		title: 'Bytový dům Stodůlky',
		category: 'bytove-domy',
		slug: 'bytovy-dum-stodulky'
	},
	{
		src: 'preview48',
		title: 'Bytové domy - Zbraslav',
		category: 'bytove-domy',
		slug: 'bytove-domy-zbraslav'
	},
	{
		src: 'preview49',
		title: 'Bytový dům - Zbraslav',
		category: 'bytove-domy',
		slug: 'bytovy-dum-zbraslav'
	},
	{
		src: 'preview50',
		title: 'Fresh Gyros - Praha',
		category: 'interiery',
		slug: 'fresh-gyros'
	},
	{
		src: 'preview51',
		title: 'Rodinné domy - Makotřasy',
		category: 'rodinne-domy',
		slug: 'rodinne-domy-makotrasy'
	},
	{
		src: 'preview52',
		title: 'Restaurace Klobásovna',
		category: 'interiery',
		slug: 'restaurace-klobasovna'
	},
	{
		src: 'preview53',
		title: 'Restaurace Zvonařka - Praha',
		category: 'interiery',
		slug: 'restaurace-zvonarka'
	},
	{
		src: 'preview54',
		title: 'T-Mobile administrativní objekt',
		category: 'verejne',
		slug: 'tmobile-administrativni-objekt'
	}
];
