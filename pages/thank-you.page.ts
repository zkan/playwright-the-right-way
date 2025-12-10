import { type Locator, type Page } from '@playwright/test';

export class ThankYouPage {
  readonly page: Page
  readonly thankYouText: Locator
  readonly backToStoreButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.thankYouText = page.getByText('Thank you for your order.')
    this.backToStoreButton = page.getByTestId('back-to-store-button')
  }
}
