import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openNav } from './nav';

const routes = ['/', '/about/', '/projects/', '/projects/enigma-vhdl/', '/es/', '/es/about/', '/es/projects/', '/es/projects/enigma-vhdl/'];

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
