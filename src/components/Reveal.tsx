'use client';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap } from '@/lib/gsap';

type Props = {
	children: React.ReactNode;
	className?: string;
	/** Animate the direct children one after another instead of the wrapper. */
	stagger?: boolean;
	as?: 'div' | 'section' | 'ul' | 'dl';
};

/** Scroll-triggered fade and rise. Children pass through untouched, so server
 *  components stay server components. */
const Reveal = ({ children, className, stagger, as: Tag = 'div' }: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const reduced = useReducedMotion();

	useGSAP(
		() => {
			const root = ref.current;
			if (!root) return;

			// `:scope >` — a deep query would animate every nested node.
			const targets = stagger
				? gsap.utils.toArray<HTMLElement>(':scope > *', root)
				: [root];
			if (!targets.length) return;

			const vars: gsap.TweenVars = {
				autoAlpha: 0,
				y: reduced ? 0 : 18,
				duration: reduced ? 0 : 0.7,
				ease: 'power2.out',
				stagger: reduced ? 0 : 0.09
			};

			// Already on screen at mount: play now. On a tall viewport the start
			// line is behind the element, and the trigger would never fire.
			if (root.getBoundingClientRect().top < window.innerHeight) {
				gsap.from(targets, vars);
				return;
			}

			gsap.from(targets, {
				...vars,
				scrollTrigger: { trigger: root, start: 'top 88%', once: true }
			});
		},
		{ scope: ref, dependencies: [reduced, stagger], revertOnUpdate: true }
	);

	return (
		<Tag ref={ref as React.Ref<never>} className={className}>
			{children}
		</Tag>
	);
};

export default Reveal;
