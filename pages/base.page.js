import { expect } from '@playwright/test';

export class BasePage {
  static title = 'Testing 101 | Software Testing 101';
  static defaultLanguage = 'English';

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
