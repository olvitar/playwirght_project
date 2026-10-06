import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { testData } from '../Common/TestData.js';

test.describe('Login', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.openHomePage();
    await homePage.acceptConsent();
    await homePage.openLogin();
  });

  test('with valid credentials', async () => {
    const { emailValid, passwordValid } = testData.userLogin;
    await homePage.loginDialog.login(emailValid, passwordValid);

    await homePage.expectLoggedInAs(emailValid.split('@')[0]);
  });

  test('with an empty login form', async () => {
    await homePage.loginDialog.submitLogin();

    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.emailBlank);
    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.passwordBlank);
  });

  test('with an empty email field', async () => {
    await homePage.loginDialog.enterPassword(testData.userLogin.passwordValid);
    await homePage.loginDialog.submitLogin();

    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.emailBlank);
  });

  test('with an empty password field', async () => {
    await homePage.loginDialog.enterEmail(testData.userLogin.emailValid);
    await homePage.loginDialog.submitLogin();

    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.passwordBlank);
  });

  test('with an invalid email format', async () => {
    await homePage.loginDialog.login(
      testData.userLogin.emailInvalidFormat,
      testData.userLogin.passwordValid,
    );

    await homePage.loginDialog.expectValidationMessage(
      testData.loginMessages.invalidEmailFormat,
    );
  });

  test('with an incorrect password', async () => {
    await homePage.loginDialog.login(
      testData.userLogin.emailValid,
      testData.userLogin.passwordInvalid,
    );

    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.wrongCredentials);
  });

  test('with a non-existent user email', async () => {
    await homePage.loginDialog.login(
      testData.userLogin.emailNonExistent,
      testData.userLogin.passwordNonExistent,
    );

    await homePage.loginDialog.expectValidationMessage(testData.loginMessages.emailNotFound);
  });
});
