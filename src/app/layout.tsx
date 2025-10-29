import type { Metadata } from 'next';
import { Geist, Geist_Mono, Raleway } from 'next/font/google';
import './globals.css';

const ralewayFont = Raleway({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-raleway'
});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
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
	<html lang="en" className="">
		<body
			className={`${geistSans.variable} ${geistMono.variable} ${ralewayFont.variable} antialiased`}
		>
			{children}
		</body>
	</html>
);

export default RootLayout;
