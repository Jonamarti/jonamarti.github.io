export default {
	extends: 'stylelint-config-standard',
	ignoreFiles: ['dist/**'],
	rules: {
		// The ids, classes and keyframes come from the pre Astro site and are referenced from
		// markup and scripts, so the camelCase ones stay until they are renamed everywhere.
		'selector-id-pattern': null,
		'selector-class-pattern': null,
		'keyframes-name-pattern': null,

		// Notation preferences, not defects: rgba() and 0.5 alphas read fine and changing them
		// would rewrite two thirds of the file for nothing.
		'color-function-notation': null,
		'color-function-alias-notation': null,
		'alpha-value-notation': null,
		'media-feature-range-notation': 'prefix',

		// Comments sit directly above the declaration they explain, and blank lines group the
		// tokens in :root.
		'comment-empty-line-before': null,
		'custom-property-empty-line-before': null,

		// flex-direction plus flex-wrap says more than flex-flow does.
		'declaration-block-no-redundant-longhand-properties': [true, { ignoreShorthands: ['flex-flow'] }],

		// Fires on legitimate ordering; the fix it asks for is usually worse than the warning.
		'no-descending-specificity': null,
	},
};
