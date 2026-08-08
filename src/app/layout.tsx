import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const ralewayFont = Raleway({
	subsets: ['latin', 'latin-ext'],
	// font-medium / font-bold are used across the site; without these the
	// browser synthesises fake weights.
	weight: ['400', '500', '700'],
	variable: '--font-raleway'
});

export const metadata: Metadata = {
	title: 'Ateliér | PH6',
	description: 'Webová stránka pro ateliér PH6'
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
