import { test, expect } from '@playwright/test';

test.describe('Actividad 7 - Flujo del Formulario Dinámico', () => {
  test('debería completar el flujo completo del formulario', async ({ page }) => {
    await page.goto('file:///Users/santosa/Documents/GitHub/Software-System-Planning/Software_QualityPepe/Playwright6-8/dynamic-form/dynamic-form.html');

    await page.getByRole('button', { name: 'Start Form' }).click();
    await expect(page.locator('#form')).toBeVisible();
    const nameInput = page.getByPlaceholder('Name');
    await expect(nameInput).toBeEnabled();
    await nameInput.fill('Test User');
    await expect(page.getByRole('button', { name: 'Next' })).toBeEnabled();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('#loader')).toBeVisible();
    await expect(page.locator('#options')).toBeVisible();
    await expect(page.locator('#loader')).not.toBeVisible();
    await page.locator('#options').selectOption('1');
    await expect(page.locator('#options')).toHaveValue('1');
  });
});