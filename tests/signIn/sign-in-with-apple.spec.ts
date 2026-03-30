import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.describe('Sign in with Apple', () => {
  test('should open Apple auth popup', async ({ page }) => {
    const homePage = new HomePage(page);
    await test.step('Go to the sign in page', async () => {
      await homePage.goto();
    });

    await test.step('Click on Apple login and capture popup', async () => {
      await expect(homePage.appleLoginButton).toBeVisible();
      await expect(homePage.appleLoginButton).toBeEnabled();

      const [applePopup] = await Promise.all([
        page.waitForEvent('popup'),
        homePage.appleLoginButton.click(),
      ]);

      await applePopup.waitForLoadState('domcontentloaded');

      //check popup URL
      await expect(applePopup).toHaveURL(/appleid\.apple\.com\/auth\/authorize/);

      //check sign in with iphone button
      await expect(applePopup.locator('#swp')).toBeVisible();
      await expect(applePopup.locator('#swp')).toBeEnabled();

      let emailField = applePopup.getByRole('textbox', { name: 'Email or phone number' });
      // Check email field
      await expect(emailField).toBeVisible();

      let continueButton = applePopup.locator('#sign-in');
      //check continue button is disabled
      await expect(continueButton).toBeDisabled();

      //fill email field with test email
      await emailField.fill('test@test.com');

      //check continue button is enabled
      await expect(continueButton).toBeEnabled();
    });
  });
});