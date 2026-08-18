import { expect, type Page } from '@playwright/test';

/** Below 768px the menu is collapsed, so anything inside it needs the hamburger opened first. */
export async function openNav(page: Page) {
	const hamburger = page.locator('#hamburger');
	if (await hamburger.isVisible()) {
		await hamburger.click();
		await expect(page.locator('#nav-menu')).toHaveClass(/show/);
	}
}
