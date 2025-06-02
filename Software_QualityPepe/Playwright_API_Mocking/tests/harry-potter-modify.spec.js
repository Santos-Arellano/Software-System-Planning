// tests/harry-potter-modify.spec.js
import { test, expect } from '@playwright/test';

test.describe('Harry Potter Characters - API Response Modification', () => {
  test('should modify API response to add custom character and remove one', async ({ page }) => {
    await page.route('**/api/characters', async (route) => {
      console.log('Characters API intercepted');
      
      const modifiedCharacters = [
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
          name: "Santos", // Tu nombre
          house: "Ravenclaw", // Tu casa
          species: "Human",
          ancestry: "muggle-born"
        }
        // Ron Weasley removido
      ];

      await route.fulfill({ 
        json: modifiedCharacters,
        headers: { 'Content-Type': 'application/json' }
      });
    });

    await page.goto('http://127.0.0.1:5500/html-files/harry-potter-list.html');
    
    await expect(page.locator('button:has-text("Load Characters")')).toBeVisible();
    await page.click('button:has-text("Load Characters")');

    // Esperar que aparezcan los elementos
    await expect(page.locator('.character')).toHaveCount(3, { timeout: 10000 });
    await expect(page.locator('.character:has-text("Santos")')).toBeVisible();
    await expect(page.locator('.character:has-text("Ravenclaw")')).toBeVisible();
    await expect(page.locator('.character:has-text("Ron Weasley")')).not.toBeVisible();
  });
});
