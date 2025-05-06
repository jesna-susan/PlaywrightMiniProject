import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/Pages/services.html');
});

test('Page should have correct title', async ({ page }) => {
  await expect(page).toHaveTitle('Services - MySite');
});

test('Navbar should have 4 navigation links', async ({ page }) => {
  await expect(page.locator('nav .nav-link')).toHaveCount(4);
});

test('Main heading should be "Our Services"', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Our Services' })).toBeVisible();
});

test('Service list should contain 4 items', async ({ page }) => {
  await expect(page.locator('ul > li')).toHaveCount(8);
});

test('Each service item should be visible and not empty', async ({ page }) => {
  const services = page.locator('ul > li');
  const count = await services.count();
  for (let i = 0; i < count; i++) {
    await expect(services.nth(i)).toBeVisible();
    const text = await services.nth(i).textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  }
});

test('Services list should display all services', async ({ page }) => {
    const servicesList = page.locator('text=Our Services').locator('xpath=following-sibling::ul[1]');
    await expect(servicesList).toContainText('Web Development');
    await expect(servicesList).toContainText('Mobile App Design');
    await expect(servicesList).toContainText('UI/UX Consulting');
    await expect(servicesList).toContainText('SEO & Marketing');
  });
  
