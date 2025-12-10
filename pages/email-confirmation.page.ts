import { type Locator, type Page } from '@playwright/test';

export class EmailConfirmationPage {
  readonly page: Page
  readonly searchBox: Locator
  readonly searchButton: Locator

  constructor(page: Page) {
    this.page = page
    this.searchBox = page.getByRole('textbox', { name: 'Search' })
    this.searchButton = page.locator('form').getByRole('button')
  }

  async goto() {
    await this.page.goto('https://mailpit.odds.team')
  }

  async searchBy(email: string) {
    await this.searchBox.fill(email)
    await this.searchButton.click()
  }

  findEmailLinkBy(text: string): Locator {
    return this.page.getByRole('link', { name: text })
  }
}
