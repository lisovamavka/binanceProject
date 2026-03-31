import { Page, Locator, expect } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    public header: RootHeader;
    readonly appleLoginButton: Locator;
    readonly googleLoginButton: Locator;
    readonly googleLoginIFrame: Locator;
    readonly signUpButton: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new RootHeader(page);
        this.appleLoginButton = page.locator('#apple-login > .third-part-btn');
        this.googleLoginButton = page.locator('#google-login > .third-part-btn');
        this.googleLoginIFrame = page.locator('iframe[src*="accounts.google.com/gsi/"]');
        this.signUpButton = page.locator('#toRegisterPage').getByText('Sign Up');
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en', { waitUntil: 'domcontentloaded' });
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }

    async verifyAndClickMarketTab() {
        await expect(this.header.markets).toBeVisible();
        await expect(this.header.markets).toBeEnabled();
        await this.header.markets.click();
    }

    async checkAndClickSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toBeEnabled();
        await this.signUpButton.click();
    }
}