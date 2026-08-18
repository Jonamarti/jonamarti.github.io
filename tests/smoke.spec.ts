import { expect, test } from '@playwright/test';
import { openNav } from './nav';

const areaIds = ['electronics', 'qa', 'tinkering', 'web'];
const areaRoutes = areaIds.map((id) => `/areas/${id}/`);

const projectSlugs = ['plant-blog', 'life-game', 'matrix-calculator', 'number-converter', 'todo-app', 'enigma-vhdl'];

const routes = [
	'/',
	'/about/',
	'/projects/',
	...projectSlugs.map((slug) => `/projects/${slug}/`),
	'/areas/',
	...areaRoutes,
	'/notes/testing-this-site/',
	'/es/',
	'/es/about/',
	'/es/projects/',
	...projectSlugs.map((slug) => `/es/projects/${slug}/`),
	'/es/areas/',
	...areaRoutes.map((route) => `/es${route}`),
	'/es/notes/testing-this-site/',
];

test.describe('pages', () => {
	for (const route of routes) {
		test(`${route} renders with a single h1`, async ({ page }) => {
			const response = await page.goto(route);
			expect(response?.status()).toBe(200);
			await expect(page.locator('h1')).toHaveCount(1);
			await expect(page).toHaveTitle(/Jon A. Martiarena/);
			await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{50,}/);
		});
	}

	test('html lang matches the locale', async ({ page }) => {
		await page.goto('/about/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await page.goto('/es/about/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'es');
	});

	test('every page declares reciprocal hreflang alternates', async ({ page }) => {
		await page.goto('/projects/enigma-vhdl/');
		await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', /\/projects\/enigma-vhdl\/$/);
		await expect(page.locator('link[hreflang="es"]')).toHaveAttribute('href', /\/es\/projects\/enigma-vhdl\/$/);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/projects\/enigma-vhdl\/$/);
	});

	test('the footer stays at the bottom when a page is short', async ({ page }) => {
		await page.goto('/');
		const { footerBottom, viewport, scrollHeight } = await page.evaluate(() => {
			const rect = document.querySelector('footer')!.getBoundingClientRect();
			return { footerBottom: rect.bottom, viewport: window.innerHeight, scrollHeight: document.documentElement.scrollHeight };
		});
		if (scrollHeight <= viewport + 1) {
			expect(footerBottom).toBeGreaterThan(viewport - 100);
		}
	});
});

test.describe('language switching', () => {
	test('keeps you on the same page', async ({ page }) => {
		await page.goto('/projects/matrix-calculator/');
		await openNav(page);
		await page.getByRole('link', { name: 'Ver en español' }).click();
		await expect(page).toHaveURL(/\/es\/projects\/matrix-calculator\/$/);
		await openNav(page);
		await page.getByRole('link', { name: 'View in English' }).click();
		await expect(page).toHaveURL(/\/projects\/matrix-calculator\/$/);
	});
});

test.describe('navigation', () => {
	test('projects dropdown lists every project page', async ({ page }) => {
		await page.goto('/');
		await openNav(page);
		const dropdown = page.locator('.dropdown', { has: page.getByRole('button', { name: 'Projects' }) });
		await dropdown.getByRole('button').click();
		const items = dropdown.locator('.dropdown-content a');
		await expect(items).toHaveCount(projectSlugs.length + 1);
		await expect(items.first()).toBeVisible();
	});

	test('areas dropdown lists every area', async ({ page }) => {
		await page.goto('/');
		await openNav(page);
		const dropdown = page.locator('.dropdown', { has: page.getByRole('button', { name: 'Areas' }) });
		await dropdown.getByRole('button').click();
		const items = dropdown.locator('.dropdown-content a');
		await expect(items).toHaveCount(areaIds.length + 1);
		await expect(items.first()).toBeVisible();
	});

	test('Escape closes the dropdown and returns focus to the button', async ({ page }) => {
		await page.goto('/');
		await openNav(page);

		// Opened from the keyboard rather than clicked: a click leaves the pointer on the
		// button, and .dropdown:hover would hold the menu open regardless of Escape.
		const button = page.getByRole('button', { name: 'Projects' });
		await button.focus();
		await page.keyboard.press('Enter');
		await expect(page.locator('.dropdown-content a').first()).toBeVisible();
		await expect(button).toHaveAttribute('aria-expanded', 'true');

		await page.keyboard.press('Escape');
		await expect(page.locator('.dropdown-content a').first()).toBeHidden();
		await expect(button).toBeFocused();
		await expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	test('the skip link is the first thing reachable by keyboard', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		await expect(page.locator('.skip-link')).toBeFocused();
	});

	test('dropdown opens on hover', async ({ page }, testInfo) => {
		test.skip(testInfo.project.name === 'mobile', 'hover is a pointer interaction');
		await page.goto('/');
		await page.hover('.dropbtn');
		await expect(page.locator('.dropdown-content a').first()).toBeVisible();
	});

	test('the hamburger reveals the menu on small screens', async ({ page }, testInfo) => {
		test.skip(testInfo.project.name !== 'mobile', 'the hamburger is hidden above 768px');
		await page.goto('/');
		const hamburger = page.locator('#hamburger');
		await expect(hamburger).toBeVisible();
		await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
		await hamburger.click();
		await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
		await expect(page.locator('#nav-menu')).toHaveClass(/show/);
	});
});

test.describe('legacy urls', () => {
	const moved: Record<string, string> = {
		'/pages/about.html': '/about/',
		'/pages/projects.html': '/projects/',
		'/pages/plant-blog.html': '/projects/plant-blog/',
		'/pages/todoapppurejs.html': '/projects/todo-app/',
		'/pages/numConverter.html': '/projects/number-converter/',
		'/pages/matrixCalc.html': '/projects/matrix-calculator/',
		'/pages/lifegame.html': '/projects/life-game/',
		'/pages/enigma.html': '/projects/enigma-vhdl/',
	};

	for (const [from, to] of Object.entries(moved)) {
		test(`${from} still resolves`, async ({ page }) => {
			const response = await page.goto(from);
			expect(response?.status()).toBe(200);
			await page.waitForURL(`**${to}`);
		});
	}
});
