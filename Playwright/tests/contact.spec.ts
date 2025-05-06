import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Pages/contact.html');
});

test('Page should have correct title', async ({ page }) => {
  await expect(page).toHaveTitle('Contact Us - InternHub');
});

test('Phone and email are visible', async ({ page }) => {
    await expect(page.locator('text=+91 98765 43210')).toBeVisible();
    await expect(page.locator('text=support@internhub.com')).toBeVisible();
  });
  

  test('All input fields are visible', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#query')).toBeVisible();
  });
  

  test('Submit button is enabled', async ({ page }) => {
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
  

test('Submitting form shows thank-you message', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#query', 'Need help with internship options.');
    await page.click('button[type="submit"]');
    await expect(page.locator('#thankYouMessage')).toBeVisible();
  });

  test('Form fields reset after submission', async ({ page }) => {
    await page.fill('#name', 'Jane');
    await page.fill('#email', 'jane@example.com');
    await page.fill('#query', 'Just saying hi!');
    await page.click('button[type="submit"]');
  
    // Check all fields are cleared
    const name = await page.inputValue('#name');
    const email = await page.inputValue('#email');
    const query = await page.inputValue('#query');
  
    expect(name).toBe('');
    expect(email).toBe('');
    expect(query).toBe('');
  });
  
  
  