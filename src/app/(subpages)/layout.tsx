import React from 'react';

import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

const SubpageLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<div className="min-h-dvh flex flex-col">
		<SubpageHeader />
		<main className="flex-1 pt-20">{children}</main>
		<Footer />
	</div>
);

export default SubpageLayout;
