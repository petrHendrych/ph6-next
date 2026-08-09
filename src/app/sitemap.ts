import type { MetadataRoute } from 'next';

import { siteUrl } from '@/data';
import { projects } from '@/projects';

/** Every indexable URL, project pages derived from `projects`. `lastModified`
 *  is the build time — the site is static, so a deploy is the only change. */
const sitemap = (): MetadataRoute.Sitemap => {
	const lastModified = new Date();

	return [
		{
			// No trailing slash — byte-identical to the home page's canonical.
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
