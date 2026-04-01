import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('C53 - Earn dropdown', () => {
    test('should display Earn dropdown items, descriptions, and navigate to selected option', async ({ page }) => {
        const homePage = new HomePage(page);
        const allOptions = ['Overview', 'Simple Earn', 'Advanced Earn', 'Loans'];

        await test.step('Open home page', async () => {
            await homePage.goto();
        });

        await test.step('Open Earn dropdown', async () => {
            await homePage.header.earnDropdownMenu.hover();
            await homePage.header.earnDropdownMenu.waitUntilVisible();
            await expect(homePage.header.earnDropdownMenu.dropdownContainer).toBeVisible();
        });

        await test.step('Verify all listed options are visible and clickable', async () => {
            for (const option of allOptions) {
                const optionLocator = await homePage.header.earnDropdownMenu.getOption(option);
                await expect(optionLocator).toBeVisible();
                await expect(optionLocator).toBeEnabled();
            }
        });

        await test.step('Verify that each option contains a description below the title', async () => {
            for (const option of allOptions) {
                const optionCard = await homePage.header.earnDropdownMenu.getOptionCard(option);
                const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();

                expect(cardText.length).toBeGreaterThan(option.length);
            }
        });

        await test.step('Click on Simple Earn option and verify redirect', async () => {
            await homePage.header.earnDropdownMenu.hover();
            await homePage.header.earnDropdownMenu.waitUntilVisible();

            const simpleEarnOption = await homePage.header.earnDropdownMenu.getOption('Simple Earn');
            await expect(simpleEarnOption).toBeVisible();
            await expect(simpleEarnOption).toBeEnabled();

            await homePage.header.earnDropdownMenu.clickOption('Simple Earn');
            await expect(page).toHaveURL(/simple-earn/i);
        });
    });
});