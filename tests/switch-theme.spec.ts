import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Switch Theme', () => {
  test('Go to the home page and switch theme', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Go to the home page', async () => {
      await homePage.goto();
    });

    const beforeThemeChangedTime = await page.evaluate(() =>
      localStorage.getItem('themeChangedTime'),
    );

    await test.step('Switch theme', async () => {
      await homePage.verifyButtonAndSwitchTheme();
    });

    await expect
      .poll(async () => page.evaluate(() => localStorage.getItem('themeChangedTime')))
      .not.toBe(beforeThemeChangedTime);
  });
});