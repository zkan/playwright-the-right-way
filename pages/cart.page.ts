import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page
  readonly emptyCartController: Locator
  readonly subTotalPrice: Locator
  readonly checkoutButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.emptyCartContainer = page.getByTestId('empty-cart-container')
    this.subTotalPrice = page.getByTestId('subtotal-price-container')
    this.checkoutButton = page.getByTestId('checkout-button')
  }
}
