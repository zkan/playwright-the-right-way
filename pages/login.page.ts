import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.getByTestId('login-field')
    this.passwordField = page.getByTestId('password-field')
    this.loginButton = page.getByTestId('submit-button')
  }

  async goto() {
    await this.page.goto('https://merchandise-dev.odds.team')
  }

  async login() {
    await this.loginField.fill('customer1')
    await this.passwordField.fill('password')
    await this.loginButton.click()
  }
}
