import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page
  readonly firstNameField: Locator
  readonly lastNameField: Locator
  readonly emailField: Locator
  readonly zipcodeField: Locator
  readonly confirmPaymentButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByTestId('firstname-field')
    this.lastNameField = page.getByTestId('lastname-field')
    this.emailField = page.getByTestId('email-field')
    this.zipcodeField = page.getByTestId('zipcode-field')
    this.confirmPaymentButton = page.getByTestId('confirm-payment-button')
  }
}
