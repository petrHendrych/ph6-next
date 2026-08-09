import React from 'react';

/**
 * One `application/ld+json` block. The payload is built on the server from
 * `src/data.ts`, never from user input, and `<` is escaped so a stray sequence
 * in the copy cannot close the script tag early.
 */
const JsonLd = ({ data }: { data: object }) => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(data).replace(/</g, '\\u003c')
		}}
	/>
);

export default JsonLd;
