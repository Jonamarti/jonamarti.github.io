import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		summary: z.string(),
		description: z.string(),
		image: image(),
		imageAlt: z.string(),
		/** Animated sources are emitted untouched; resizing them would flatten them to one frame. */
		animated: z.boolean().default(false),
		repo: z.string().url().optional(),
		demo: z.string().url().optional(),
		demoLabel: z.string().optional(),
		tags: z.array(z.string()).default([]),
		/** Wide diagrams look better scaled down on the index cards. */
		narrowImage: z.boolean().default(false),
		order: z.number(),
		/** Cards without a body of their own stay on the index and get no detail page. */
		detail: z.boolean().default(true),
		/** Wide, left aligned layout for the longer write ups. */
		longform: z.boolean().default(false),
	}),
});

export const collections = { projects };
