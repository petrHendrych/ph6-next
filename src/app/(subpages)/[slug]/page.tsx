import { notFound } from 'next/navigation';
import React from 'react';

import ProjectDetail from '@/components/ProjectDetail';
import { projects } from '@/data';

type Params = { params: Promise<{ slug: string }> };

// Every project page is known at build time, so an unlisted slug is a 404
// rather than an attempt to render one on demand.
export const dynamicParams = false;

export const generateStaticParams = () =>
	projects.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: Params) => {
	const { slug } = await params;
	const project = projects.find(p => p.slug === slug);
	return { title: project ? `${project.title} — PH6` : 'PH6' };
};

const Page = async ({ params }: Params) => {
	const { slug } = await params;
	const project = projects.find(p => p.slug === slug);
	if (!project) notFound();

	return (
		<div className="container mx-auto px-6 py-10 md:py-20">
			<ProjectDetail project={project} />
		</div>
	);
};

export default Page;
