import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { MarketsTopTabsComponent } from './components/markets-top-tabs.component';

export class MarketsPage extends BasePage {
    readonly topTabs: MarketsTopTabsComponent;
    readonly favoritesTabButton: Locator;
    readonly CryptosTabButton: Locator;
    readonly SpotTabButton: Locator;
    readonly FuturesTabButton: Locator
    readonly AlphaTabButton: Locator;
    readonly NewTabButton: Locator;
    readonly ZonesTabButton: Locator;

    constructor(page: Page) {
        super(page);
        this.topTabs = new MarketsTopTabsComponent(page);
        this.favoritesTabButton = page.locator('#market_sector_Favorites').getByRole('link').filter({ hasText: /^$/ });
        this.CryptosTabButton = page.locator('#market_sector_AllCrypto').getByRole('link').filter({ hasText: /^$/ });
        this.SpotTabButton = page.locator('#market_sector_Spot').getByRole('link').filter({ hasText: /^$/ });
        this.FuturesTabButton = page.locator('#market_sector_Futures').getByRole('link').filter({ hasText: /^$/ });
        this.AlphaTabButton = page.locator('#market_sector_Alpha').getByRole('link').filter({ hasText: /^$/ });
        this.NewTabButton = page.locator('#market_sector_NewListing > .absolute');
        this.ZonesTabButton = page.locator('#market_sector_Zones > .absolute');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.binance.com/en/markets/alpha-all', {
            // Using 'domcontentloaded' to make loading faster instead of default 'load' event, which waits for all resources. This is sufficient for our tests that focus on DOM elements.
            waitUntil: 'domcontentloaded',
        });
        
        await this.dismissBlockingOverlays();
    }

    async verifyMarketPageLoaded() {
        await expect(this.page).toHaveURL(/\/markets/);
    }

    async verifyFavoritesTabButton() {
        await expect(this.favoritesTabButton).toBeVisible();
        await expect(this.favoritesTabButton).toBeEnabled();
    }

    async verifyCryptosTabButton() {
        await expect(this.CryptosTabButton).toBeVisible();
        await expect(this.CryptosTabButton).toBeEnabled();
    }

    async verifySpotTabButton() {
        await expect(this.SpotTabButton).toBeVisible();
        await expect(this.SpotTabButton).toBeEnabled();
    }

    async verifyFuturesTabButton() {
        await expect(this.FuturesTabButton).toBeVisible();
        await expect(this.FuturesTabButton).toBeEnabled();
    }

    async verifyAlphaTabButton() {
        await expect(this.AlphaTabButton).toBeVisible();
        await expect(this.AlphaTabButton).toBeEnabled();
    }
    
    async verifyNewTabButton() {
        await expect(this.NewTabButton).toBeVisible();
        await expect(this.NewTabButton).toBeEnabled();
    }

    async verifyZonesTabButton() {
        await expect(this.ZonesTabButton).toBeVisible();
        await expect(this.ZonesTabButton).toBeEnabled();
    }
}