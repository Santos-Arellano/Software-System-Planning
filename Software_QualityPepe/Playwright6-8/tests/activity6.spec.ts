import { test, expect } from '@playwright/test';

test.describe('Actividad 6 - Pruebas de Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file:///Users/santosa/Documents/GitHub/Software-System-Planning/Software_QualityPepe/Playwright6-8/test-isolation/login.html');
  });

  test('debería iniciar sesión y verificar el estado de admin y localStorage', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Logged in as admin' })).toBeVisible();
    const user = await page.evaluate(() => localStorage.getItem('user'));
    expect(user).toBe('admin');
  });

  test('debería verificar el estado de no logueado al cargar inicialmente', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Not logged in' })).toBeVisible();
  });
});