import { Page, Locator, expect } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    public header: RootHeader;
    readonly appleLoginButton: Locator;
    readonly themeToggleButton: Locator;
    private overlayHandlersRegistered = false;

    constructor(page: Page) {
        super(page);
        this.header = new RootHeader(page);
        this.appleLoginButton = page.locator('#apple-login > .third-part-btn');
        this.themeToggleButton = page.locator('.bn-svg.theme-icon');
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en', { waitUntil: 'domcontentloaded' });
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }

    async verifyButtonAndSwitchTheme() {
        await expect(this.themeToggleButton).toBeVisible();
        await expect(this.themeToggleButton).toBeEnabled();
        await this.themeToggleButton.click();
    }
}