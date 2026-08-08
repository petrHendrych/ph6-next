'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useScrollTo } from '@/hooks/useScrollTo';

/** Cmd/ctrl/shift-click and middle-click belong to the browser. */
const isPlainClick = (event: React.MouseEvent) =>
	event.button === 0 &&
	!event.metaKey &&
	!event.ctrlKey &&
	!event.shiftKey &&
	!event.altKey;

type Props = {
	/** Section hash, e.g. `#atelier-section`. */
	hash: string;
	className?: string;
	children: React.ReactNode;
	/** Runs after the click is handled — used to close a mobile panel. */
	onNavigate?: () => void;
};

/**
 * A link to one of the landing page's sections, shared by both headers and the
 * footer so all three behave identically.
 *
 * On the page that owns the sections it scrolls smoothly and leaves the URL
 * untouched — no `#section` appended, no jump.
 *
 * From a subpage it stays an ordinary cross-page link: the hash is what carries
 * the target through the navigation. Handing it over through `sessionStorage`
 * instead was tried and landed at the top of the page rather than the section.
 */
const ScrollLink = ({ hash, className, children, onNavigate }: Props) => {
	const pathname = usePathname();
	const { scrollTo } = useScrollTo();

	if (pathname !== '/') {
		return (
			<Link href={`/${hash}`} className={className} onClick={onNavigate}>
				{children}
			</Link>
		);
	}

	return (
		// Still a real href: without JS the browser falls back to its own jump.
		<a
			href={hash}
			className={className}
			onClick={event => {
				if (!isPlainClick(event)) return;
				event.preventDefault();
				scrollTo(hash);
				onNavigate?.();
			}}
		>
			{children}
		</a>
	);
};

export default ScrollLink;
