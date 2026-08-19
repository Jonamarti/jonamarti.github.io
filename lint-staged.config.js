export default {
	'*.{js,mjs,ts,astro}': ['eslint --fix', 'prettier --write'],
	'*.css': ['stylelint --fix', 'prettier --write'],
	'*.{json,md}': 'prettier --write',
	// The whole directory is linted at once, so the staged paths are not passed through.
	'.github/workflows/*.{yml,yaml}': () => 'npm run check:workflows',
};
