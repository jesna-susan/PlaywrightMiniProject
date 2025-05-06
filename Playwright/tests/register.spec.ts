import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('register.html');
});

test('Page should load and display heading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
});

test('All input fields should be visible', async ({ page }) => {
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#phone')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
});

test('Create Account button should be visible and enabled', async ({ page }) => {
  const createBtn = page.getByRole('button', { name: 'Create Account' });
  await expect(createBtn).toBeVisible();
  await expect(createBtn).toBeEnabled();
});

test('Form should show success message on valid submission', async ({ page }) => {
  await page.fill('#email', 'test@example.com');
  await page.fill('#username', 'testuser');
  await page.fill('#phone', '9876543210');
  await page.fill('#password', 'password123');
  await page.click('button:has-text("Create Account")');

  await expect(page.locator('#successMessage')).toBeVisible();
  await expect(page.locator('#successMessage')).toHaveText('Successfully registered!');
});

test('Form should prevent submission with empty fields', async ({ page }) => {
  await page.click('button:has-text("Create Account")');
  await expect(page.locator('#successMessage')).toHaveClass(/d-none/); // Still hidden
});

test('Phone number should be validated for numeric pattern on submit', async ({ page }) => {
    await page.fill('#phone', 'abcde');
    await page.fill('#email', 'a@a.com');
    await page.fill('#username', 'abc');
    await page.fill('#password', 'pass');
  
    await page.click('button:has-text("Create Account")');
    const successMessage = await page.locator('#successMessage');
    await expect(successMessage).toHaveClass(/d-none/); // Should remain hidden
  });
  
