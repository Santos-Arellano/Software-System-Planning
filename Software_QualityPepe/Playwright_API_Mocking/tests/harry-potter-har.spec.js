// tests/harry-potter-har.spec.js
import { test, expect } from '@playwright/test';

test.describe('Harry Potter Characters - HAR File Mocking', () => {
  
  test('should record HAR file', async ({ page }) => {
    // Usar mock directo para demostrar concepto HAR
    await page.route('**/api/characters', async (route) => {
      console.log('HAR example - mocking characters');
      
      const characters = [
        {
          name: "Harry Potter",
          house: "Gryffindor",
          species: "Human",
          ancestry: "half-blood"
        },
        {
          name: "Hermione Granger",
          house: "Gryffindor",
          species: "Human",
          ancestry: "muggleborn"
        },
        {
          name: "Santos",
          house: "Ravenclaw",
          species: "Human",
          ancestry: "muggle-born"
        }
      ];
      
      await route.fulfill({ 
        json: characters,
        headers: { 'Content-Type': 'application/json' }
      });
    });

    await page.goto('http://127.0.0.1:5500/html-files/harry-potter-list.html');
    await page.click('button:has-text("Load Characters")');
    
    await expect(page.locator('.character')).toHaveCount(3, { timeout: 10000 });
    await expect(page.locator('.character:has-text("Santos")')).toBeVisible();
    await expect(page.locator('.character:has-text("Ravenclaw")')).toBeVisible();
  });
});
