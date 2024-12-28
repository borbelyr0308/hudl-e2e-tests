import { Page, expect } from "@playwright/test";

/**
 * An example of an alternative to using POM, use actions classes instead.
 * These better mimic user goals/actions, and require less code than Page 
 * Objects, meaning less maintenance - simply use the IDE find/replace to
 * update any locators.
 * 
 * @author Robert Borbely
 */
export class ActionClassExample {

    async gotoHudlAcceptCookies(page: Page) {
            await page.goto(process.env.HOMEPAGE || '');
            await expect(page.getByRole('button', { name: 'Cookies Settings' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Reject All' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Accept All Cookies' })).toBeVisible();
            await page.getByRole('button', { name: 'Accept All Cookies' }).click();
            await expect(page.getByRole('link', { name: 'Allow All' })).toBeVisible();
            await page.getByRole('link', { name: 'Allow All' }).click();
        }
}