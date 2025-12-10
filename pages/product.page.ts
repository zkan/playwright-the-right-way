import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page
  readonly topController: Locator

  constructor(page: Page) {
    this.page = page;
    this.topController = page.getByTestId('top-controller-container')
  }
}
