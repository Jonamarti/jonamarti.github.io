import { expect, test } from '@playwright/test';

const visibleCards = (page: import('@playwright/test').Page) => page.locator('.projects article:visible');

test.describe('project filter', () => {
	test('filtering by area narrows the cards down', async ({ page }) => {
		await page.goto('/projects/');
		await expect(visibleCards(page)).toHaveCount(8);

		await page.getByRole('link', { name: 'Tinkering', exact: true }).click();
		await expect(visibleCards(page)).toHaveCount(4);
		await expect(page).toHaveURL(/\?area=tinkering$/);

		await page.getByRole('link', { name: 'All', exact: true }).click();
		await expect(visibleCards(page)).toHaveCount(8);
		await expect(page).not.toHaveURL(/area=/);
	});

	test('a project in two areas shows up under both', async ({ page }) => {
		await page.goto('/projects/?area=qa');
		await expect(page.getByRole('heading', { name: 'Enigma VHDL' })).toBeVisible();

		await page.goto('/projects/?area=electronics');
		await expect(page.getByRole('heading', { name: 'Enigma VHDL' })).toBeVisible();
		await expect(visibleCards(page)).toHaveCount(1);
	});

	test('the area in the query string is applied on load', async ({ page }) => {
		await page.goto('/projects/?area=web');
		await expect(visibleCards(page)).toHaveCount(6);
		await expect(page.getByRole('link', { name: 'Web development', exact: true })).toHaveAttribute('aria-current', 'true');
	});

	test('an unknown area falls back to showing everything', async ({ page }) => {
		await page.goto('/projects/?area=nonsense');
		await expect(visibleCards(page)).toHaveCount(8);
	});

	test('the status line reports how many are shown', async ({ page }) => {
		await page.goto('/projects/?area=electronics');
		await expect(page.locator('[data-filter-status]')).toHaveText('Showing 1 of 8 projects');
	});

	test('without javascript the controls are still real links', async ({ browser }) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		await page.goto('/projects/');

		await expect(visibleCards(page)).toHaveCount(8);
		await page.getByRole('link', { name: 'Tinkering', exact: true }).click();
		await expect(page).toHaveURL(/\/areas\/tinkering\/$/);
		await expect(page.getByRole('heading', { name: 'Tinkering', level: 1 })).toBeVisible();

		await context.close();
	});

	test('project pages link back to their areas', async ({ page }) => {
		await page.goto('/projects/enigma-vhdl/');
		const badges = page.locator('.area-badges a');
		await expect(badges).toHaveCount(2);
		await badges.first().click();
		await expect(page).toHaveURL(/\/areas\/electronics\/$/);
	});

	test('the spanish filter works on the spanish routes', async ({ page }) => {
		await page.goto('/es/projects/');
		await page.getByRole('link', { name: 'Cacharreo', exact: true }).click();
		await expect(visibleCards(page)).toHaveCount(4);
		await expect(page.locator('[data-filter-status]')).toHaveText('Mostrando 4 de 8 proyectos');
	});
});
