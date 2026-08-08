'use client';
import { usePendingScroll } from '@/hooks/usePendingScroll';

/**
 * Renders nothing. Consumes the `#section` a `ScrollLink` on a subpage put in
 * the URL, so the reader lands on that section with a clean URL.
 */
const PendingScroll = () => {
	usePendingScroll();
	return null;
};

export default PendingScroll;
