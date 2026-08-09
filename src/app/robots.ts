import type { MetadataRoute } from 'next';

import { isIndexable, siteUrl } from '@/data';

/**
 * Nothing on the site is private, so the production deployment is crawlable in
 * full and the sitemap line points a crawler at all 56 URLs without following
 * links.
 *
 * Every other deployment refuses the whole site. The old PH6 site is still
 * live on the domain; a staging copy that lets itself be crawled would be a
 * second site answering the same Czech queries, and no sitemap is offered
 * because its URLs belong to a host this deployment does not serve.
 */
const robots = (): MetadataRoute.Robots =>
	isIndexable
		? {
				rules: { userAgent: '*', allow: '/' },
				sitemap: `${siteUrl}/sitemap.xml`,
				host: siteUrl
			}
		: { rules: { userAgent: '*', disallow: '/' } };

export default robots;
