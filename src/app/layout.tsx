import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

import { isIndexable, siteDescription, siteUrl } from '@/data';

const ralewayFont = Raleway({
	subsets: ['latin', 'latin-ext'],
	// font-medium / font-bold are used across the site; without these the
	// browser synthesises fake weights.
	weight: ['400', '500', '700'],
	variable: '--font-raleway'
});

/**
 * Site-wide metadata. Every page inherits it and overrides only what differs —
 * a subpage sets `title` and its own `alternates.canonical`, everything else
 * (locale, OG defaults, robots) resolves from here.
 *
 * There is deliberately no `icons` entry: `icon.svg` and `favicon.ico` are
 * picked up from their filenames, and declaring icons here would override them.
 */
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: 'PH6 — architektonický ateliér Praha',
		// Subpages pass a bare name; the studio is appended for the tab and the
		// search result, where the page title is often all a reader sees.
		template: '%s | PH6 architektonický ateliér'
	},
	description: siteDescription,
	applicationName: 'PH6',
	authors: [{ name: 'PH6' }],
	creator: 'PH6',
	publisher: 'PH6',
	keywords: [
		'architektonický ateliér',
		'architekt Praha',
		'návrh interiéru',
		'interiér restaurace',
		'gastro provozy',
		'rodinné domy',
		'bytové domy',
		'projekční kancelář',
		'PH6'
	],
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		locale: 'cs_CZ',
		siteName: 'PH6',
		url: '/',
		title: 'PH6 — architektonický ateliér Praha',
		description: siteDescription
	},
	twitter: { card: 'summary_large_image' },
	// A build that has not been told it owns the domain stays out of the index
	// entirely — the studio's old site is still live there and does not need a
	// second copy of itself competing under a staging URL.
	robots: isIndexable
		? {
				index: true,
				follow: true,
				// The photography is the product, so let Google show it full size
				// in image results and Discover rather than as a thumbnail.
				googleBot: {
					'index': true,
					'follow': true,
					'max-image-preview': 'large',
					'max-snippet': -1
				}
			}
		: { index: false, follow: false, nocache: true },
	// Czech phone numbers and addresses being auto-linked by iOS rewrites the
	// colour of copy the layout controls.
	formatDetection: { telephone: false, address: false }
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="cs">
		<body className={`${ralewayFont.variable} antialiased`}>{children}</body>
	</html>
);

export default RootLayout;
