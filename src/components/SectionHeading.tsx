import React from 'react';

import Reveal from '@/components/Reveal';

type Props = {
	/** Two-digit index printed above the rule, e.g. `01`. */
	index: string;
	title: string;
	/** Optional line set opposite the index on the same rule. */
	note?: string;
};

const SectionHeading = ({ index, title, note }: Props) => (
	<Reveal className="mb-8 md:mb-20">
		<div className="flex items-center gap-5">
			<span className="label-micro text-neutral-500">{index}</span>
			<span className="h-px flex-1 bg-neutral-300" />
			{note ? (
				<span className="label-micro text-neutral-500">{note}</span>
			) : null}
		</div>
		<h2 className="mt-6 text-2xl uppercase leading-none tracking-[0.24em] text-neutral-900 sm:text-3xl md:text-5xl md:tracking-[0.2em]">
			{title}
		</h2>
	</Reveal>
);

export default SectionHeading;
