import type {
	Atelier,
	Contact,
	Image,
	NavLink,
	PreviewCategory,
	Reward,
	TeamMember
} from '@/types';

/** Origin behind every canonical URL, sitemap entry and absolute OG image. A
 *  preview deployment overrides it so it does not claim the production URLs.
 *  The apex is canonical; `www` is a CNAME onto it and still needs a 301. */
export const siteUrl = (
	process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ph6.cz'
).replace(/\/$/, '');

/** Opt-in on purpose: the studio's old site is live on the domain, and a
 *  staging build that indexes itself competes with it for the same queries.
 *  Everything without this flag serves `noindex` and `Disallow: /`. Set it when
 *  the new site takes over the domain — not before. */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';

/** The one-sentence pitch: search result snippet, OG description, JSON-LD. */
export const siteDescription =
	'Architektonický ateliér PH6 z Prahy — návrhy interiérů a gastro provozů, rodinných a bytových domů i veřejných a administrativních staveb. Od roku 2002.';

export const navLinks: NavLink[] = [
	{ hash: '#preview-section', label: 'Projekty' },
	{ hash: '#atelier-section', label: 'Ateliér' },
	{ hash: '#kontakt-section', label: 'Kontakt' }
];

// The label defines what belongs in the bucket. `/projekty` orders its sections
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

/** Studio copy. The facts restate the prose in a scannable column beside it. */
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
		title: 'Restaurace Semmering',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIFA//EACUQAAIBAgUDBQAAAAAAAAAAAAECAAMRBAUTITESQVEiMjNxcv/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//EABcRAQEBAQAAAAAAAAAAAAAAAAEAEUH/2gAMAwEAAhEDEQA/ABM4ey1Gr6bHlQBa9vHaOcwxbYVw9qxVtrHpLA+fqQq3ypNqHL/kyBneTYnMRq+imrCw3v3hJb+8wjZq7f/Z'
	},
	{
		src: 'uvod_2',
		title: 'Restaurace Steakgrill',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAwAF/8QAIxAAAQMDAgcAAAAAAAAAAAAAAQACAxESITJyBAUUQUJxgf/EABUBAQEAAAAAAAAAAAAAAAAAAAIE/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERAv/aAAwDAQACEQMRAD8AKI8IYxG5wtdlwAJz7SAcsAvEjRTvccLKbqfvSv1t+qdOFbzRZemurEatOagnKkUnjtUjRrJ//9k='
	},
	{
		src: 'uvod_3',
		title: 'Restaurace Modré dveře',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMCBAb/xAAmEAACAQMCBAcAAAAAAAAAAAABAgADBBESIQU0QbExM2Fxc4HB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwL/xAAYEQACAwAAAAAAAAAAAAAAAAAAAQISIf/aAAwDAQACEQMRAD8AlTuEpUtVRijFd2H4It6tulRCajAMhcasHJ33wPXpKN7yX0Ik+ZS9h3hQ1CzxmgF1a3CK4ZHOMM2PFusIjhvLN8j9zCXRB3P/2Q=='
	},
	{
		src: 'uvod_4',
		title: 'Ocean’s bistro',
		blurDataURL:
			'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMFAv/EACQQAAEDAgQHAAAAAAAAAAAAAAEAAgQDERIyQYEFEzFRcXKx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwH/xAAWEQEBAQAAAAAAAAAAAAAAAAABAgD/2gAMAwEAAhEDEQA/AHMicM5oOA4ACXG/iy3JdDFANjYQ4O0GlkqL02HxMkZqXsFZpHHcCJqFOu0sBFz3sNUKLVz7IRzSmRnf/9k='
	}
];

/** Stored in natural case — `RewardsContent` uppercases the title, not the
 *  description. */
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
		// The garden quarter, not the single block under `bytove-domy-zbraslav`.
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

/** Tiles on the landing page; the next one links to `/projekty`. Lives here,
 *  not in `PreviewGrid` — a server component importing a `'use client'` export
 *  receives a proxy, not this number. */
export const HOME_PREVIEW_COUNT = 19;

/** Of those, how many a phone gets before the overview tile. */
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
