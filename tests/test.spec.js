const { test, expect } = require('@playwright/test');

test('Login with valid credentials', async ({ page }) => {
  const loginButton = page.getByRole('button', { name: 'Log In' });
  const signUpDialog = page.getByRole('dialog', { name: 'Sign Up' });
  const alreadyMemberButton = page.getByRole('button', { name: 'Already a member? Log In' });
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  const emailInput = page.getByRole('textbox', { name: 'Email' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  const accountButton = page.getByRole('button', { name: 'andriitest7799 account' });

  await page.goto('https://testing101.net');

  await loginButton.click();
  await expect(signUpDialog).toBeVisible();
  await alreadyMemberButton.click();
  await expect(loginDialog).toBeVisible();

  await emailInput.fill('andriitest7799@gmail.com');
  await passwordInput.fill('Aa123_123');

  await loginButton.click();

  await expect(accountButton).toBeVisible();
  
});
