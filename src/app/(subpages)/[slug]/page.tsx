import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import JsonLd from '@/components/JsonLd';
import ProjectDetail from '@/components/ProjectDetail';
import { projects } from '@/projects';
import {
	breadcrumbSchema,
	projectDescription,
	projectSchema
} from '@/lib/schema';

type Params = { params: Promise<{ slug: string }> };

// Every page is known at build time, so an unlisted slug 404s.
export const dynamicParams = false;

export const generateStaticParams = () =>
	projects.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({
	params
}: Params): Promise<Metadata> => {
	const { slug } = await params;
	const project = projects.find(p => p.slug === slug);
	if (!project) return { title: 'Projekt' };

	const description = projectDescription(project);
	const cover = project.photos[0];

	return {
		title: project.title,
		description,
		alternates: { canonical: `/${project.slug}` },
		openGraph: {
			type: 'article',
			url: `/${project.slug}`,
			title: project.title,
			description,
			// The project's own opening photograph, not the site-wide OG image.
			images: cover
				? [
						{
							url: `/projects/${project.slug}/${cover.src}.jpg`,
							width: cover.width,
							height: cover.height,
							alt: cover.alt
						}
					]
				: undefined
		}
	};
};

const Page = async ({ params }: Params) => {
	const { slug } = await params;
	const project = projects.find(p => p.slug === slug);
	if (!project) notFound();

	return (
		<div className="container mx-auto px-6 py-10 md:py-20">
			<JsonLd data={projectSchema(project)} />
			<JsonLd
				data={breadcrumbSchema([
					{ name: 'Projekty', path: '/projekty' },
					{ name: project.title, path: `/${project.slug}` }
				])}
			/>

			<ProjectDetail project={project} />
		</div>
	);
};

export default Page;
