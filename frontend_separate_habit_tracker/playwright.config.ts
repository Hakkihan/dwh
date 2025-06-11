import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5173', // or your dev server port
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});