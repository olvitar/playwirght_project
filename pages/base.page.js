import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path) {
    await this.page.goto(path);
  }

  async expectTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectVisible(locator) {
    await expect(locator).toBeVisible();
  }
}
