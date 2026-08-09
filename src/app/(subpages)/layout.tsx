import React from 'react';

import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { subpageTitles } from '@/projects';

const SubpageLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<div className="flex min-h-dvh flex-col">
		<SubpageHeader titles={subpageTitles} />
		<main className="flex-1 pt-20">{children}</main>
		<Footer />
	</div>
);

export default SubpageLayout;
