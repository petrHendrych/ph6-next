import type {
	Atelier,
	Contact,
	Image,
	NavLink,
	PreviewCategory,
	Reward,
	TeamMember
} from '@/types';

export const navLinks: NavLink[] = [
	{ hash: '#preview-section', label: 'Projekty' },
	{ hash: '#atelier-section', label: 'Ateliér' },
	{ hash: '#kontakt-section', label: 'Kontakt' }
];

export const previewCategories: { key: PreviewCategory; label: string }[] = [
	{ key: 'one', label: 'interiéry' },
	{ key: 'two', label: 'rodinné domy' },
	{ key: 'three', label: 'bytové domy' }
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
		{ label: 'Spolupráce', value: 'ARPLAN s.r.o., ORTOGONAL s.r.o.' }
	],
	roster: [
		'Ing. arch. Šimon Brnada',
		'Ing. arch. Jan Mudra',
		'Ing. arch. Kristina Hanzlová',
		'Ing. arch. Pavel Hendrych'
	],
	visualization: 'Ing. Jan Haspra — 3dvizualizace.cz',
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

export const previewImages: Image[] = [
	{
		src: 'preview1',
		title: 'Restaurace Garden&Pub - Brno',
		category: 'one'
	},
	{
		src: 'preview2',
		title: 'Restaurace Semmering - Hlubočepy',
		category: 'one'
	},
	{
		src: 'preview3',
		title: 'Penzion Kovárna - Český Krumlov',
		category: 'one'
	},
	{
		src: 'preview4',
		title: 'Restaurace Modrý dveře',
		category: 'one'
	},
	{
		src: 'preview5',
		title: 'Ocean`s bistro - Brno',
		category: 'two'
	},
	{
		src: 'preview6',
		title: 'Restaurace Steakgrill - Kralupy',
		category: 'two'
	},
	{
		src: 'preview7',
		title: 'Apartmány Harrachov',
		category: 'three'
	},
	{
		src: 'preview8',
		title: 'Bistro GOOD FOOD',
		category: 'three'
	},
	{
		src: 'preview9',
		title: 'Pizzerie Michalengelo',
		category: 'two'
	},
	{
		src: 'preview10',
		title: 'Rodinný dům u Prahy',
		category: 'one'
	},
	{
		src: 'preview11',
		title: 'Rodinný dům Albrechtice',
		category: 'one'
	},
	{
		src: 'preview12',
		title: 'Srdcovka Spálená',
		category: 'one'
	},
	{
		src: 'preview13',
		title: 'Apartmány Albrechtice v Jizerských horách',
		category: 'two'
	},
	{
		src: 'preview14',
		title: 'Rodinná vila - Černošice',
		category: 'one'
	},
	{
		src: 'preview15',
		title: 'Lokál - Korunní',
		category: 'three'
	},
	{
		src: 'preview16',
		title: 'Restaurace Passberg',
		category: 'three'
	},
	{
		src: 'preview17',
		title: 'pekárna PANNE NUOVO',
		category: 'two'
	},
	{
		src: 'preview18',
		title: 'Restaurace Solnice',
		category: 'one'
	},
	{
		src: 'preview19',
		title: 'Food story tržnice',
		category: 'one'
	},
	{
		src: 'preview20',
		title: 'Savoy Ambiente',
		category: 'three'
	},
	{
		src: 'preview21',
		title: 'Srdcovka Gurmanie = Praha Smíchov',
		category: 'one'
	},
	{
		src: 'preview22',
		title: 'Pizzanuova Ambiente',
		category: 'two'
	},
	{
		src: 'preview23',
		title: 'Budova společnosti MND',
		category: 'one'
	},
	{
		src: 'preview24',
		title: 'Naše maso - řeznictví',
		category: 'three'
	},
	{
		src: 'preview25',
		title: 'Lokál Pod Divadlem - Plzeň',
		category: 'one'
	},
	{
		src: 'preview26',
		title: 'Bytové domy Jesenice',
		category: 'three'
	},
	{
		src: 'preview27',
		title: 'Kampus park Hodkovičky',
		category: 'one'
	},
	{
		src: 'preview28',
		title: 'Cantineta Florentina - Pařížská',
		category: 'two'
	},
	{
		src: 'preview29',
		title: 'Srdcovka Otrokovice',
		category: 'three'
	},
	{
		src: 'preview30',
		title: 'Restaurace Havelák',
		category: 'two'
	},
	{
		src: 'preview31',
		title: 'Restaurace GOOD FOOD',
		category: 'three'
	},
	{
		src: 'preview32',
		title: 'Areál bydlení a služeb pro seniory Chářovice',
		category: 'two'
	},
	{
		src: 'preview33',
		title: 'Lokál U Caipla - Brno',
		category: 'two'
	},
	{
		src: 'preview34',
		title: 'Bytové domy Letňany',
		category: 'three'
	},
	{
		src: 'preview35',
		title: 'Ambasada Saudské Arabie',
		category: 'three'
	},
	{
		src: 'preview36',
		title: 'XL restaurant - Praha',
		category: 'two'
	},
	{
		src: 'preview37',
		title: 'Golfový klub - Ropice',
		category: 'one'
	},
	{
		src: 'preview38',
		title: 'Wellness Reitenberger',
		category: 'two'
	},
	{
		src: 'preview39',
		title: 'Naše maso - prodejna',
		category: 'two'
	},
	{
		src: 'preview40',
		title: 'Nádraží Mladá Boleslav',
		category: 'one'
	},
	{
		src: 'preview41',
		title: 'Rodinné domy Kunratice',
		category: 'two'
	},
	{
		src: 'preview42',
		title: 'Koncept prodejen Gorenje',
		category: 'two'
	},
	{
		src: 'preview43',
		title: 'Koncept prodejen Alpine',
		category: 'three'
	},
	{
		src: 'preview44',
		title: 'Rodinné domy - Lučany',
		category: 'three'
	},
	{
		src: 'preview45',
		title: 'Obytný soubor Hostavice',
		category: 'one'
	},
	{
		src: 'preview46',
		title: 'Restaurant La Degustation',
		category: 'one'
	},
	{
		src: 'preview47',
		title: 'Bytový dům Stodůlky',
		category: 'one'
	},
	{
		src: 'preview48',
		title: 'Bytové domy - Zbraslav',
		category: 'three'
	},
	{
		src: 'preview49',
		title: 'Bytový dům - Zbraslav',
		category: 'two'
	},
	{
		src: 'preview50',
		title: 'Fresh Gyros - Praha',
		category: 'three'
	},
	{
		src: 'preview51',
		title: 'Rodinné domy - Makotřasy',
		category: 'two'
	},
	{
		src: 'preview52',
		title: 'Restaurace Klobásovna',
		category: 'one'
	},
	{
		src: 'preview53',
		title: 'Restaurace Zvonařka - Praha',
		category: 'three'
	},
	{
		src: 'preview54',
		title: 'T-Mobile administrativní objekt',
		category: 'one'
	}
];
