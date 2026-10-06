//@ts-check
import { test, expect } from '@playwright/test';

const TEST_EMAIL = 'andriitest7799@gmail.com';
const TEST_PASSWORD = 'Aa123_123';
const ACCOUNT_NAME = TEST_EMAIL.split('@')[0];

const INVALID_EMAIL_FORMAT = 'invalidemail';
const WRONG_PASSWORD = 'wrongpassword';
const NONEXISTENT_EMAIL = 'nonexistent@example.com';
const NONEXISTENT_PASSWORD = 'test123';

const MSG_EMAIL_BLANK = 'Email cannot be blank';
const MSG_PASSWORD_BLANK = 'Make sure you enter a password.';
const MSG_INVALID_EMAIL_FORMAT = 'Double check your email and try again.';
const MSG_WRONG_CREDENTIALS = 'Wrong email or password';
const MSG_EMAIL_NOT_FOUND = "This email doesn't match any account. Try again.";

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

test('Login with an empty Login Form', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_EMAIL_BLANK)).toBeVisible();
  await expect(loginDialog.getByText(MSG_PASSWORD_BLANK)).toBeVisible();
});

test('Login with an empty Email field', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Password' }).fill(TEST_PASSWORD);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_EMAIL_BLANK)).toBeVisible();
});

test('Login with an empty Password field', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Email' }).fill(TEST_EMAIL);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_PASSWORD_BLANK)).toBeVisible();
});

test('Login with invalid email format', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Email' }).fill(INVALID_EMAIL_FORMAT);
  await loginDialog.getByRole('textbox', { name: 'Password' }).fill(TEST_PASSWORD);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_INVALID_EMAIL_FORMAT)).toBeVisible();
});

test('Login with incorrect password', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Email' }).fill(TEST_EMAIL);
  await loginDialog.getByRole('textbox', { name: 'Password' }).fill(WRONG_PASSWORD);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_WRONG_CREDENTIALS)).toBeVisible();
});

test('Login with a non-existent user email', async ({ page }) => {
  const loginDialog = page.getByRole('dialog', { name: 'Log In' });
  await expect(loginDialog).toBeVisible();
  await loginDialog.getByRole('textbox', { name: 'Email' }).fill(NONEXISTENT_EMAIL);
  await loginDialog.getByRole('textbox', { name: 'Password' }).fill(NONEXISTENT_PASSWORD);
  await loginDialog.getByRole('button', { name: 'Log In' }).click();

  await expect(loginDialog.getByText(MSG_EMAIL_NOT_FOUND)).toBeVisible();
});
