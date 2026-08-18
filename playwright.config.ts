import { defineConfig, devices } from '@playwright/test';

// Deliberately not 4321: the tests must hit the built site, never a dev server
// that happens to be running.
const port = 4325;

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : [['list']],
	use: {
		baseURL: `http://localhost:${port}`,
		trace: 'on-first-retry',
	},
	projects: [
		{ name: 'desktop', use: { ...devices['Desktop Chrome'] } },
		{ name: 'mobile', use: { ...devices['Pixel 5'] } },
	],
	webServer: {
		command: `node scripts/serve-dist.mjs ${port}`,
		url: `http://localhost:${port}`,
		reuseExistingServer: false,
	},
});
