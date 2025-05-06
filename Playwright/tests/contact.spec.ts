import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Pages/contact.html');
});

test('Page should have correct title', async ({ page }) => {
  await expect(page).toHaveTitle('Contact Us - MySite');
});

test('Navbar should have 4 navigation links', async ({ page }) => {
  await expect(page.locator('nav .nav-link')).toHaveCount(4);
});

test('Main heading should be "Contact Us"', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
});

test('Contact form should contain 3 fields', async ({ page }) => {
  const formFields = page.locator('form .form-control');
  await expect(formFields).toHaveCount(3);
});

test('Send button should be enabled', async ({ page }) => {
  const sendButton = page.locator('button[type="submit"]');
  await expect(sendButton).toBeEnabled();
});


test('Email field should accept valid email input', async ({ page }) => {
    const emailField = page.locator('input[type="email"]');
    await emailField.fill('test@example.com');
    await expect(emailField).toHaveValue('test@example.com');
  });
  