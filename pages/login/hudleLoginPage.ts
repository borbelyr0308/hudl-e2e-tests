import { Locator, Page, expect } from "@playwright/test";

/**
 * Hudle Login page.
 * 
 * @author Robert Borbely
 */
export class HudleLoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async verifyHudleProductsMenu(page: Page) {
        await expect(page.getByRole('link', { name: 'Hudl logo mark Hudl' })).toBeVisible();
        await expect(page.getByRole('banner').getByRole('link', { name: 'Wyscout' })).toBeVisible();
        await expect(page.getByRole('banner').getByRole('link', { name: 'Volleymetrics' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'WIMU Cloud' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Instat for Basketball' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Instat for Ice Hockey' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'IQ for American Football' })).toBeVisible();
    }

    async gotoHudleLogin(page: Page) {
        await page.getByRole('link', { name: 'Hudl logo mark Hudl' }).click();
    }

    async verifyLoginComponent(page: Page) {
        await expect(page.getByTitle('Hudl')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Create Account' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Continue with Facebook' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    }

    async invalidLogin(page: Page) {
        await this.enterEmail(page, 'not@valid.test.com');
        await this.enterPassword(page, 'notMyPassword');
        await page.getByRole('button', { name: 'Continue' }).click();
    }

    async validLogin(page: Page) {
        await this.enterEmail(page, 'borbelyr@yahoo.com'); // All credentials (valid or invalid) to go into secrets
        await this.enterPassword(page, 'PuNP-m!u!2AF&A?');
    }

    async enterEmail(page: Page, email: string) {
        await page.getByLabel('Email').click();
        await page.getByLabel('Email').fill(email);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
    }

    async enterPassword(page: Page, password: string) {
        await page.getByLabel('Password').click();
        await page.getByLabel('Password').fill(password);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
    }
}