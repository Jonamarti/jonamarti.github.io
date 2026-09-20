// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site: 'https://jonamarti.github.io',
	integrations: [sitemap()],
	// The project page was published as istqb-ctfl-practice before it covered the whole QA hub.
	redirects: {
		'/projects/istqb-ctfl-practice/': '/projects/qa-practice/',
		'/es/projects/istqb-ctfl-practice/': '/es/projects/qa-practice/',
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
