import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

/**
 * Leer variables de entorno del archivo.
 * Se puede especificar el ambiente con: npx playwright test --config playwright.config.ts
 * O mediante variable de entorno: ENVIRONMENT=qa npx playwright test
 */

// Determinar el ambiente
const environment = process.env.ENVIRONMENT || 'dev';
const envFile = path.resolve(__dirname, `.env.${environment}`);

console.log(`\n📋 Cargando configuración para ambiente: ${environment}`);
console.log(`📂 Archivo de configuración: ${envFile}\n`);

dotenv.config({
  path: envFile 
});

// Configuración por defecto si no se encuentra el archivo específico
dotenv.config({
  path: path.resolve(__dirname, '.env') 
});

/**
 * Limpiar carpeta de evidencias antes de ejecutar las pruebas
 */
function cleanEvidenciasOnStart(): void {
  const evidenciasDir = path.resolve(__dirname, 'evidencias');
  
  try {
    if (fs.existsSync(evidenciasDir)) {
      const files = fs.readdirSync(evidenciasDir);
      
      for (const file of files) {
        const filePath = path.join(evidenciasDir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
      console.log(`🧹 Carpeta de evidencias limpiada\n`);
    } else {
      // Crear la carpeta si no existe
      fs.mkdirSync(evidenciasDir, { recursive: true });
      console.log(`📁 Carpeta de evidencias creada\n`);
    }
  } catch (error) {
    console.error(`⚠️ Error al limpiar evidencias:`, error);
  }
}

// Ejecutar limpieza de evidencias
cleanEvidenciasOnStart();
/*
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }, */
   /*  {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
