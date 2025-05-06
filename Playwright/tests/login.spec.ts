import { test, expect } from '@playwright/test';

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('index.html'); 
  });

  test('Page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Login - InternHub');
  });

  test('Username and Password fields are visible', async ({ page }) => {
    await expect(page.getByLabel('Username')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('Submit button is visible and enabled', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: 'Login' });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test('Form validation - empty fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    // Check that it doesn't navigate away
    await expect(page).toHaveURL('http://127.0.0.1:5500/Pages/index.html');
  });

  test('Login form submits and navigates', async ({ page }) => {
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://127.0.0.1:5500/Pages/home.html?');
  });

  
  

});


