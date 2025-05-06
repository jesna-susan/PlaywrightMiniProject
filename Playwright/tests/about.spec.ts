import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/Pages/about.html');
  });

  test('Navbar contains correct links', async ({ page }) => {
    const navLinks = ['Home', 'Services', 'Contact', 'About'];
    for (const link of navLinks) {
      await expect(page.getByRole('link', { name: link })).toBeVisible();
    }
  });

  test('Navbar brand is visible and labeled correctly', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'InternHub' })).toBeVisible();
  });

  test('Page title should be About Us - InternHub', async ({ page }) => {
    await expect(page).toHaveTitle('About Us - InternHub');
  });
  
  test('About page should display main heading and testimonials section', async ({ page }) => {
  
    // Check that the main heading is visible
    const mainHeading = page.getByRole('heading', { name: 'About InternHub' });
    await expect(mainHeading).toBeVisible();
  
    // Check that the testimonials section is present
    const testimonialSection = page.locator('text=Student Testimonials');
    await expect(testimonialSection).toBeVisible();
  });
  
  
  test('Navbar collapse div should have correct ID for toggle button to target', async ({ page }) => {
    const targetId = await page.locator('button.navbar-toggler').getAttribute('data-bs-target');
    expect(targetId).toBe('#navbarNav');
    await expect(page.locator(targetId!)).toBeVisible();
  });

  test('About page should have "About InternHub" heading', async ({ page }) => {
    const heading = page.locator('h2');
    await expect(heading).toHaveText('About InternHub');
  });
  

});
