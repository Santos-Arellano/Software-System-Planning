import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000, // Reducir timeout
  fullyParallel: false, // Evitar conflictos
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1, // Solo 1 worker
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://127.0.0.1:5500',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
