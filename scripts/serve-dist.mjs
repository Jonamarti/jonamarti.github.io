import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

// The tests get their own server instead of `astro preview`, which keeps a project wide
// lock file and refuses to start when another Astro server is already up.

const root = 'dist';
const port = Number(process.argv[2] ?? 4325);

const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.avif': 'image/avif',
	'.ico': 'image/x-icon',
	'.webmanifest': 'application/manifest+json',
};

function resolve(pathname) {
	const relative = normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
	if (relative.startsWith('..')) return null;

	const direct = join(root, relative);
	if (existsSync(direct) && statSync(direct).isFile()) return direct;

	const index = join(direct, 'index.html');
	if (existsSync(index)) return index;

	return null;
}

createServer((request, response) => {
	const { pathname } = new URL(request.url, `http://localhost:${port}`);
	const file = resolve(pathname);

	if (!file) {
		const notFound = join(root, '404.html');
		response.writeHead(404, { 'content-type': types['.html'] });
		if (existsSync(notFound)) {
			createReadStream(notFound).pipe(response);
		} else {
			response.end('Not found');
		}
		return;
	}

	response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
	createReadStream(file).pipe(response);
}).listen(port, () => {
	console.log(`Serving ${root}/ on http://localhost:${port}`);
});
