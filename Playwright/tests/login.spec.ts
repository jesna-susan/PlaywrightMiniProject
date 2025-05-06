// playwright-tests.spec.ts
import { test, expect } from '@playwright/test';

// LOGIN PAGE TESTS

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/Pages/index.html'); // Make sure baseURL is set in playwright.config.ts
  });

  test('Page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Login - MySite');
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

  test('Login button should submit form and redirect', async ({ page }) => {
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://127.0.0.1:5500/Pages/home.html?');
  });
  

});


/*// HOME PAGE TESTS
test.describe('Home Page', () => {
  test('Home page loads with welcome text', async ({ page }) => {
    await page.goto('/home.html');
    await expect(page.locator('text=Welcome to MySite')).toBeVisible();
  });

  test('Survey form is present', async ({ page }) => {
    await page.goto('/home.html');
    await expect(page.locator('form')).toBeVisible();
  });

  test('User can fill and submit survey', async ({ page }) => {
    await page.goto('/home.html');
    await page.fill('#name', 'Jane Doe');
    await page.fill('#age', '25');
    await page.fill('#email', 'jane@example.com');
    await page.check('#dev');
    await page.selectOption('select', 'remote');
    await page.fill('textarea', 'I want to join to learn.');
    await page.click('button[type="submit"]');
  });

  test('Navigation bar links exist', async ({ page }) => {
    await page.goto('/home.html');
    await expect(page.locator('a[href="services.html"]')).toBeVisible();
    await expect(page.locator('a[href="contact.html"]')).toBeVisible();
    await expect(page.locator('a[href="about.html"]')).toBeVisible();
  });

  test('Footer should be visible', async ({ page }) => {
    await page.goto('/home.html');
    await expect(page.locator('footer')).toBeVisible();
  });
});

// SERVICES PAGE TESTS
test.describe('Services Page', () => {
  test('Services page loads', async ({ page }) => {
    await page.goto('/services.html');
    await expect(page.locator('h1')).toContainText('Services');
  });

  test('Service sections are displayed', async ({ page }) => {
    await page.goto('/services.html');
    await expect(page.locator('.card')).toHaveCount(3);
  });

  test('Clicking a service does not break page', async ({ page }) => {
    await page.goto('/services.html');
    await page.click('.card button');
  });

  test('Navbar works from services', async ({ page }) => {
    await page.goto('/services.html');
    await page.click('a[href="home.html"]');
    await expect(page).toHaveURL('/home.html');
  });

  test('Footer is visible on services', async ({ page }) => {
    await page.goto('/services.html');
    await expect(page.locator('footer')).toBeVisible();
  });
});

// CONTACT PAGE TESTS
test.describe('Contact Page', () => {
  test('Contact form is visible', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator('form')).toBeVisible();
  });

  test('User can input contact details', async ({ page }) => {
    await page.goto('/contact.html');
    await page.fill('#name', 'Supporter');
    await page.fill('#email', 'support@example.com');
    await page.fill('textarea', 'Need assistance.');
  });

  test('Submit button is enabled', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('Navigation works from contact', async ({ page }) => {
    await page.goto('/contact.html');
    await page.click('a[href="about.html"]');
    await expect(page).toHaveURL('/about.html');
  });

  test('Footer is present', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator('footer')).toBeVisible();
  });
});

// ABOUT PAGE TESTS
test.describe('About Page', () => {
  test('About page loads correctly', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('h1')).toContainText('About');
  });

  test('Content paragraph exists', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('p')).toHaveCount(1);
  });

  test('Back to home link works', async ({ page }) => {
    await page.goto('/about.html');
    await page.click('a[href="home.html"]');
    await expect(page).toHaveURL('/home.html');
  });

  test('Drawer/nav toggler is present', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('.navbar-toggler')).toBeVisible();
  });

  test('Footer should show up', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('footer')).toBeVisible();
  });
});*/
