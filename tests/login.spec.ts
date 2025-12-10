import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page'
import { ProductPage } from '../pages/product.page'

test('Customer logs in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()
  await loginPage.login('customer1', 'password')
  const productPage = new ProductPage(page)
  await expect(productPage.topController).toBeVisible()
  await expect(productPage.topController).toHaveText(/products/)
})

test('Customer fails to login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()
  await loginPage.login('', '')
  await expect(loginPage.errorMessage).toBeVisible()
})
