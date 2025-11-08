import { locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly usernameTextbox: locator;
    private readonly passwordTextbox: locator;
    private readonly loginButton: locator;

    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async fillusername(Username : string) {
        await this.usernameTextbox.fill(Username);
    }
    async fillpassword(Password : string) {
        await this.passwordTextbox.fill(Password);
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }

    async logincredenciales(Username: string, Password: string) {
        await this.fillusername(Username);
        await this.fillpassword(Password);
        await this.clickLoginButton();
    }
}



