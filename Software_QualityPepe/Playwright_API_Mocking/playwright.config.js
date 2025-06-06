// playwright.config.js - Configuración completa para todas las actividades
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000, // 2 minutos para tests más complejos
  fullyParallel: false, // Evitar conflictos entre tests
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1, // Solo 1 worker para evitar conflictos
  
  // Configuración de reportes
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    // URL base para Live Server
    baseURL: 'http://127.0.0.1:5500',
    
    // Configuración de trazas y capturas
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on', // ✅ IMPORTANTE: Activado para Actividad 2
    
    // Headers adicionales para mejorar compatibilidad
    extraHTTPHeaders: {
      'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8'
    },
    
    // Configuración de navegador
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Configuración específica para GitHub
        viewport: { width: 1280, height: 720 },
      },
    },
    
    // Proyecto específico para pruebas móviles
    {
      name: 'mobile-chrome',
      use: { 
        ...devices['Pixel 5'],
      },
    },
    
    // Proyecto para pruebas en Firefox (opcional)
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },
  ],

  // Configuración del servidor web para desarrollo
  webServer: {
    command: 'npx live-server --port=5500 --no-browser --quiet',
    port: 5500,
    reuseExistingServer: !process.env.CI,
  },
});