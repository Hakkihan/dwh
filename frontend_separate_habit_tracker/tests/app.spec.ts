import { test, expect } from '@playwright/test';

test.describe('Habit Tracker App - Easy Tests', () => {
  test('loads the main page and shows header', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Check page title or main header text
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/habit tracker/i);
  });

  test('habit list is empty initially', async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Assuming habit cards have test id "habit-card"
    const habitCards = await page.getByTestId('habit-card').count();
    expect(habitCards).toBe(0);
  });

  test('clicking New Habit button opens create habit modal', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: /new habit/i }).click();
    const modal = page.getByTestId('create-habit-modal');
    await expect(modal).toBeVisible();
  });

  test('modal has input placeholder for habit name', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.getByRole('button', { name: /new habit/i }).click();
    const input = page.getByTestId('create-habit-modal').getByPlaceholder('e.g., Drink 2L of water');
    await expect(input).toBeVisible();
  });
});


test.describe('Habit Tracker App', () => {
  test('opens create habit modal when clicking "New Habit"', async ({ page }) => {
    await page.goto('http://localhost:5173'); // your app URL

    // Click the "New Habit" button
    await page.getByRole('button', { name: /new habit/i }).click();

    // Wait for modal container to be visible
    const modal = page.getByTestId('create-habit-modal');
    await expect(modal).toBeVisible();

    const habitNameInput = modal.getByPlaceholder('e.g., Drink 2L of water');
    await expect(habitNameInput).toBeVisible();
  });
});


test('creates a new habit and displays it in the list', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Open the modal
  await page.getByRole('button', { name: /new habit/i }).click();

  // Wait for modal and input
  const modal = page.getByTestId('create-habit-modal');
  await expect(modal).toBeVisible();

  const habitNameInput = modal.getByPlaceholder('e.g., Drink 2L of water');
  await habitNameInput.fill('Read for 30 minutes');

  // Optionally fill description if there's an input for that (adjust selector)
  const habitDescriptionInput = modal.getByPlaceholder('Optional description');
  if (await habitDescriptionInput.isVisible()) {
    await habitDescriptionInput.fill('Improve reading habit daily');
  }

  // Click the create button inside modal
  await modal.getByRole('button', { name: /create/i }).click();

  // Modal should close
  await expect(modal).not.toBeVisible();

  // New habit card should appear with the new habit name
  await expect(page.getByText('Read for 30 minutes')).toBeVisible();
});




