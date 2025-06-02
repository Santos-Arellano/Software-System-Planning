// tests/weather-mock.spec.js
import { test, expect } from '@playwright/test';

test.describe('Weather App API Mocking', () => {
  test('should mock successful weather API request for Paris', async ({ page }) => {
    // Mock ANTES de navegar
    await page.route('**/api/weather**', async (route) => {
      const url = route.request().url();
      console.log('Weather API intercepted:', url);
      
      if (url.includes('city=Paris') || url.includes('city=paris')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            city: 'Paris',
            temperature: 22,
            condition: 'Sunny'
          })
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('http://127.0.0.1:5500/html-files/weather.html');
    
    // Usar selectores más específicos
    await expect(page.locator('#cityInput')).toBeVisible();
    await page.fill('#cityInput', 'Paris');
    await page.click('button:has-text("Search Weather")');

    // Verificar resultado
    await expect(page.locator('#result')).toContainText('Weather in Paris', { timeout: 10000 });
    await expect(page.locator('#result')).toContainText('Temperature: 22°C');
    await expect(page.locator('#result')).toContainText('Condition: Sunny');
  });

  test('should mock 500 Internal Server Error', async ({ page }) => {
    await page.route('**/api/weather**', async (route) => {
      console.log('Mocking 500 error');
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await page.goto('http://127.0.0.1:5500/html-files/weather.html');
    
    await page.fill('#cityInput', 'London');
    await page.click('button:has-text("Search Weather")');

    await expect(page.locator('#result')).toContainText('Error loading weather data', { timeout: 10000 });
  });

  test('should handle empty city input gracefully', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/html-files/weather.html');
    
    await page.click('button:has-text("Search Weather")');
    await expect(page.locator('#result')).toContainText('Please enter a city name');
  });
});
