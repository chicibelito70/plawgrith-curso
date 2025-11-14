import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { config } from './config/environment';
import { getUser, getAllUsers, getInvalidCredentials } from './config/users';
import { takeScreenshot, saveDebugInfo } from './utils/evidencias';

test('login passed with standard user', async ({ page }) => {
  const user = getUser('standard_user');
  
  if (!user) {
    throw new Error('Usuario standard_user no encontrado');
  }

  console.log(`📝 Usando ambiente: ${config.environment}`);
  console.log(`🔑 Usuario: ${user.username} (${user.role})`);

  await page.goto(config.baseUrl);
  
  // Captura después de navegar
  await takeScreenshot(page, 'login-page-inicial', 'step');

  const login = new LoginPage(page);
  await login.logincredenciales(user.username, user.password);
  await login.clickLoginButton();
  
  // Captura después del login
  await takeScreenshot(page, 'login-exitoso', 'pass');
  
  console.log('✅ Login exitoso');
  await page.close();
});

test('login with different users', async ({ page }) => {
  const users = getAllUsers();

  for (const user of users) {
    console.log(`\n🧪 Probando con usuario: ${user.username}`);
    
    // Reabrir página para cada usuario
    const newPage = await page.context().newPage();
    await newPage.goto(config.baseUrl);

    const login = new LoginPage(newPage);
    await login.logincredenciales(user.username, user.password);
    await login.clickLoginButton();
    
    // Captura de cada usuario
    await takeScreenshot(newPage, `login-${user.username}`, 'step');
    
    console.log(`✅ ${user.username} completó el login`);
    await newPage.close();
  }
});

test('login failed with invalid credentials', async ({ page }) => {
  const invalidCreds = getInvalidCredentials();

  console.log(`⚠️ Probando con credenciales inválidas`);
  await page.goto(config.baseUrl);

  const login = new LoginPage(page);
  await login.logincredenciales(invalidCreds.username, invalidCreds.password);
  await login.clickLoginButton();

  // Capturar mensaje de error
  const errorMessage = await page.locator('[data-test="error"]').textContent();
  console.log(`❌ Mensaje de error: ${errorMessage}`);
  
  // Captura del error
  await takeScreenshot(page, 'login-error-invalido', 'fail');
  await saveDebugInfo(page, 'login-error-invalido');
  
  await page.close();
});


