import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('home.html?'); 
  });

  test('Navbar links are visible and correct', async ({ page }) => {
    const navLinks = ['Home', 'Services', 'Contact', 'About'];
    for (const linkText of navLinks) {
      await expect(page.getByRole('link', { name: linkText })).toBeVisible();
    }
  });

  test('Main header and welcome text are present', async ({ page }) => {

  
    // Check for the main header
    await expect(page.getByRole('heading', { name: 'InternHub' })).toBeVisible();
  
    // Check for the styled welcome message
    await expect(page.getByRole('heading', { name: /Welcome to Intern Hub 🚀/ })).toBeVisible();
  
    // Check for the lead paragraph
    await expect(page.locator('text=Your one-stop destination to discover, apply, and grow')).toBeVisible();
  });

  test('Survey form contains all required fields', async ({ page }) => {
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Age')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
  });

  test('Interest checkboxes and work mode dropdown exist', async ({ page }) => {
    const checkboxes = ['Development', 'Design', 'Testing'];
    for (const box of checkboxes) {
      await expect(page.getByLabel(box)).toBeVisible();
    }
    await expect(page.locator('select')).toBeVisible();
  });

  test('Submit button is visible and enabled', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: 'Submit Survey' });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });


    test('Learn More button should be visible and open About page in new tab', async ({ page, context }) => {
    const learnMoreButton = page.locator('button:has-text("Learn More")');
    await expect(learnMoreButton).toBeVisible();

    // Wait for a new page (tab) to open after clicking the button
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        learnMoreButton.click()
    ]);

    // Ensure the new page has fully loaded
    await newPage.waitForLoadState();

    // Check if the new page URL ends with 'about.html'
    await expect(newPage).toHaveURL(/about\.html$/);
    });



});
