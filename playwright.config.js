import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  // Retry failed tests 2 times on CI
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  // Professional reporting
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['github']  // shows annotations directly on GitHub Actions
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://playwright.dev',
    trace: 'on-first-retry',      // capture trace on retry
    screenshot: 'only-on-failure', // screenshot on failure
    video: 'on-first-retry',       // video on retry
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});