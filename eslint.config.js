import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
	{ ignores: ['dist/', '.astro/', '.lighthouseci/', 'playwright-report/', 'test-results/'] },
	js.configs.recommended,
	...ts.configs.recommended,
	...astro.configs['flat/recommended'],
	{
		files: ['**/*.mjs', '*.config.js', 'scripts/**'],
		languageOptions: { globals: globals.node },
	},
	{
		files: ['**/*.astro/*.ts', '**/*.astro/*.js'],
		languageOptions: { globals: globals.browser },
	},
];
