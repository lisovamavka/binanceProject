import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('C52 - Futures dropdown', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    // Open dropdown
    await homePage.header.futuresDropdownMenu.hover();
    await homePage.header.futuresDropdownMenu.waitUntilVisible();

    await expect(homePage.header.futuresDropdownMenu.dropdownContainer).toBeVisible();

    const allOptions = homePage.header.futuresDropdownMenu.getItems();

    // 3. Verify that all listed options are visible and clickable
    for (const option of allOptions) {
        const optionLocator = await homePage.header.futuresDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();
        await homePage.header.futuresDropdownMenu.trialClickOption(option);
    }

    // 4. Verify that each option contains a description below the title
    await homePage.header.futuresDropdownMenu.hover();
    await homePage.header.futuresDropdownMenu.waitUntilVisible();

    for (const option of allOptions) {
        const optionLocator = await homePage.header.futuresDropdownMenu.getOption(option);
        await expect(optionLocator).toBeVisible();

        const optionCard = await homePage.header.futuresDropdownMenu.getOptionCard(option);
        const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();

        // The card text should be longer than just the option title, meaning a description is present
        expect(cardText.length).toBeGreaterThan(option.length);
    }

    // 5. Click on any option and verify the redirect
    await homePage.header.futuresDropdownMenu.hover();
    await homePage.header.futuresDropdownMenu.waitUntilVisible();

    const usdMfuturesOption = await homePage.header.futuresDropdownMenu.getOption('USDⓈ-M Futures');
    await expect(usdMfuturesOption).toBeVisible();

    await homePage.header.futuresDropdownMenu.clickOption('USDⓈ-M Futures');

    // The selected option should redirect to the corresponding Futures page with a correct URL
    await expect(page).toHaveURL(/\/(en\/)?futures/i);
});