import React from 'react';

type WordmarkProps = {
	/** Size and colour utilities. The mark inherits everything else. */
	className?: string;
};

/**
 * The PH6 lettermark, set as type rather than shipped as a bitmap: it stays
 * crisp at every size, costs no image request, and takes its colour from the
 * surface it sits on — near-black in the header, white in the footer.
 *
 * The negative right margin cancels the trailing letter-space that `0.42em`
 * tracking adds after the final glyph, so the mark aligns with the gutter
 * instead of sitting a third of a character inside it.
 */
const Wordmark = ({ className = '' }: WordmarkProps) => (
	<span
		className={`-mr-[0.42em] block leading-none tracking-[0.42em] ${className}`}
	>
		PH6
	</span>
);

export default Wordmark;
