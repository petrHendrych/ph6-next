import type { Metadata } from 'next';
import React from 'react';

import JsonLd from '@/components/JsonLd';
import PreviewGrid from '@/components/PreviewGrid';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { previewCategories, previewImages } from '@/data';
import { breadcrumbSchema, projectListSchema } from '@/lib/schema';

export const metadata: Metadata = {
	title: 'Projekty — realizace a návrhy',
	description: `Přehled ${previewImages.length} realizací a návrhů architektonického ateliéru PH6 od roku 2002 — interiéry restaurací a prodejen, rodinné a bytové domy, veřejné a administrativní stavby.`,
	alternates: { canonical: '/projekty' },
	openGraph: {
		type: 'website',
		url: '/projekty',
		title: 'Projekty — realizace a návrhy ateliéru PH6',
		// Declaring `openGraph` replaces the inherited object wholesale, so the
		// site-wide `opengraph-image.jpg` has to be named again here.
		images: '/opengraph-image.jpg'
	}
};

/** `1 realizace`, `2–4 realizace`, `5+ realizací`. */
const countLabel = (count: number) => {
	if (count === 1) return '1 realizace';
	if (count < 5) return `${count} realizace`;
	return `${count} realizací`;
};

// Sections are ordered by how much work sits in each bucket, so the biggest
// body of work opens the page. Derived, not hardcoded — re-tagging a project in
// `data.ts` reorders the page on its own.
const sections = previewCategories
	.map(({ key, label }) => ({
		key,
		label,
		images: previewImages.filter(image => image.category === key)
	}))
	.filter(section => section.images.length > 0)
	.sort((a, b) => b.images.length - a.images.length);

const Page = () => (
	<div className="container mx-auto px-6 py-10 md:py-20">
		{/* The list is what a crawler follows to reach all 54 detail pages. */}
		<JsonLd data={projectListSchema()} />
		<JsonLd
			data={breadcrumbSchema([{ name: 'Projekty', path: '/projekty' }])}
		/>

		<Reveal className="max-w-4xl">
			<h1 className="text-3xl leading-none tracking-[0.24em] text-neutral-900 uppercase sm:text-4xl md:text-5xl md:tracking-[0.2em]">
				Projekty
			</h1>
			<p className="mt-8 max-w-[70ch] text-base leading-relaxed text-neutral-700 md:text-lg">
				Přehled {previewImages.length} realizací a návrhů ateliéru PH6 od roku
				2002 — od interiérů restaurací, kaváren a prodejen přes rodinné a bytové
				domy až po veřejné a administrativní stavby.
			</p>
		</Reveal>

		{sections.map((section, index) => (
			<section key={section.key} className="pt-14 md:pt-28">
				<SectionHeading
					index={String(index + 1).padStart(2, '0')}
					title={section.label}
					note={countLabel(section.images.length)}
				/>
				<PreviewGrid images={section.images} />
			</section>
		))}
	</div>
);

export default Page;
