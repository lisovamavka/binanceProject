import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C46,C48 - Header accessibility', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.header.dropdownIsVisible();
    await homePage.header.searchContentIsVisibleAfterClick();

    await homePage.header.tradeDropdownMenu.hover();
    await homePage.header.tradeDropdownMenu.waitUntilVisible();
    await expect(homePage.header.tradeDropdownMenu.dropdownContainer).toBeVisible();

    await homePage.header.futuresDropdownMenu.hover();
    await homePage.header.futuresDropdownMenu.waitUntilVisible();
    await expect(homePage.header.futuresDropdownMenu.dropdownContainer).toBeVisible();

    await homePage.header.earnDropdownMenu.hover();
    await homePage.header.earnDropdownMenu.waitUntilVisible();
    await expect(homePage.header.earnDropdownMenu.dropdownContainer).toBeVisible();

    await homePage.header.squareDropdownMenu.hover();
    await homePage.header.squareDropdownMenu.waitUntilVisible();
    await expect(homePage.header.squareDropdownMenu.dropdownContainer).toBeVisible();

    await homePage.header.moreDropdownMenu.hover();
    await homePage.header.moreDropdownMenu.waitUntilVisible();
    await expect(homePage.header.moreDropdownMenu.dropdownContainer).toBeVisible();
});