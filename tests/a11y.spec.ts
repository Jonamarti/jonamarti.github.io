import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openNav } from './nav';

const routes = [
	'/',
	'/about/',
	'/projects/',
	'/projects/enigma-vhdl/',
	'/areas/',
	'/areas/qa/',
	'/projects/round-timer/',
	'/areas/martial-arts/',
	'/notes/testing-this-site/',
	'/es/',
	'/es/about/',
	'/es/projects/',
	'/es/projects/enigma-vhdl/',
	'/es/areas/',
	'/es/areas/qa/',
	'/es/projects/round-timer/',
	'/es/notes/testing-this-site/',
];

// The background cube animates for 50s, and while a face sits over the text axe cannot work out
// the effective background, so it downgrades a contrast failure to "incomplete" and the run passes
// or fails depending on where the cube happens to be. Reduced motion parks it and makes the audit
// repeatable.
test.beforeEach(async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
});

for (const route of routes) {
	test(`${route} has no accessibility violations`, async ({ page }) => {
		await page.goto(route);
		const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

		expect(
			violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
			'axe violations'
		).toEqual([]);
	});
}

test('the open dropdown is still accessible', async ({ page }) => {
	await page.goto('/');
	await openNav(page);
	await page.getByRole('button', { name: 'Projects' }).click();
	const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
	expect(violations.map((v) => v.id)).toEqual([]);
});
