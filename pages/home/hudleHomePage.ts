import { Locator, Page, expect } from "@playwright/test";

/**
 * Hudle Home page.
 * 
 * @author Robert Borbely
 */
export class HudleHomePage {

    readonly page: Page;
    readonly cookiesSettings: Locator;
    readonly rejectAll: Locator;
    readonly acceptAll: Locator;
    readonly allowAll: Locator;
    readonly homeTitle: Locator;
    readonly banner: Locator;
    readonly contactUs: Locator;
    readonly loginLink: Locator;
    readonly sportsLink: Locator;
    readonly productsLink: Locator;
    readonly orgLinks: Locator;
    readonly resourcesLink: Locator;
    readonly supportLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cookiesSettings = page.getByRole('button', { name: 'Cookies Settings' });
        this.rejectAll = page.getByRole('button', { name: 'Reject All' })
        this.acceptAll = page.getByRole('button', { name: 'Accept All Cookies' })
        this.allowAll = page.getByRole('link', { name: 'Allow All' })
        this.homeTitle = page.getByTitle('Home')
        this.banner = page.getByRole('banner').getByLabel('Language selector')
        this.contactUs = page.getByRole('link', { name: 'Contact Us' })
        this.loginLink = page.getByRole('link', { name: 'Log in' })
        this.sportsLink = page.locator('#site-navigation').getByRole('link', { name: 'Sports' })
        this.productsLink = page.locator('#site-navigation').getByRole('link', { name: 'Products' })
        this.orgLinks = page.getByRole('link', { name: 'Organisations' })
        this.resourcesLink = page.getByRole('link', { name: 'Resources' })
        this.supportLink = page.locator('#site-navigation').getByRole('link', { name: 'Support' })
    }

    async gotoHudleAcceptCookies(page: Page) {
        await page.goto('https://www.hudl.com/en_gb/');
        await expect(this.cookiesSettings).toBeVisible();
        await expect(this.rejectAll).toBeVisible();
        await expect(this.acceptAll).toBeVisible();
        await this.acceptAll.click();
        await expect(this.allowAll).toBeVisible();
        await this.allowAll.click();
    }

    async verifyLoginPageComponents() {
        await expect(this.homeTitle).toBeVisible();
        await expect(this.banner).toBeVisible();
        await expect(this.contactUs).toBeVisible();
        await expect(this.loginLink).toBeVisible();
        await expect(this.sportsLink).toBeVisible();
        await expect(this.productsLink).toBeVisible();
        await expect(this.orgLinks).toBeVisible();
        await expect(this.resourcesLink).toBeVisible();
        await expect(this.supportLink).toBeVisible();
    }

    async gotoLogin() {
        await this.loginLink.click();
    }
}
