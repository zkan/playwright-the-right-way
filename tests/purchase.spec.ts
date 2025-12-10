import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page'
import { CheckoutPage } from '../pages/checkout.page'
import { EmailConfirmationPage } from '../pages/email-confirmation.page'
import { LoginPage } from '../pages/login.page'
import { ProductPage } from '../pages/product.page'
import { ThankYouPage } from '../pages/thank-you.page'

test('Customer purchases products successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()
  await loginPage.login('customer1', 'password')

  const productPage = new ProductPage(page)
  await productPage.addToCartButton.first().click();
  await productPage.addToCartButton.nth(1).click();
  await productPage.cartButton.click();

  const cartPage = new CartPage(page)
  await cartPage.checkoutButton.click()

  const checkoutPage = new CheckoutPage(page)
  await checkoutPage.firstNameField.fill(`zkan`)
  await checkoutPage.lastNameField.fill(`zkan`)
  await checkoutPage.emailField.fill(`zkan@mailinator.com`)
  await checkoutPage.zipcodeField.fill('55555')
  await checkoutPage.confirmPaymentButton.click()

  const thankYouPage = new ThankYouPage(page)
  await expect(thankYouPage.thankYouText).toBeVisible()
});

test('Customer gets confirmation email after purchases', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto()
  await loginPage.login('customer1', 'password')

  const productPage = new ProductPage(page)
  await productPage.addToCartButton.first().click();
  await productPage.addToCartButton.nth(1).click();
  await productPage.cartButton.click();

  const cartPage = new CartPage(page)
  await cartPage.checkoutButton.click()

  const time = Date.now()

  const checkoutPage = new CheckoutPage(page)
  await checkoutPage.firstNameField.fill(`chonla-${time}`)
  await checkoutPage.lastNameField.fill(`chonla-${time}`)
  await checkoutPage.emailField.fill(`chonla+${time}@mailinator.com`)
  await checkoutPage.zipcodeField.fill('55555')
  await checkoutPage.confirmPaymentButton.click()

  const emailConfirmationPage = new EmailConfirmationPage(page)
  await emailConfirmationPage.goto()

  const email = `chonla+${time}@mailinator.com`
  await emailConfirmationPage.searchBy(email)
  
  const text = `ODT x merchandise store To: chonla+${time}@mailinator.com ODT x merchandise: Order #`
  await expect(emailConfirmationPage.findEmailLinkBy(text)).toBeVisible()

  await emailConfirmationPage.findEmailLinkBy(text).click()
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
})
