import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page
  readonly topController: Locator

  constructor(page: Page) {
    this.page = page;
    this.emptyCartContainer = page.getByTestId('empty-cart-container')
  }
}
