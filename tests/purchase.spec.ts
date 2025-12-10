import { test, expect } from '@playwright/test';

test('Customer purchases products', async ({ page }) => {
  await page.goto('https://merchandise-dev.odds.team')
  await page.getByTestId('login-field').click();
  await page.getByTestId('login-field').fill('customer1');
  await page.getByTestId('password-field').fill('password');
  await page.getByTestId('submit-button').click();

  await page.getByTestId('add-to-cart-button').first().click();
  await page.getByTestId('add-to-cart-button').nth(1).click();
  await page.getByTestId('cart').click();
  await expect(page.getByTestId('subtotal-price-container').getByText('285.89THB')).toBeVisible();

  await page.getByTestId('checkout-button').click();
  await page.getByTestId('firstname-field').click();
  await page.getByTestId('firstname-field').fill('zkan');
  await page.getByTestId('lastname-field').click();
  await page.getByTestId('lastname-field').fill('world');
  await page.getByTestId('email-field').click();
  await page.getByTestId('email-field').fill('zkan@mailinator.com');
  await page.getByTestId('zipcode-field').click();
  await page.getByTestId('zipcode-field').fill('55555');
  await page.getByTestId('confirm-payment-button').click();
  await expect(page.getByText('Thank you for your order.')).toBeVisible();

  await page.getByTestId('back-to-store-button').click();

  await page.goto('https://mailpit.odds.team')
  await page.getByRole('textbox', { name: 'Search' }).fill('zkan@mailinator.com');
  await page.locator('form').getByRole('button').click();
  await expect(page.getByRole('link', { name: /ODT x merchandise store To: zkan@mailinator.com/ })).toBeVisible();
  await page.getByRole('link', { name: /ODT x merchandise store To: zkan@mailinator.com ODT x merchandise: Order #/ }).click();
  await expect(page.getByLabel('Text')).toContainText(/TerraFlex Hoodie/)
  await expect(page.getByLabel('Text')).toContainText(/79.69 THB/)
  await expect(page.getByLabel('Text')).toContainText(/NordicPeak Jacket/);
  await expect(page.getByLabel('Text')).toContainText(/206.20 THB/);
  await expect(page.getByLabel('Text')).toContainText(/Subtotal/);
  await expect(page.getByLabel('Text')).toContainText(/285.89 THB/);
  await expect(page.getByLabel('Text')).toContainText(/Shipping fee/);
  await expect(page.getByLabel('Text')).toContainText(/0.00 THB/);
  await expect(page.getByLabel('Text')).toContainText(/VAT 7%/);
  await expect(page.getByLabel('Text')).toContainText(/20.01 THB/);
  await expect(page.getByLabel('Text')).toContainText(/Total/)
  await expect(page.getByLabel('Text')).toContainText(/305.90 THB/);

  await page.goto('https://mailpit.odds.team')
  await page.getByRole('textbox', { name: 'Search' }).fill('zkan@mailinator.com');
  await page.locator('form').getByRole('button').click();
  await page.getByRole('button', { name: ' Delete all' }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
});
