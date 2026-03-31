import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { RegisterPage } from '../../pages/register.page';

function waitForGoogleAuthPage(mainPage: Page): Promise<Page> {
  const context = mainPage.context();
  return Promise.any([
    mainPage.waitForEvent('popup'),
    context.waitForEvent('page'),
    mainPage.waitForURL(/accounts\.google\.com/).then(() => mainPage),
  ]);
}

test('C59 - Continue with Google from home page', async ({ page }) => {
  // FedCM flow is not available in CI - skipping this test in CI
  test.skip(!!process.env.CI, 'External Binance / Google flow — run locally only');

  const homePage = new HomePage(page);
  await homePage.goto();

  const authPagePromise = waitForGoogleAuthPage(page);
  await expect(homePage.googleLoginButton).toBeDefined();
  const clickPromise = homePage.googleLoginButton.click();

  const [authPage] = await Promise.all([authPagePromise, clickPromise]);

  await expect(authPage).toHaveURL(/accounts\.google\.com/);
  await expect(authPage.locator('body')).toContainText(/sign in/i);
  await expect(authPage.locator('body')).toContainText(/google/i);
});

test('C59 - Continue with Google from register page', async ({ page }) => {
  // FedCM flow is not available in CI - skipping this test in CI

  const registerPage = new RegisterPage(page);
  await registerPage.goto();

  const authPagePromise = waitForGoogleAuthPage(page);
  await expect(registerPage.continueWithGoogleButton).toBeVisible();
  // click events are intercepted by the iframe of google login and cannot be tested with Playwright
  // iframe of google login is embeded third party
});

