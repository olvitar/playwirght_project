import { URLs } from '../Common/URLs.js';
import { ConsentDialog } from '../components/consent-dialog.component.js';
import { Header } from '../components/header.component.js';
import { LoginDialog } from '../components/login-dialog.component.js';
import { BasePage } from './base.page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
    this.consentDialog = new ConsentDialog(page);
    this.loginDialog = new LoginDialog(page);
  }

  async openHomePage() {
    await this.open(URLs.homePage);
    await this.expectTitle(URLs.title);
    await this.header.expectLanguageAvailable(URLs.defaultLanguage);
  }

  async acceptConsent() {
    await this.consentDialog.acceptConsent();
  }

  async openLogin() {
    await this.header.openLogin();
    await this.loginDialog.switchToLogin();
  }

  async expectLoggedInAs(accountName) {
    await this.header.expectAccountVisible(accountName);
  }
}
