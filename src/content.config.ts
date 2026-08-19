import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { areaIds } from './data/areas';

const area = z.enum(areaIds);

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
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
			areas: z.array(area).min(1),
			order: z.number(),
			/** Cards without a body of their own stay on the index and get no detail page. */
			detail: z.boolean().default(true),
			/** Interactive demo rendered inside the project page. */
			widget: z.enum(['round-timer']).optional(),
			/** Wide, left aligned layout for the longer write ups. */
			longform: z.boolean().default(false),
		}),
});

const notes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		description: z.string(),
		area: area,
		date: z.date(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { projects, notes };
