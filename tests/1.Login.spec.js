//@ts-check
import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'andriitest7799@gmail.com';
const TEST_PASSWORD = 'Aa123_123';
const ACCOUNT_NAME = TEST_EMAIL.split('@')[0];

test.beforeEach(async ({ page }) => {
  await page.goto('https://testing101.net');
  await expect(page).toHaveTitle('Testing 101 | Software Testing 101');
  await expect(page.getByTestId('languages-container').getByLabel('English')).toBeVisible();

  const consentButton = page.getByRole('button', { name: 'Consent' });
  if (await consentButton.isVisible()) {
    await consentButton.click();
  }
  await expect(page.getByRole('dialog', { name: 'This site asks for consent to use your data' })).toBeHidden();

  await test.step('open login dialog', async () => {
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByRole('dialog', { name: 'Sign Up' })).toBeVisible();
    await page.getByRole('button', { name: 'Already a member? Log In' }).click();
  });
});

test('Login with valid credentials', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Email' }).fill(TEST_EMAIL);
  await loginDialog.getByRole('textbox', { name: 'Password' }).fill(TEST_PASSWORD);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(page.getByRole('button', { name: `${ACCOUNT_NAME} account` })).toBeVisible();
});
