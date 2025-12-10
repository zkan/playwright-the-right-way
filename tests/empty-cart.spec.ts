import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page'
import { LoginPage } from '../pages/login.page'
import { ProductPage } from '../pages/product.page'

test('Customer sees empty cart when not adding any product to cart', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login('customer1', 'password')

  const productPage = new ProductPage(page)
  productPage.cartButton.click()

  const cartPage = new CartPage(page)
  await expect(cartPage.emptyCartContainer).toBeVisible()
  await expect(cartPage.emptyCartContainer).toHaveText('No item in cart.')
});
