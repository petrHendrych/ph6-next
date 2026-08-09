import type { MetadataRoute } from 'next';

import { isIndexable, siteUrl } from '@/data';

/** Nothing here is private, so production is crawlable in full. Every other
 *  deployment refuses the site — the old PH6 site is still live on the domain
 *  and a crawlable staging copy would compete with it. */
const robots = (): MetadataRoute.Robots =>
	isIndexable
		? {
				rules: { userAgent: '*', allow: '/' },
				sitemap: `${siteUrl}/sitemap.xml`,
				host: siteUrl
			}
		: { rules: { userAgent: '*', disallow: '/' } };

export default robots;
