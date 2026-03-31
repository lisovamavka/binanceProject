import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C51 - Trade dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.header.tradeDropdownMenu.hover();
    await homePage.header.tradeDropdownMenu.waitUntilVisible();

    await expect(homePage.header.tradeDropdownMenu.dropdownContainer).toBeVisible();
    await expect(homePage.header.tradeDropdownMenu.getSection('Basic')).toBeVisible();
    await expect(homePage.header.tradeDropdownMenu.getSection('Advanced')).toBeVisible();

    const allOptions = homePage.header.tradeDropdownMenu.getItems();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.tradeDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();
        await homePage.header.tradeDropdownMenu.trialClickOption(option);
    }

    await homePage.header.tradeDropdownMenu.hover();
    await homePage.header.tradeDropdownMenu.waitUntilVisible();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.tradeDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();

        const optionCard = await homePage.header.tradeDropdownMenu.getOptionCard(option);
        const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();
        expect(cardText.length).toBeGreaterThan(option.length);
    }

    await homePage.header.tradeDropdownMenu.hover();
    await homePage.header.tradeDropdownMenu.waitUntilVisible();

    const spotLocator = await homePage.header.tradeDropdownMenu.getOption('Spot');
    await expect(spotLocator).toBeVisible();

    await homePage.header.tradeDropdownMenu.clickOption('Spot');
    await expect(page).toHaveURL(/\/(en\/)?trade/i);
});