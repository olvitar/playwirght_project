import { expect } from '@playwright/test';

export class Header {
  constructor(page) {
    this.loginButton = page.getByRole('button', { name: 'Log In', exact: true });
    this.languageOptions = page.getByTestId('languages-container');
    this.page = page;
  }

  async openLogin() {
    await this.loginButton.click();
  }

  async expectLanguageAvailable(language) {
    await expect(this.languageOptions.getByLabel(language)).toBeVisible();
  }

  async expectAccountVisible(accountName) {
    await expect(
      this.page.getByRole('button', { name: `${accountName} account` }),
    ).toBeVisible();
  }
}
