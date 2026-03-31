import { Page, Locator } from "@playwright/test";

export class BuySellPage {
    private page: Page;
    public spendInput: Locator;
    public receiveInput: Locator;
    public sellTab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.spendInput = page.locator('input[data-cy="input-fiat-amount"]');
        this.receiveInput = page.locator('input[data-cy="input-crypto-amount"]');
        this.sellTab = page.locator('//span[text()="Sell"]');
    }

    async clickSellTab(): Promise<void> {
        await this.sellTab.click({ force: true });
    }
}