import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C51 - Trade dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.header.trade.hover();
    await homePage.header.tradeDropdown.waitFor({ state: 'visible' });
    await expect(homePage.header.tradeDropdown).toBeVisible();
    await expect(homePage.header.tradeDropdown.getByText('Basic', { exact: true })).toBeVisible();
    await expect(homePage.header.tradeDropdown.getByText('Advanced', { exact: true })).toBeVisible();

    const allOptions = homePage.header.tradeDropdownMenu.getItems();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.tradeDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();
        await homePage.header.tradeDropdownMenu.trialClickOption(option);
    }

    await homePage.header.trade.hover();
    await homePage.header.tradeDropdown.waitFor({ state: 'visible' });

    for (const option of allOptions) {
        const optionLocator = await homePage.header.tradeDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();

        const optionCard = await homePage.header.tradeDropdownMenu.getOptionCard(option);
        const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();
        expect(cardText.length).toBeGreaterThan(option.length);
    }

    await homePage.header.trade.hover();
    await homePage.header.tradeDropdown.waitFor({ state: 'visible' });

    const spotLocator = await homePage.header.tradeDropdownMenu.getOption('Spot');
    await expect(spotLocator).toBeVisible();

    await homePage.header.tradeDropdownMenu.clickOption('Spot');
    await expect(page).toHaveURL(/\/(en\/)?trade/i);
});
