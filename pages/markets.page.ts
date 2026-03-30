import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { MarketsTopTabsComponent } from './components/markets-top-tabs.component';

export class MarketsPage extends BasePage {
    readonly topTabs: MarketsTopTabsComponent;

    constructor(page: Page) {
        super(page);
        this.topTabs = new MarketsTopTabsComponent(page);
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.binance.com/en/markets/alpha-all', {
            // Using 'domcontentloaded' to make loading faster instead of default 'load' event, which waits for all resources. This is sufficient for our tests that focus on DOM elements.
            waitUntil: 'domcontentloaded',
        });
        
        await this.dismissBlockingOverlays();
    }
}