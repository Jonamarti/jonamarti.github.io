import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// Short phases keep the run quick; the state machine does not care about the durations.
async function configure(page: Page, values: { rounds: number; work: number; rest: number; prepare: number }) {
	await page.goto('/projects/round-timer/');
	await page.locator('input[name=sound]').uncheck();
	for (const [name, value] of Object.entries(values)) {
		await page.fill(`input[name=${name}]`, String(value));
	}
}

const phase = (page: Page) => page.locator('[data-phase]');
const clock = (page: Page) => page.locator('[data-clock]');
const round = (page: Page) => page.locator('[data-round]');

test.describe('round timer', () => {
	test('starts idle showing the round length', async ({ page }) => {
		await configure(page, { rounds: 3, work: 90, rest: 30, prepare: 5 });
		await expect(phase(page)).toHaveText('Ready');
		await expect(clock(page)).toHaveText('01:30');
	});

	test('walks prepare, round, rest, round, finished', async ({ page }) => {
		await configure(page, { rounds: 2, work: 2, rest: 2, prepare: 2 });
		await page.click('[data-toggle]');

		await expect(phase(page)).toHaveText('Get ready');
		await expect(round(page)).toHaveText('Round 1 of 2');

		await expect(phase(page)).toHaveText('Round', { timeout: 4000 });
		await expect(phase(page)).toHaveText('Rest', { timeout: 4000 });
		await expect(round(page)).toHaveText('Round 1 of 2');

		await expect(phase(page)).toHaveText('Round', { timeout: 4000 });
		await expect(round(page)).toHaveText('Round 2 of 2');

		await expect(phase(page)).toHaveText('Finished', { timeout: 4000 });
		await expect(clock(page)).toHaveText('00:00');
	});

	test('zero rest runs the rounds back to back', async ({ page }) => {
		await configure(page, { rounds: 2, work: 2, rest: 0, prepare: 0 });
		await page.click('[data-toggle]');

		await expect(phase(page)).toHaveText('Round');
		await expect(round(page)).toHaveText('Round 1 of 2');
		await expect(round(page)).toHaveText('Round 2 of 2', { timeout: 4000 });
		await expect(phase(page)).toHaveText('Finished', { timeout: 4000 });
	});

	test('pause holds the clock and resume carries on', async ({ page }) => {
		await configure(page, { rounds: 1, work: 60, rest: 0, prepare: 0 });
		await page.click('[data-toggle]');
		await expect(page.locator('[data-toggle]')).toHaveText('Pause');

		await page.waitForTimeout(1200);
		await page.click('[data-toggle]');
		await expect(page.locator('[data-toggle]')).toHaveText('Resume');

		const held = await clock(page).textContent();
		await page.waitForTimeout(1200);
		await expect(clock(page)).toHaveText(held!);

		await page.click('[data-toggle]');
		await expect(page.locator('[data-toggle]')).toHaveText('Pause');
		await expect(clock(page)).not.toHaveText(held!, { timeout: 4000 });
	});

	test('reset goes back to idle', async ({ page }) => {
		await configure(page, { rounds: 3, work: 45, rest: 15, prepare: 3 });
		await page.click('[data-toggle]');
		await expect(phase(page)).toHaveText('Get ready');

		await page.click('[data-reset]');
		await expect(phase(page)).toHaveText('Ready');
		await expect(clock(page)).toHaveText('00:45');
		await expect(page.locator('[data-toggle]')).toHaveText('Start');
	});

	test('settings survive a reload', async ({ page }) => {
		await configure(page, { rounds: 7, work: 120, rest: 45, prepare: 15 });
		await page.reload();

		await expect(page.locator('input[name=rounds]')).toHaveValue('7');
		await expect(page.locator('input[name=work]')).toHaveValue('120');
		await expect(page.locator('input[name=rest]')).toHaveValue('45');
		await expect(page.locator('input[name=sound]')).not.toBeChecked();
		await expect(clock(page)).toHaveText('02:00');
	});

	test('the spanish page drives the same machine', async ({ page }) => {
		await page.goto('/es/projects/round-timer/');
		await page.locator('input[name=sound]').uncheck();
		await page.fill('input[name=prepare]', '0');
		await page.fill('input[name=work]', '2');
		await page.fill('input[name=rounds]', '1');
		await page.click('[data-toggle]');

		await expect(phase(page)).toHaveText('Asalto');
		await expect(round(page)).toHaveText('Asalto 1 de 1');
		await expect(phase(page)).toHaveText('Terminado', { timeout: 4000 });
	});
});
