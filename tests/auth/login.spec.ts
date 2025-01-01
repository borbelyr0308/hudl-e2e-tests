import { test, expect } from '@playwright/test';
import { HudlHomePage } from '../../pages/home/hudlHomePage';
import { HudlLoginPage } from '../../pages/login/hudlLoginPage';
import { HudlCreateAccountPage } from '../../pages/create_account/hudlCreateAccountPage';

// import { ActionClassExample } from '../../actions/ActionClassExample'; // if you want to use actions classes uncomment this

/**
 * Test to verify the Hudl Login User flow
 * 
 * @author Robert Borbely
 */
test.describe('Authentication tests', () => {
    test('should show error for invalid username/password', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

        // e.g. alternative to using POM is to use actions, here is an example (saves on maintenance due to less code)
        // const actionClassExample = new ActionClassExample();
        // await actionClassExample.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoHudlAcceptCookies(page);
  
          // Navigate to HUDL.com        
        await hudlHomePage.verifyLoginPageComponents();
        await hudlHomePage.gotoLogin();

          // Navigate to login page and enter invalid credentials        
        await hudlLoginPage.verifyHudlProductsMenu(page);
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.invalidLogin(page);
        
          // Confirm Validation message is visible        
        await expect(page.getByText('Incorrect username or')).toBeVisible();
    });

    test('should login successfully with valid credentials', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com          
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and enter valid login credentials        
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.validLogin(page);
        await hudlLoginPage.continueNextPage();
        
          // Confirm User logged into account       
        await expect(page.getByText('Robert B')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    });

    test('should be able to logout', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
      const hudlHomePage = new HudlHomePage(page);
      const hudlLoginPage = new HudlLoginPage(page);
      const hudlCreateAccountPage = new HudlCreateAccountPage(page);

        // Navigate to HUDL.com          
      await hudlHomePage.gotoHudlAcceptCookies(page);
      await hudlHomePage.gotoLogin();

        // Navigate to login page and enter valid login credentials        
      await hudlLoginPage.gotoHudlLogin(page);
      await hudlLoginPage.validLogin(page);
      await hudlLoginPage.continueNextPage();

        // Navigate to Account menu and logout 
      await hudlCreateAccountPage.accountMenu();
      await hudlLoginPage.logUserOut();     
      
        // Confirm User logged out from account       
      await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
      await expect(page.getByTitle('Home')).toBeVisible();
  });

    test('should show errors if email is blank', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com          
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and leave email blank        
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.continueNextPage();

          // Confirm Please Fill in this field validation is visible   
        await hudlLoginPage.pleaseFillThisFieldValidation(page);


    });

    test('should show errors if password is blank', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com        
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and leave password blank         
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.emptyPassword(page);
        await hudlLoginPage.continueNextPage();

          // Confirm Please Fill in this field validation is visible   
        await hudlLoginPage.pleaseFillThisFieldValidation(page);

    });

    test('should show errors if password is wrong but username is valid', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com        
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and leave password blank         
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.wrongPassword(page);
        await hudlLoginPage.continueNextPage();
        
          // Confirm Validation message is visible
        await expect(page.getByText('Your email or password is')).toBeVisible();

    });

    test('should be able to select Forgot Password', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com          
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and select Forgot Password        
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.passwordRecovery(page);
        await hudlLoginPage.continueNextPage();
        
          // Confirm Forgot Password Email Sent       
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Resend Email' })).toBeVisible();
        await expect(page.locator('span')).toBeVisible();
        await expect(page.getByText('If you have an account, you\'')).toBeVisible();
    });
    
    test('should allow a customer to create an account', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);
        const hudlCreateAccountPage = new HudlCreateAccountPage(page);
        const randomEmail = require('random-email');

          // Navigate to HUDL.com
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to Hudl Login Page and Create Account
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.gotoCreateAccount(page)
        
          // Enter Personal Details
        await hudlCreateAccountPage.fillPersonalDetails('Robert', 'Borbely');
        await hudlCreateAccountPage.verifyCreateAccountHeading();
        await hudlCreateAccountPage.fillEmail(randomEmail());
        await hudlLoginPage.continueNextPage();
        
          // Enter password and check Password criteria
        await hudlCreateAccountPage.fillPassword('T');
        await hudlCreateAccountPage.verifyPasswordCriteria();
        await hudlLoginPage.validPassword(page);
        await hudlCreateAccountPage.togglePasswordOn();
        await hudlCreateAccountPage.togglePasswordOff();
        await hudlCreateAccountPage.verifyPasswordCriteria();
        await hudlLoginPage.continueNextPage();

          // Confirm account created        
        await expect(page.getByRole('img', { name: 'it\'s on header text with hudl' })).toBeVisible();

    });        

    test('should show error when email is not valid format', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);

          // Navigate to HUDL.com        
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to login page and enter invalid email format        
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.populateEmail('robert.com')
        await hudlLoginPage.continueNextPage();

           // Confirm Validation Message is visible       
        await expect(page.getByText('Enter a valid email.')).toBeVisible();

    });

    test('should allow user to reset password', { tag: ['@auth', '@critical', '@happy'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);
        const hudlCreateAccountPage = new HudlCreateAccountPage(page);
        const randomEmail = require('random-email');

          // Navigate to HUDL.com
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to Hudl Login Page and Create Account        
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.gotoCreateAccount(page)
        
          // Enter Personal Details
        await hudlCreateAccountPage.fillPersonalDetails('Robert', 'Borbely');
        await hudlCreateAccountPage.verifyCreateAccountHeading();
        await hudlCreateAccountPage.fillEmail(randomEmail());
        await hudlLoginPage.continueNextPage();
        
          // Enter password and check Password criteria
        await hudlLoginPage.validPassword(page);
        await hudlLoginPage.continueNextPage();

          // Reset Password
        await hudlCreateAccountPage.navigateToAccountSettings();
        await hudlCreateAccountPage.resetPassword();
        
          // Confirm Password Reset
        await expect(page.getByText('A reset password link has')).toBeVisible();
        
    });

    test('should inform user email address is already used', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);
        const hudlCreateAccountPage = new HudlCreateAccountPage(page);

          // Navigate to HUDL.com
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to Hudl Login Page and Create Account
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.gotoCreateAccount(page)
        
          // Enter Personal Details
        await hudlCreateAccountPage.verifyCreateAccountHeading();  
        await hudlCreateAccountPage.fillPersonalDetails('Robert', 'Borbely');
        await hudlCreateAccountPage.fillEmail('test@email.com');
        await hudlLoginPage.continueNextPage();
        
          // Enter password and check Password criteria
        await hudlLoginPage.validPassword(page);
        await hudlLoginPage.continueNextPage();

          // Confirm Validation Message is visible
        await expect(page.getByText('An account with this email')).toBeVisible();       

    });        

    test('should inform user password contains data', { tag: ['@auth', '@critical', '@negative'] }, async ({ page }) => {
        const hudlHomePage = new HudlHomePage(page);
        const hudlLoginPage = new HudlLoginPage(page);
        const hudlCreateAccountPage = new HudlCreateAccountPage(page);
        const randomEmail = require('random-email');

          // Navigate to HUDL.com
        await hudlHomePage.gotoHudlAcceptCookies(page);
        await hudlHomePage.gotoLogin();

          // Navigate to Hudl Login Page and Create Account
        await hudlLoginPage.gotoHudlLogin(page);
        await hudlLoginPage.gotoCreateAccount(page)
        
          // Enter Personal Details
        await hudlCreateAccountPage.verifyCreateAccountHeading();  
        await hudlCreateAccountPage.fillPersonalDetails('Robert', 'Borbely');
        await hudlCreateAccountPage.fillEmail('robert@not-valid-email.com');
        await hudlLoginPage.continueNextPage();
        
          // Enter password containing user`s data
        await hudlLoginPage.userDataPassword(page);
        await hudlLoginPage.continueNextPage();

          // Confirm Validation Message is visible
        await expect(page.getByText('Password contains user')).toBeVisible();      

    });

});

