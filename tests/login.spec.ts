import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

test('login passed', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const login = new LoginPage(page);
  await login.logincredenciales('locked_out_user', 'secret_sauce');
  await login.clickLoginButton();
  expect(await page.screenshot()).toMatchSnapshot('login_passed.png');
  await page.close();


});

test('login failed', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const login = new LoginPage(page);
  await login.logincredenciales('locked_out_user', 'secr');
  await login.clickLoginButton();
  expect(await page.screenshot()).toMatchSnapshot('login_failed.png');
  await page.close();


});

test('login warning', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  const login = new LoginPage(page);
  await login.logincredenciales('locked_out_user', 'secret_sauc');
  await login.clickLoginButton();
  expect(await page.screenshot()).toMatchSnapshot('login warning.png');
  await page.close();


});


