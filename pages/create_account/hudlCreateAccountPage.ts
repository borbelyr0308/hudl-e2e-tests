import { Locator, Page, expect } from "@playwright/test";
import 'dotenv/config';

/**
 * Hudl Home page.
 * 
 * @author Robert Borbely
 */
export class HudlCreateAccountPage {

    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly createAccountHeading: Locator;
    readonly createAccountEmail: Locator;
    readonly createAccountPassword: Locator;
    readonly continueButton: Locator;
    readonly showPasswordButton: Locator;
    readonly hidePasswordButton: Locator;
    readonly passwordCriteria: Locator;
    readonly selectAccountMenu: Locator;
    readonly accountSettingsLink: Locator;
    readonly passwordAndSecurity: Locator;
    readonly resetPasswordButton: Locator;




    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByLabel('First Name*');
        this.lastName = page.getByLabel('Last Name*');
        this.createAccountHeading = page.getByRole('heading', { name: 'Create Account' });
        this.createAccountEmail = page.getByLabel('Email');
        this.createAccountPassword = page.getByLabel('Password');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
        this.hidePasswordButton = page.getByRole('button', { name: 'Hide password' });
        this.passwordCriteria = page.getByText('Your password must contain:');
        this.selectAccountMenu =   page.getByText('Robert');
        this.accountSettingsLink = page.locator('a').filter({ hasText: 'Account Settings' });
        this.passwordAndSecurity = page.getByText('Password & Security');
        this.resetPasswordButton = page.getByRole('button', { name: 'Reset Password' });

    }

    
      async fillPersonalDetails(firstName: string, lastName: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
      }
    
      async verifyCreateAccountHeading() {
        await expect(this.createAccountHeading).toBeVisible();
      }
    
      async fillEmail(email: string) {
        await this.createAccountEmail.fill(email);
      }

      async fillPassword(password: string) {
        await this.createAccountPassword.fill(password);
      }
    
      async togglePasswordVisibility() {
        await this.showPasswordButton.click();
        await this.hidePasswordButton.click();
      }
    
      async verifyPasswordCriteria() {
        await expect(this.passwordCriteria).toBeVisible();
        await expect(this.page.getByText('At least 8 characters')).toBeVisible();
        await expect(this.page.getByText('Lower case letters (a-z)')).toBeVisible();
        await expect(this.page.getByText('Upper case letters (A-Z)')).toBeVisible();
        await expect(this.page.getByText('Numbers (0-9)')).toBeVisible();
        await expect(this.page.getByText('Special characters (e.g')).toBeVisible();
      }
    
      async navigateToAccountSettings() {
        await this.selectAccountMenu.click()
        await this.accountSettingsLink.click();
      }
    
      async resetPassword() {
        await this.passwordAndSecurity.click();
        await this.resetPasswordButton.click();
      }
}