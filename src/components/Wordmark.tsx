import React from 'react';

type WordmarkProps = {
	/** Size and colour utilities. The mark inherits everything else. */
	className?: string;
};

/**
 * The PH6 lettermark, set as type rather than a bitmap, inheriting its colour.
 *
 * The negative right margin cancels the trailing letter-space `0.42em` tracking
 * leaves after the final glyph, so the mark aligns with the gutter.
 */
const Wordmark = ({ className = '' }: WordmarkProps) => (
	<span
		className={`-mr-[0.42em] block leading-none tracking-[0.42em] ${className}`}
	>
		PH6
	</span>
);

export default Wordmark;
