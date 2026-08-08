/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	singleQuote: true,
	quoteProps: 'consistent',
	trailingComma: 'none',
	arrowParens: 'avoid',
	endOfLine: 'auto',
	plugins: ['prettier-plugin-tailwindcss']
};

export default config;
