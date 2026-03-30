import { test, expect } from '@playwright/test';
import { MarketsPage } from '../pages/markets.page';

test('KAN-16: Verfy top navigation tabs on Markets page', async ({ page }) => {
    const marketsPage = new MarketsPage(page);
    await marketsPage.goto();

    await expect(marketsPage.topTabs.overviewTab).toBeVisible();
    await expect(marketsPage.topTabs.tradingDataTab).toBeVisible();
    await expect(marketsPage.topTabs.aiSelectTab).toBeVisible();
    await expect(marketsPage.topTabs.tokenUnlockTab).toBeVisible();

    await expect(marketsPage.topTabs.overviewTab).toBeEnabled();
    await expect(marketsPage.topTabs.tradingDataTab).toBeEnabled();
    await expect(marketsPage.topTabs.aiSelectTab).toBeEnabled();
    await expect(marketsPage.topTabs.tokenUnlockTab).toBeEnabled();

    await marketsPage.topTabs.clickTradingDataTab();
    await expect(page).toHaveURL('https://www.binance.com/en/markets/trading_data/rankings');

});