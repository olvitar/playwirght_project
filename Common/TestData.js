export class testData {
  static userLogin = {
    emailValid: process.env.TEST_USER_EMAIL || 'andriitest7799@gmail.com',
    passwordValid: process.env.TEST_USER_PASSWORD || 'Aa123_123',
    emailInvalidFormat: 'invalidemail',
    passwordInvalid: 'wrongpassword',
    emailNonExistent: 'nonexistent@example.com',
    passwordNonExistent: 'test123',
  };

  static loginMessages = {
    emailBlank: 'Email cannot be blank',
    passwordBlank: 'Make sure you enter a password.',
    invalidEmailFormat: 'Double check your email and try again.',
    wrongCredentials: 'Wrong email or password',
    emailNotFound: "This email doesn't match any account. Try again.",
  };
}
