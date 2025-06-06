import { test, expect } from '@playwright/test';

test.describe('🔒 GitHub Login Security Tests', () => {
  // Setup: Navigate to login page before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://github.com/login');
  });

  // Test data: Invalid user credentials
  const testUsers = [
    {
      username: 'usuario_fake_1@test.com',
      password: 'PassInvalido1!',
      expectedError: 'Incorrect username or password'
    },
    {
      username: 'user_inexistente@test.mx',
      password: '12345678',
      expectedError: 'Incorrect username or password'
    }
  ];

  // Parameterized test cases
  for (const testUser of testUsers) {
    test(`🔐 Login Security Check: Invalid credentials for ${testUser.username}`, async ({ page }) => {
      // 2️⃣ Fill login form
      console.log('📝 Filling login credentials...');
      const loginForm = {
        username: page.locator('#login_field'),
        password: page.locator('#password'),
        submitButton: page.locator('input[name="commit"]')
      };

      await loginForm.username.fill(testUser.username);
      await loginForm.password.fill(testUser.password);
      
      // 3️⃣ Submit form
      console.log('🚀 Submitting login form...');
      await loginForm.submitButton.click();

      // 4️⃣ Validate error message
      console.log('🔍 Checking for error message...');
      const errorBanner = page.locator('#js-flash-container .flash-error');
      
      await expect(errorBanner).toBeVisible({
        timeout: 10000,
        message: '⚠️ Error message should be displayed for invalid login'
      });

      const actualError = await errorBanner.textContent();
      expect(actualError).toContain(testUser.expectedError, '❌ Expected error message not found');
      
      console.log('✅ Test completed successfully!');
    });
  }
});