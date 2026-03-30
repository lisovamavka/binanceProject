import { Page } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";

export class HomePage {
    private page: Page;
    public header: RootHeader;

    constructor(page: Page) {
        this.page = page;
        this.header = new RootHeader(page);
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en');
    }

    async getTitle() {
        return await this.page.title();
    }
}