/**
 * 🛍️ MercadoLibre E-commerce Tests
 * Test suite for validating search functionality on MercadoLibre México
 */

import { test, expect } from '@playwright/test';

test('🔍 Search for iPhone 15 on MercadoLibre México', async ({ page }) => {
  // 🏠 Navigate to homepage
  console.log('📱 Starting MercadoLibre iPhone search test...');
  await page.goto('https://www.mercadolibre.com.mx');
  await page.screenshot({ path: 'test-results/ml-homepage.png' });

  // ✅ Verify landing page
  console.log('🔎 Verifying homepage title...');
  await expect(page).toHaveTitle(/Mercado Libre México/i);

  // 🔍 Perform search
  console.log('🔤 Entering search term: iPhone 15');
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras encontrar' }).fill('iPhone 15');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.waitForTimeout(3000); // Brief wait for loading
  await page.screenshot({ path: 'test-results/ml-search-results.png' });

  // 📱 Verify search results
  console.log('✨ Verifying product visibility...');
  const productLink = page.getByRole('link', { name: 'Apple iPhone 15 (128 GB) - Rosa - Distribuidor Autorizado' });
  await expect(productLink).toBeVisible();
  
  console.log('✅ Test completed successfully!');
});