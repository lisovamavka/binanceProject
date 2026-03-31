import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { RegisterPage } from '../../pages/register.page';

test.describe('C61 - Sign up with Telegram functionality', () => {
    test.skip(!!process.env.CI, 'External Binance — run locally only');

    test('should open Telegram auth popup', async ({ page }) => {
        const homePage = new HomePage(page);
        await test.step('Go to the home page and click on sign up button', async () => {
            await homePage.goto();
        });

        await test.step('Click on Sign up button and capture popup', async () => {
            await homePage.checkAndClickSignUpButton();
        });

        const registerPage = new RegisterPage(page);

        await test.step('Verify page URL', async () => {
            await registerPage.verifyPageUrl();
        });

        await test.step('Click on Telegram login and capture popup', async () => {
            await registerPage.checkAndClickTelegramLoginButton();
        });

        await test.step('Verify Telegram auth popup is opened', async () => {
            await registerPage.verifyDialogWindowIsOpened();
        });

        await test.step('Click on Continue button in dialog window', async () => {
            await registerPage.verifyContinueButtonDialogWindowAndClick();
        });
    });
});