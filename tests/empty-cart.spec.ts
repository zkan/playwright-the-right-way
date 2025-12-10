import { test, expect } from '@playwright/test';

test('Customer sees empty cart when not adding any product to cart', async ({ page }) => {
  await page.goto('https://merchandise-dev.odds.team')
  await page.getByTestId('login-field').click();
  await page.getByTestId('login-field').fill('customer1');
  await page.getByTestId('password-field').fill('password');
  await page.getByTestId('submit-button').click();

  await page.getByTestId('cart').click();
  await expect(page.getByTestId('empty-cart-container')).toBeVisible();
});
