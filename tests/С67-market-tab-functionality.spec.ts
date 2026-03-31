import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { MarketsPage } from '../pages/markets.page';

test.describe('Market Tab Functionality', () => {
    test.skip(!!process.env.CI, 'run only locally');

    test('should display the correct market data when a market is selected', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('Navigate to the home page', async () => {
            await homePage.goto();
        });

        await test.step('Click on the Market tab', async () => {
            await homePage.verifyAndClickMarketTab();
        });
        
        const marketsPage = new MarketsPage(page);

        await test.step('Verify that the market page load and displays correctly', async () => {
            await marketsPage.verifyMarketPageLoaded();
        });

        await test.step('Verify favorites tab button is visible and enabled', async () => {
            await marketsPage.verifyFavoritesTabButton();
        });

        await test.step('Verify cryptos tab button is visible and enabled', async () => {
            await marketsPage.verifyCryptosTabButton();
        });
        
        await test.step('Verify spot tab button is visible and enabled', async () => {
            await marketsPage.verifySpotTabButton();
        });

        await test.step('Verify futures tab button is visible and enabled', async () => {
            await marketsPage.verifyFuturesTabButton();
        });

        await test.step('Verify alpha tab button is visible and enabled', async () => {
            await marketsPage.verifyAlphaTabButton();
        });

        await test.step('Verify new tab button is visible and enabled', async () => {
            await marketsPage.verifyNewTabButton();
        });

        await test.step('Verify zones tab button is visible and enabled', async () => {
            await marketsPage.verifyZonesTabButton();
        });

    });
});