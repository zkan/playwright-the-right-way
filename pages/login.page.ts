import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator
  readonly passwordField: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.getByTestId('login-field')
    this.passwordField = page.getByTestId('password-field')
    this.loginButton = page.getByTestId('submit-button')
    this.errorMessage = page.getByTestId('error-message-label')
  }

  async goto() {
    await this.page.goto('https://merchandise-dev.odds.team')
  }

  async login(username: string, password: string) {
    await this.loginField.fill(username)
    await this.passwordField.fill(password)
    await this.loginButton.click()
  }
}
