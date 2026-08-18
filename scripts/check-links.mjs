import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, posix } from 'node:path';

const dist = 'dist';

// Collected from the real directory entries rather than probed with existsSync, so a
// reference that only differs in case fails here instead of on GitHub Pages.
const files = new Set();
const pages = [];

function walk(dir, prefix = '') {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		const url = posix.join(prefix, entry.name);
		if (entry.isDirectory()) {
			walk(full, url);
		} else {
			files.add(url);
			if (entry.name.endsWith('.html')) pages.push({ full, url });
		}
	}
}

try {
	statSync(dist);
} catch {
	console.error(`No ${dist}/ directory. Run the build first.`);
	process.exit(1);
}

walk(dist);

const problems = [];
let checked = 0;

for (const page of pages) {
	const html = readFileSync(page.full, 'utf8');
	for (const match of html.matchAll(/(?:href|src)="([^"]*)"/g)) {
		const raw = match[1];
		if (!raw || /^(?:https?:|mailto:|tel:|data:|#)/.test(raw)) continue;

		const target = raw.split('#')[0].split('?')[0];
		if (!target) continue;

		if (!target.startsWith('/')) {
			problems.push(`${page.url}: relative reference "${raw}"`);
			continue;
		}

		checked++;
		const clean = target.slice(1);
		const candidates = clean === '' || clean.endsWith('/') ? [`${clean}index.html`] : [clean, `${clean}/index.html`];
		if (!candidates.some((candidate) => files.has(candidate))) {
			problems.push(`${page.url}: broken reference "${raw}"`);
		}
	}
}

if (problems.length > 0) {
	console.error(`${problems.length} problem(s) found:\n`);
	for (const problem of problems) console.error(`  ${problem}`);
	process.exit(1);
}

console.log(`${checked} internal references across ${pages.length} pages, all resolve.`);
