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
 * footer. On that page it scrolls smoothly and leaves the URL untouched; from a
 * subpage it stays an ordinary cross-page link whose hash carries the target,
 * which `PendingScroll` then consumes.
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
