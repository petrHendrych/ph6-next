import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import preferArrow from 'eslint-plugin-prefer-arrow';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// `eslint-config-next` already registers the react, react-hooks, import,
// jsx-a11y and @typescript-eslint plugins. Re-registering any of them is a
// hard config error, so the recommended typescript-eslint rules are lifted out
// of its configs and applied against next's plugin instance instead.
const typescriptRecommendedRules = Object.assign(
	{},
	...tseslint.configs.recommended.map(config => config.rules ?? {})
);

const config = [
	{
		ignores: ['.next/**', 'next-env.d.ts', '**/*.md', '**/*.html']
	},
	js.configs.recommended,
	...nextCoreWebVitals,
	prettierConfig,
	{
		files: ['**/*.{js,mjs,cjs,ts,tsx}'],
		plugins: {
			'prefer-arrow': preferArrow,
			'prettier': prettierPlugin
		},
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				ecmaFeatures: { jsx: true },
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				sourceType: 'module',
				ecmaVersion: 'latest'
			}
		},
		settings: {
			'react': { version: 'detect' },
			'import/resolver': {
				typescript: {
					extensionAlias: {
						'.js': ['.ts', '.tsx', '.d.ts', '.js'],
						'.jsx': ['.tsx', '.d.ts', '.jsx'],
						'.cjs': ['.cts', '.d.cts', '.cjs'],
						'.mjs': ['.mts', '.d.mts', '.mjs']
					}
				}
			}
		},
		rules: {
			'prettier/prettier': 'error',
			// Turn off prettier related
			'indent': 'off',
			'quotes': 'off',
			'linebreak-style': 'off',
			'semi': 'off',
			// General
			'no-template-curly-in-string': 'error',
			'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
			'no-var': 'error',
			'no-useless-rename': 'error',
			'object-shorthand': ['error', 'always'],
			'comma-dangle': ['error', 'never'],
			'arrow-body-style': ['error', 'as-needed'],
			'eqeqeq': ['error', 'always'],
			'dot-notation': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',
			'prefer-arrow/prefer-arrow-functions': 'error',
			// React
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function'
				}
			],
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': 'error',
			'react/jsx-boolean-value': ['error', 'never'],
			'react/jsx-curly-brace-presence': ['error', 'never'],
			'react/jsx-curly-spacing': ['error', 'never'],
			'react/jsx-equals-spacing': ['error', 'never'],
			'react/jsx-fragments': ['error', 'syntax'],
			'react/jsx-no-useless-fragment': 'error',
			'react/display-name': 'off',
			// Import
			'import/order': [
				'error',
				{
					'newlines-between': 'always',
					'groups': [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index'
					]
				}
			]
		}
	},
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			...typescriptRecommendedRules,
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'@typescript-eslint/prefer-optional-chain': 'error',
			'@typescript-eslint/prefer-nullish-coalescing': 'error',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
			],
			'@typescript-eslint/consistent-type-imports': [
				'warn',
				{ prefer: 'type-imports', fixStyle: 'inline-type-imports' }
			]
		}
	},
	{
		files: ['**/*.tsx'],
		rules: { 'react/prop-types': 'off' }
	}
];

export default config;
