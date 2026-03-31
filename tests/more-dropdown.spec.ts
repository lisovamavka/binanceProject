import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C55 - More dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.header.moreDropdownMenu.hover();
    await homePage.header.moreDropdownMenu.waitUntilVisible();

    await expect(homePage.header.moreDropdownMenu.dropdownContainer).toBeVisible();
    const allOptions = homePage.header.moreDropdownMenu.getItems();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.moreDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();
        await homePage.header.moreDropdownMenu.trialClickOption(option);
    }

    await homePage.header.moreDropdownMenu.hover();
    await homePage.header.moreDropdownMenu.waitUntilVisible();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.moreDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();

        const optionCard = await homePage.header.moreDropdownMenu.getOptionCard(option);
        const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();
        expect(cardText.length).toBeGreaterThan(option.length);
    }

    await homePage.header.moreDropdownMenu.hover();
    await homePage.header.moreDropdownMenu.waitUntilVisible();

    const academyOption = await homePage.header.moreDropdownMenu.getOption('Binance Academy');
    await expect(academyOption).toBeVisible();

    await homePage.header.moreDropdownMenu.clickOption('Binance Academy');
    await expect(page).toHaveURL(/academy/i)
});