import type { MetadataRoute } from 'next';

import { projects, siteUrl } from '@/data';

/**
 * Every indexable URL on the site. The project pages are derived from
 * `projects`, so adding one to `data.ts` adds it here too.
 *
 * `lastModified` is the build time — the site is fully static, so a deploy is
 * the only moment anything can have changed.
 */
const sitemap = (): MetadataRoute.Sitemap => {
	const lastModified = new Date();

	return [
		{
			// No trailing slash — this has to be byte-identical to the canonical
			// the home page declares, or the two disagree about the same URL.
			url: siteUrl,
			lastModified,
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: `${siteUrl}/projekty`,
			lastModified,
			changeFrequency: 'monthly',
			priority: 0.9
		},
		...projects.map(({ slug }) => ({
			url: `${siteUrl}/${slug}`,
			lastModified,
			changeFrequency: 'yearly' as const,
			priority: 0.7
		}))
	];
};

export default sitemap;
