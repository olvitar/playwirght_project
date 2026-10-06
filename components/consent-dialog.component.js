import { expect } from '@playwright/test';

export class ConsentDialog {
  constructor(page) {
    this.dialog = page.getByRole('dialog', {
      name: 'This site asks for consent to use your data',
    });
    this.acceptButton = page.getByRole('button', { name: 'Consent' });
  }

  async acceptConsent() {
    if (await this.acceptButton.isVisible()) {
      await this.acceptButton.click();
    }

    await expect(this.dialog).toBeHidden();
  }
}
