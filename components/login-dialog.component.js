import { expect } from '@playwright/test';

export class LoginDialog {
  constructor(page) {
    this.signUpDialog = page.getByRole('dialog', { name: 'Sign Up' });
    this.dialog = page.getByRole('dialog', { name: 'Log In' });
    this.loginFormButton = this.dialog.getByRole('button', { name: 'Log In' });
    this.emailInput = this.dialog.getByRole('textbox', { name: 'Email' });
    this.passwordInput = this.dialog.getByRole('textbox', { name: 'Password' });
    this.switchToLoginButton = page.getByRole('button', {
      name: 'Already a member? Log In',
    });
  }

  async switchToLogin() {
    await expect(this.signUpDialog).toBeVisible();
    await this.switchToLoginButton.click();
    await expect(this.dialog).toBeVisible();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submitLogin();
  }

  async submitLogin() {
    await this.loginFormButton.click();
  }

  async expectValidationMessage(message) {
    await expect(this.dialog.getByText(message)).toBeVisible();
  }
}
