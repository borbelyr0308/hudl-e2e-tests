import { test, expect } from '@playwright/test';
import { HudleHomePage } from '../../pages/home/hudleHomePage';
import { HudleLoginPage } from '../../pages/login/hudleLoginPage';

/**
 * Test to verify the Hudle Login User flow
 * 
 * @author Robert Borbely
 */
test.describe('Authentication tests', () => {
    test.only('should show error for invalid username/email', async ({ page }) => {
        const hudleHomePage = new HudleHomePage(page);
        const hudleLoginPage = new HudleLoginPage(page);

        await hudleHomePage.gotoHudleAcceptCookies(page);
        await hudleHomePage.verifyLoginPageComponents(page);
        await hudleHomePage.gotoLogin(page);

        await hudleLoginPage.verifyHudleProductsMenu(page);
        await hudleLoginPage.gotoHudleLogin(page);
        await hudleLoginPage.invalidLogin(page);
        
        await expect(page.getByText('Incorrect username or')).toBeVisible();
    });
});