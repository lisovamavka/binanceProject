import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Header accessibility', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.header.dropdownIsVisible();
    await homePage.header.searchContentIsVisibleAfterClick();
    await homePage.header.tradeDropdownIsVisible();
    await homePage.header.futuresDropdownIsVisible();
    await homePage.header.earnDropdownIsVisible();
    await homePage.header.squareDropdownIsVisible();
    await homePage.header.moreDropdownIsVisible();
});