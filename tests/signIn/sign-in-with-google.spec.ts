import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

function waitForGoogleAuthPage(mainPage: Page): Promise<Page> {
  const context = mainPage.context();
  return Promise.any([
    mainPage.waitForEvent('popup'),
    context.waitForEvent('page'),
    mainPage.waitForURL(/accounts\.google\.com/).then(() => mainPage),
  ]);
}

test('C59 - Continue with Google', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  const authPagePromise = waitForGoogleAuthPage(page);
  const clickPromise = homePage.googleLoginButton.click();
  
  const [authPage] = await Promise.all([authPagePromise, clickPromise]);

  await expect(authPage).toHaveURL(/accounts\.google\.com/);
  await expect(authPage.locator('body')).toContainText(/sign in/i);
  await expect(authPage.locator('body')).toContainText(/google/i);
});
