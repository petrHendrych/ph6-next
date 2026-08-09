'use client';
import { usePendingScroll } from '@/hooks/usePendingScroll';

/** Renders nothing — consumes the `#section` a subpage `ScrollLink` left in the
 *  URL, seating the section below the fixed header and stripping the hash. */
const PendingScroll = () => {
	usePendingScroll();
	return null;
};

export default PendingScroll;
