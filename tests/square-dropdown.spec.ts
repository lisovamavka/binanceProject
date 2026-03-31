import { test, expect } from '@playwright/test' 
import { HomePage } from '../pages/home.page'

test('C54 - Square dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.header.squareDropdownMenu.hover();
    await homePage.header.squareDropdownMenu.waitUntilVisible();

    await expect(homePage.header.squareDropdownMenu.dropdownContainer).toBeVisible();
    const allOptions = homePage.header.squareDropdownMenu.getItems();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.squareDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();
        await homePage.header.squareDropdownMenu.trialClickOption(option);
    }

    await homePage.header.squareDropdownMenu.hover();
    await homePage.header.squareDropdownMenu.waitUntilVisible();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.squareDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();

        const optionCart = await homePage.header.squareDropdownMenu.getOptionCard(option);
        const cardText = (await optionCart.innerText()).replace(/\s+/g, ' ').trim();
        expect(cardText.length).toBeGreaterThan(option.length);
    }

    await homePage.header.squareDropdownMenu.hover();
    await homePage.header.squareDropdownMenu.waitUntilVisible();

    const blogOption = await homePage.header.squareDropdownMenu.getOption('Blog');
    await expect(blogOption).toBeVisible();

    await homePage.header.squareDropdownMenu.clickOption('Blog');
    await expect(page).toHaveURL(/blog/i);
})