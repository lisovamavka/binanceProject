import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

/**
 * Waits for Apple auth without assuming a single flow:
 * popup, new page in context, or same-tab navigation (local vs CI).
 */
function waitForAppleAuthPage(mainPage: Page): Promise<Page> {
  const context = mainPage.context();
  return Promise.race([
    mainPage.waitForEvent('popup'),
    context.waitForEvent('page'),
    mainPage.waitForURL(/appleid\.apple\.com/).then(() => mainPage),
  ]);
}

test.describe('Sign in with Apple', () => {
  test('should open Apple auth popup', async ({ page }) => {
    const homePage = new HomePage(page);
    await test.step('Go to the sign in page', async () => {
      await homePage.goto();
    });

    await test.step('Click on Apple login and capture popup', async () => {
      await expect(homePage.appleLoginButton).toBeVisible();
      await expect(homePage.appleLoginButton).toBeEnabled();

      const [appleAuthPage] = await Promise.all([
        waitForAppleAuthPage(page),
        homePage.appleLoginButton.click(),
      ]);

      await appleAuthPage.waitForLoadState('domcontentloaded');

      await expect(appleAuthPage).toHaveURL(/appleid\.apple\.com\/auth\/authorize/);

      await expect(appleAuthPage.locator('#swp')).toBeVisible();
      await expect(appleAuthPage.locator('#swp')).toBeEnabled();

      const emailField = appleAuthPage.getByRole('textbox', {
        name: /Email or phone|Е[- ]?адреса|phone number|адреса чи телефон/i,
      });
      await expect(emailField).toBeVisible();

      const continueButton = appleAuthPage.locator('#sign-in');
      await expect(continueButton).toBeDisabled();

      await emailField.fill('test@test.com');

      await expect(continueButton).toBeEnabled();
    });
  });
});
