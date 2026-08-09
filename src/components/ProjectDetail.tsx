import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Reveal from '@/components/Reveal';
import type { Project, ProjectPhoto, ProjectSlug } from '@/types';

// The right column is 7 of 12 from `lg` up, and a half-span photo takes half of
// that less the gutter.
const SIZES_FULL = '(min-width: 1024px) 58vw, 100vw';
const SIZES_HALF = '(min-width: 1024px) 29vw, (min-width: 640px) 46vw, 100vw';

/** Consecutive `half` photos share a row; everything else stands alone. */
const toRows = (photos: ProjectPhoto[]) =>
	photos.reduce<ProjectPhoto[][]>((rows, photo) => {
		const last = rows[rows.length - 1];
		const pairs =
			photo.span === 'half' && last?.[0].span === 'half' && last.length < 2;

		if (pairs) last.push(photo);
		else rows.push([photo]);

		return rows;
	}, []);

/**
 * Grid tracks in proportion to each photo's aspect ratio. Give a 2:3 photo more
 * width than a 0.6:1 one and both come out the same height, which is how a row
 * of mixed shapes lines up without a crop. `fr` distributes what is left after
 * the gutter, so the row still fills the column exactly.
 */
const trackList = (row: ProjectPhoto[]) =>
	row.map(({ width, height }) => `${(width / height).toFixed(4)}fr`).join(' ');

const Photo = ({
	slug,
	photo,
	sizes,
	priority
}: {
	slug: ProjectSlug;
	photo: ProjectPhoto;
	sizes: string;
	priority?: boolean;
}) => (
	<figure>
		<Image
			src={`/projects/${slug}/${photo.src}.jpg`}
			alt={photo.alt}
			width={photo.width}
			height={photo.height}
			sizes={sizes}
			priority={priority}
			className="h-auto w-full bg-neutral-100"
			// The photograph's average colour fills the reserved box until the
			// jpg paints over it — a long column of grey rectangles is the worst
			// version of this page on a slow connection.
			style={photo.color ? { backgroundColor: photo.color } : undefined}
		/>
	</figure>
);

const ProjectDetail = ({ project }: { project: Project }) => (
	<div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
		{/* `self-start` is what makes the sticky work — without it the grid item
		    stretches to the row height and never has anywhere to stick. */}
		<Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
			<Link
				href="/projekty"
				className="label-micro nav-underline inline-flex items-center gap-3 text-neutral-500 hover:text-neutral-900 motion-safe:transition-colors"
			>
				<svg
					viewBox="0 0 32 12"
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					aria-hidden="true"
					className="h-3 w-6 shrink-0"
				>
					<path d="M32 6H2M7 1L2 6l5 5" />
				</svg>
				Zpět na projekty
			</Link>

			<h1 className="mt-6 text-3xl leading-none tracking-[0.24em] text-neutral-900 uppercase sm:text-4xl md:text-5xl md:tracking-[0.2em]">
				{project.title}
			</h1>

			<dl className="mt-10">
				{project.facts.map(({ label, value }) => (
					<div
						key={label}
						className="border-t border-neutral-200 py-4 first:border-t-0 first:pt-0"
					>
						<dt className="label-micro text-neutral-500">{label}</dt>
						<dd className="mt-2 text-base leading-relaxed text-neutral-900">
							{value}
						</dd>
					</div>
				))}
			</dl>

			<div className="mt-8 flex flex-col gap-5">
				{project.paragraphs.map(paragraph => (
					<p
						key={paragraph}
						className="max-w-[70ch] text-base leading-relaxed text-neutral-700 md:text-lg"
					>
						{paragraph}
					</p>
				))}
			</div>
		</Reveal>

		<Reveal
			className="flex flex-col gap-8 md:gap-12 lg:col-span-7 lg:col-start-6"
			stagger
		>
			{toRows(project.photos).map(row => {
				const photo = row[0];

				if (row.length === 1) {
					return (
						<Photo
							key={photo.src}
							slug={project.slug}
							photo={photo}
							sizes={SIZES_FULL}
							priority={photo === project.photos[0]}
						/>
					);
				}

				// Columns sized by aspect ratio, so a row of photos of differing
				// shapes ends up exactly the same height with nothing cropped. The
				// track list rides in a custom property because it is per-row data,
				// and an inline `grid-template-columns` would also apply on a phone,
				// where the row is meant to stack.
				return (
					<div
						key={photo.src}
						className="grid grid-cols-1 gap-5 sm:grid-cols-[var(--tracks)]"
						style={{ '--tracks': trackList(row) } as React.CSSProperties}
					>
						{row.map(rowPhoto => (
							<Photo
								key={rowPhoto.src}
								slug={project.slug}
								photo={rowPhoto}
								sizes={SIZES_HALF}
							/>
						))}
					</div>
				);
			})}
		</Reveal>
	</div>
);

export default ProjectDetail;
