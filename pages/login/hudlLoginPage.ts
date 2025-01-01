import { Locator, Page, expect } from "@playwright/test";
import 'dotenv/config';

/**
 * Hudl Login page.
 * 
 * @author Robert Borbely
 */
export class HudlLoginPage {

    readonly page: Page;
    readonly hudlLoginMenu: Locator;
    readonly wyscoutMenu: Locator;
    readonly volleymetricsMenu: Locator;
    readonly wimuMenu: Locator;
    readonly instatBasketballMenu: Locator;
    readonly instaIceHockeyMenu: Locator;
    readonly iqAmericanFootballMenu: Locator;
    readonly hudlLoginLogo: Locator;
    readonly LoginHeading: Locator;
    readonly emailInputLoginPage: Locator;
    readonly passwordInputLoginPage: Locator;
    readonly continueButton: Locator;
    readonly createAccountButton: Locator;
    readonly continueWithGoogleButton: Locator;
    readonly continueWithFacebookButton: Locator;
    readonly continueWithAppleButton: Locator;
    readonly privacyPolicyLink: Locator;
    readonly termsOfServiceLink: Locator;
    readonly forgotPassword: Locator;
    readonly logout: Locator;





    constructor(page: Page) {
        this.page = page;
        this.hudlLoginMenu = page.getByRole('link', { name: 'Hudl logo mark Hudl' });
        this.wyscoutMenu = page.getByRole('banner').getByRole('link', { name: 'Wyscout' });
        this.volleymetricsMenu = page.getByRole('banner').getByRole('link', { name: 'Volleymetrics' });
        this.wimuMenu = page.getByRole('link', { name: 'WIMU Cloud' });
        this.instatBasketballMenu = page.getByRole('link', { name: 'Instat for Basketball' });
        this.instaIceHockeyMenu = page.getByRole('link', { name: 'Instat for Ice Hockey' });
        this.iqAmericanFootballMenu = page.getByRole('link', { name: 'IQ for American Football' });
        this.hudlLoginLogo = page.getByTitle('Hudl');
        this.LoginHeading = page.getByRole('heading', { name: 'Log In' });
        this.emailInputLoginPage = page.getByLabel('Email');
        this.passwordInputLoginPage = page.getByLabel('Password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.createAccountButton = page.getByRole('link', { name: 'Create Account' });
        this.continueWithGoogleButton = page.getByRole('button', { name: 'Continue with Google' });
        this.continueWithFacebookButton = page.getByRole('button', { name: 'Continue with Facebook' });
        this.continueWithAppleButton = page.getByRole('button', { name: 'Continue with Apple' });
        this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });
        this.termsOfServiceLink = page.getByRole('link', { name: 'Terms of Service' });
        this.forgotPassword = page.getByRole('link', { name: 'Forgot Password' });
        this.logout = page.getByRole('link', { name: 'Log Out' });

    }

    async verifyHudlProductsMenu(page: Page) {
        await expect(this.hudlLoginMenu).toBeVisible();
        await expect(this.wyscoutMenu).toBeVisible();
        await expect(this.volleymetricsMenu).toBeVisible();
        await expect(this.wimuMenu).toBeVisible();
        await expect(this.instatBasketballMenu).toBeVisible();
        await expect(this.instaIceHockeyMenu).toBeVisible();
        await expect(this.iqAmericanFootballMenu).toBeVisible();
    }

    async gotoHudlLogin(page: Page) {
        await this.hudlLoginMenu.click();
    }

    async gotoCreateAccount(page: Page) {
        await this.createAccountButton.click();
    }

    async verifyLoginComponent(page: Page) {
        await expect(this.hudlLoginLogo).toBeVisible();
        await expect(this.LoginHeading).toBeVisible();
        await expect(this.emailInputLoginPage).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.createAccountButton).toBeVisible();
        await expect(this.continueWithGoogleButton).toBeVisible();
        await expect(this.continueWithFacebookButton).toBeVisible();
        await expect(this.privacyPolicyLink).toBeVisible();
        await expect(this.termsOfServiceLink).toBeVisible();
    }

    async invalidLogin(page: Page) {
        await this.enterEmail(page, process.env.INVALID_USERNAME || '');
        await this.enterPassword(page, process.env.INVALID_PASSWORD || '');
        await page.getByRole('button', { name: 'Continue' }).click();
    }

    async emptyPassword(page: Page) {
        await this.enterEmail(page, process.env.RANDOM_USERNAME || '');
        await this.enterPassword(page, process.env.EMPTY_PASSWORD || '');
    }

    async validLogin(page: Page) {
        await this.enterEmail(page, process.env.VALID_USERNAME || '');
        await this.enterPassword(page, process.env.VALID_PASSWORD || '');
    }

    async enterEmail(page: Page, email: string) {
        await this.emailInputLoginPage.click();
        await this.emailInputLoginPage.fill(email);
        await this.continueButton.click();
    }

    async enterPassword(page: Page, password: string) {
        await expect(this.passwordInputLoginPage).toBeVisible();
        await this.passwordInputLoginPage.click();
        await this.passwordInputLoginPage.fill(password);
        await this.passwordInputLoginPage.click();
    }

    async emptyEmailLogin(page: Page) {
        await this.continueButton.click();
    }

    async validPassword(page: Page) {
        await this.enterPassword(page, process.env.VALID_PASSWORD || '');
    }
    async continueNextPage() {
        await this.continueButton.click();
    }

    async populateEmail(email: string) {
        await this.emailInputLoginPage.fill(email);
    }

    async logUserOut() {
        await this.logout.click();
    }

    async userDataPassword(page: Page) {
        await this.enterPassword(page, process.env.USER_DATA_PASSWORD || '');
    }

    async wrongPassword(page: Page) {
        await this.enterEmail(page, process.env.VALID_USERNAME || '');
        await this.enterPassword(page, process.env.INVALID_PASSWORD || '');
    }

    async passwordRecovery(page: Page) {
        await this.enterEmail(page, process.env.RANDOM_USERNAME || '');
        await this.forgotPassword.click();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible(); 
    }

    async pleaseFillThisFieldValidation(page: Page) {
        const validationMessage = await page.locator('input[required]').evaluate(input => {
            return (input as HTMLInputElement).validationMessage;
        });
        expect(validationMessage).toBe('Please fill out this field.');
    }

}