import {
	atelier,
	contact,
	previewImages,
	rewards,
	siteDescription,
	siteUrl,
	team
} from '@/data';
import type { Project } from '@/types';

/** Everything else in the graph points at this `@id` rather than restating the
 *  address, so Google reads one business, not three. */
const STUDIO_ID = `${siteUrl}/#studio`;

const absolute = (path: string) => `${siteUrl}${path}`;

/** A `TODO` placeholder is left out of the markup rather than published. */
const written = (value: string) => (value.startsWith('TODO') ? null : value);

export const studioSchema = () => ({
	'@context': 'https://schema.org',
	'@type': ['ArchitecturalService', 'LocalBusiness'],
	'@id': STUDIO_ID,
	'name': 'PH6',
	'alternateName': 'Architektonický ateliér PH6',
	'url': siteUrl,
	'image': absolute('/opengraph-image.jpg'),
	'description': siteDescription,
	'slogan': atelier.lead,
	'foundingDate': '2002',
	'founder': { '@type': 'Person', 'name': 'Ing. arch. Šimon Brnada' },
	'employee': team.map(({ name }) => ({ '@type': 'Person', name })),
	'email': contact.email,
	'telephone': contact.phone,
	'address': {
		'@type': 'PostalAddress',
		'streetAddress': contact.addressLines[0],
		'addressLocality': contact.addressLines[1],
		'postalCode': contact.addressLines[2].split(',')[0].trim(),
		'addressCountry': 'CZ'
	},
	'areaServed': { '@type': 'Country', 'name': 'Česká republika' },
	'knowsAbout': [
		'Architektura',
		'Návrh interiéru',
		'Gastro provozy',
		'Rodinné domy',
		'Bytové domy',
		'Administrativní stavby'
	],
	'award': rewards.map(({ title, description }) => `${title} — ${description}`),
	'sameAs': [contact.facebookUrl]
});

/** Trail from the home page down to `path`; `name` is the page's own title. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	'itemListElement': [{ name: 'Úvod', path: '/' }, ...trail].map(
		(item, index) => ({
			'@type': 'ListItem',
			'position': index + 1,
			'name': item.name,
			'item': absolute(item.path)
		})
	)
});

/** What a crawler follows to reach all 54 detail pages from one document. */
export const projectListSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'CollectionPage',
	'name': 'Projekty',
	'url': absolute('/projekty'),
	'isPartOf': { '@id': STUDIO_ID },
	'mainEntity': {
		'@type': 'ItemList',
		'numberOfItems': previewImages.length,
		'itemListElement': previewImages.map((image, index) => ({
			'@type': 'ListItem',
			'position': index + 1,
			'name': image.title,
			...(image.slug ? { url: absolute(`/${image.slug}`) } : {})
		}))
	}
});

export const projectSchema = (project: Project) => {
	const location = written(project.location);
	const year = written(project.year);

	return {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		'name': project.title,
		'url': absolute(`/${project.slug}`),
		'inLanguage': 'cs',
		'creator': { '@id': STUDIO_ID },
		'image': project.photos.map(photo =>
			absolute(`/projects/${project.slug}/${photo.src}.jpg`)
		),
		...(location
			? { contentLocation: { '@type': 'Place', 'name': location } }
			: {}),
		...(year ? { dateCreated: year } : {})
	};
};

/** Search-result snippet, built from whichever facts are filled in. */
export const projectDescription = (project: Project) => {
	const title = project.title.toLowerCase();
	const location = written(project.location);
	const type = project.facts.find(fact => fact.label === 'Typ')?.value;

	// Skip a place or type the title already states, so the snippet does not
	// read `Bytový dům Zbraslav, Praha — Zbraslav — bytový dům`.
	const town = location?.split('—').at(-1)?.trim().toLowerCase();
	const place =
		location && town && !title.includes(town) ? `, ${location}` : '';
	const kind =
		type && !title.includes(type.toLowerCase()) ? type.toLowerCase() : null;

	return kind
		? `${project.title}${place} — ${kind} od architektonického ateliéru PH6. Prohlédněte si fotografie realizace.`
		: `${project.title}${place} — realizace architektonického ateliéru PH6. Prohlédněte si fotografie.`;
};
