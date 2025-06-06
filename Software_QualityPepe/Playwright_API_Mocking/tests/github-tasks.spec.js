// tests/github-tasks.spec.js
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

test.describe('GitHub Tasks Tests - Actividad 3', () => {
  test('Add tasks and navigate in GitHub', async ({ page }) => {
    // Validar variables de entorno
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;
    
    if (!username || !token) {
      throw new Error('❌ GITHUB_USERNAME o GITHUB_TOKEN no están definidos en .env');
    }
    
    console.log(`🔐 Autenticando como: ${username}`);
    console.log(`🔑 Token: ${token.substring(0, 10)}...`);
    
    // Configurar autenticación con PAT
    const auth = Buffer.from(`${username}:${token}`).toString('base64');
    await page.setExtraHTTPHeaders({
      'Authorization': `Basic ${auth}`,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });

    // Navegar a GitHub
    console.log('🌐 Navegando a GitHub...');
    await page.goto('https://github.com');
    await page.waitForLoadState('networkidle');
    
    // Tomar captura para debug
    await page.screenshot({ path: 'test-results/01-github-home.png' });
    
    // FIX: Verificar autenticación de manera más específica
    // Buscar primero por el botón de Sign in, pero solo el primero
    const signInButton = page.locator('[href="/login"]').first();
    const isSignInVisible = await signInButton.isVisible().catch(() => false);
    
    // También verificar si hay elementos que indican que estamos autenticados
    const userAvatar = page.locator('[data-testid="header-user-avatar"], .Header-link img[alt*="@"]').first();
    const isUserAvatarVisible = await userAvatar.isVisible().catch(() => false);
    
    if (isSignInVisible && !isUserAvatarVisible) {
      await page.screenshot({ path: 'test-results/02-auth-failure.png' });
      console.log('⚠️ Autenticación mediante headers no funcionó, intentando login manual...');
      
      // Intentar login manual
      await signInButton.click();
      await page.waitForLoadState('networkidle');
      
      // Llenar formulario de login
      await page.fill('#login_field', username);
      await page.fill('#password', token);
      await page.click('input[name="commit"]');
      await page.waitForLoadState('networkidle');
      
      // Verificar si el login fue exitoso
      const loginError = page.locator('#js-flash-container .flash-error');
      if (await loginError.isVisible().catch(() => false)) {
        throw new Error('❌ Login manual fallido. Verifica credenciales.');
      }
    }
    
    console.log('✅ Autenticación exitosa');
    
    // Navegar al repositorio
    console.log('📁 Navegando al repositorio...');
    await page.goto('https://github.com/Santos-Arellano/Software-System-Planning');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/03-repo-home.png' });
    
    // Ir a Issues con un selector más robusto
    console.log('🎯 Navegando a Issues...');
    const issuesTab = page.locator('a[data-content="Issues"], a:has-text("Issues")').first();
    await issuesTab.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/04-issues-page.png' });
    
    // Crear primer Issue
    console.log('📝 Creando primer Issue...');
    const newIssueButton = page.locator('a:has-text("New issue"), [href*="/issues/new"]').first();
    await newIssueButton.click();
    await page.waitForSelector('#issue_title', { state: 'visible', timeout: 20000 });
    
    await page.fill('#issue_title', 'Tarea de prueba 3 - Playwright Test');
    await page.fill('#issue_body', 'Esta es una tarea de prueba creada con Playwright para la Actividad 3');
    
    await page.screenshot({ path: 'test-results/05-issue1-form.png' });
    
    // Enviar primer Issue
    const submitButton = page.locator('button:has-text("Submit new issue"), [data-disable-with*="Creating"]').first();
    await submitButton.click();
    await page.waitForLoadState('networkidle');
    
    // Verificar que el Issue se creó
    const issueTitle = page.locator('.js-issue-title, h1:has-text("Tarea de prueba 3")').first();
    await expect(issueTitle).toContainText('Tarea de prueba 3', { timeout: 15000 });
    await page.screenshot({ path: 'test-results/06-issue1-created.png' });
    console.log('✅ Primer Issue creado exitosamente');
    
    // Volver a Issues para crear el segundo
    const issuesTab2 = page.locator('a[data-content="Issues"], a:has-text("Issues")').first();
    await issuesTab2.click();
    await page.waitForLoadState('networkidle');
    
    // Crear segundo Issue
    console.log('📝 Creando segundo Issue...');
    const newIssueButton2 = page.locator('a:has-text("New issue"), [href*="/issues/new"]').first();
    await newIssueButton2.click();
    await page.waitForSelector('#issue_title', { state: 'visible', timeout: 20000 });
    
    await page.fill('#issue_title', 'Tarea de prueba 4 - Playwright Test');
    await page.fill('#issue_body', 'Esta es otra tarea de prueba creada con Playwright para la Actividad 3');
    
    await page.screenshot({ path: 'test-results/07-issue2-form.png' });
    
    // Enviar segundo Issue
    const submitButton2 = page.locator('button:has-text("Submit new issue"), [data-disable-with*="Creating"]').first();
    await submitButton2.click();
    await page.waitForLoadState('networkidle');
    
    // Verificar que el segundo Issue se creó
    const issueTitle2 = page.locator('.js-issue-title, h1:has-text("Tarea de prueba 4")').first();
    await expect(issueTitle2).toContainText('Tarea de prueba 4', { timeout: 15000 });
    await page.screenshot({ path: 'test-results/08-issue2-created.png' });
    console.log('✅ Segundo Issue creado exitosamente');
    
    // Navegar a Pull requests
    console.log('🔄 Navegando a Pull requests...');
    const prTab = page.locator('a[data-content="Pull requests"], a:has-text("Pull requests")').first();
    await prTab.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/09-pull-requests.png' });
    
    // Verificar que estamos en Pull requests
    await expect(page.locator('h1, h2, [data-content="Pull requests"]')).toContainText('Pull requests', { timeout: 10000 });
    console.log('✅ Navegación a Pull requests exitosa');
    
    // Navegar a Code
    console.log('💻 Navegando a Code...');
    const codeTab = page.locator('a[data-content="Code"], a:has-text("Code")').first();
    await codeTab.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/10-code-section.png' });
    
    // Verificar que estamos en Code
    const codeSection = page.locator('[data-content="Code"], .repository-content').first();
    await expect(codeSection).toBeVisible({ timeout: 10000 });
    console.log('✅ Navegación a Code exitosa');
    
    // Navegar a Settings si está disponible
    try {
      console.log('⚙️ Navegando a Settings...');
      const settingsTab = page.locator('a[data-content="Settings"], a:has-text("Settings")').first();
      if (await settingsTab.isVisible({ timeout: 5000 })) {
        await settingsTab.click();
        await page.waitForLoadState('networkidle');
        await page.screenshot({ path: 'test-results/11-settings.png' });
        console.log('✅ Navegación a Settings exitosa');
      } else {
        console.log('⚠️ Settings no disponible (puede ser un repo público)');
      }
    } catch (error) {
      console.log('⚠️ Settings no disponible (puede ser un repo público)');
    }
    
    console.log('🎉 Test completado exitosamente!');
  });
});