import { Locator, Page } from '@playwright/test';

export class MarketsTopTabsComponent {
    private page: Page;

    readonly overviewTab: Locator;
    readonly tradingDataTab: Locator;
    readonly aiSelectTab: Locator;
    readonly tokenUnlockTab: Locator;

    constructor(page: Page) {
        this.page = page;

        this.overviewTab = page.getByRole('link', { name: 'Overview', exact: true });
        this.tradingDataTab = page.getByRole('link', { name: 'Trading Data', exact: true });
        this.aiSelectTab = page.getByRole('link', { name: 'AI Select', exact: true });
        this.tokenUnlockTab = page.getByRole('link', { name: 'Token Unlock', exact: true });
    }

    async waitUntilLoaded(): Promise<void> {
        await this.overviewTab.waitFor({ state: 'visible', timeout: 15000 });
    }

    async clickTradingDataTab(): Promise<void> {
        await this.tradingDataTab.click();
    }
}
