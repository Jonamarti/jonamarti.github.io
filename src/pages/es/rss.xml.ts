import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = (await getCollection('posts', ({ id }) => id.startsWith('es/'))).sort(
		(a, b) => b.data.date.getTime() - a.data.date.getTime()
	);

	return rss({
		title: 'Jon A. Martiarena',
		description: 'Entradas sobre electrónica, QA y automatización, desarrollo web y artes marciales.',
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: `/es/blog/${post.id.slice('es/'.length)}/`,
			categories: [post.data.area, ...post.data.tags].filter((category) => category !== undefined),
		})),
	});
}
