import { test, expect } from '@playwright/test';

test.describe('Actividad 8 - Pruebas del Contador', () => {
  test('debería verificar la funcionalidad del contador', async ({ page }) => {
    await page.goto('file:///Users/santosa/Documents/GitHub/Software-System-Planning/Software_QualityPepe/Playwright6-8/auto-retrying/counter.html');

    await expect(page.getByTestId('testId-status')).toHaveText('Ready');
    const counter = page.getByTestId('testId-counter');
    await expect(counter).toHaveText('0');
    await page.getByTestId('testId-count-btn').click();
    await expect(counter).toHaveText('1');
    await page.getByTestId('testId-count-btn').click();
    await expect(counter).toHaveText('2');
  });
});