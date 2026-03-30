import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C51 - Trade dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.header.tradeDropdownIsVisible();
    await homePage.header.tradeOptionsHaveDescriptions();
    await homePage.header.clickSpotAndVerifyRedirect();
});
