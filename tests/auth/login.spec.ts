import { test, expect } from '@playwright/test';
import { HudleHomePage } from '../../pages/home/hudleHomePage';
import { HudleLoginPage } from '../../pages/login/hudleLoginPage';
// import { ActionClassExample } from '../../actions/ActionClassExample'; // if you want to use actions classes uncomment this

/**
 * Test to verify the Hudle Login User flow
 * 
 * @author Robert Borbely
 */
test.describe('Authentication tests', () => {
    test('should show error for invalid username/email', { tag: ['@auth', '@critical'] }, async ({ page }) => {
        const hudleHomePage = new HudleHomePage(page);
        const hudleLoginPage = new HudleLoginPage(page);

        // e.g. alternative to using POM is to use actions, here is an example (saves on maintenance due to less code)
        // const actionClassExample = new ActionClassExample();
        // await actionClassExample.gotoHudleAcceptCookies(page);
        await hudleHomePage.gotoHudleAcceptCookies(page);
        
        await hudleHomePage.verifyLoginPageComponents();
        await hudleHomePage.gotoLogin();

        await hudleLoginPage.verifyHudleProductsMenu(page);
        await hudleLoginPage.gotoHudleLogin(page);
        await hudleLoginPage.invalidLogin(page);
        
        await expect(page.getByText('Incorrect username or')).toBeVisible();
    });

    test('should login successfully with valid credentials', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
        const hudleHomePage = new HudleHomePage(page);
        const hudleLoginPage = new HudleLoginPage(page);

        await hudleHomePage.gotoHudleAcceptCookies(page);
        await hudleHomePage.gotoLogin();

        await hudleLoginPage.gotoHudleLogin(page);
        await hudleLoginPage.validLogin(page);
        
        await expect(page.getByText('Robert B')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    });

    test('should show errors if email or password is blank', { tag: ['@auth', '@critical'] }, async ({ page }) => {
        // Leave email blank - verify error
        // Fill email
        // Leave password blank - verify error
    });

    test('should allow a customer to create an account', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
        // Use random-email to create different emails each run
        // Re-use the password in .env for a valid password
        // Verify you can create account
    });
});