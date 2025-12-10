import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page'
import { LoginPage } from '../pages/login.page'
import { ProductPage } from '../pages/product.page'

test('Customer adds products to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()
  await loginPage.login('customer1', 'password')

  const productPage = new ProductPage(page)
  await productPage.addToCartButton.first().click();
  await productPage.addToCartButton.nth(1).click();
  await productPage.cartButton.click();

  const cartPage = new CartPage(page)
  await expect(cartPage.subTotalPrice.getByText('285.89THB')).toBeVisible()
})
