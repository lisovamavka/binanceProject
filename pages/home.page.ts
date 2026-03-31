import { Page, Locator, expect } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    public header: RootHeader;
    readonly appleLoginButton: Locator;
    readonly googleLoginButton: Locator;
    readonly googleLoginIFrame: Locator;
    readonly signUpButton: Locator;
    readonly buyCryptoMenuItem: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new RootHeader(page);
        this.appleLoginButton = page.locator('#apple-login > .third-part-btn');
        this.googleLoginButton = page.locator('#google-login > .third-part-btn');
        this.googleLoginIFrame = page.locator('iframe[src*="accounts.google.com/gsi/"]');
        this.signUpButton = page.locator('#toRegisterPage').getByText('Sign Up');
         this.buyCryptoMenuItem = page.locator('#ba-titile2-2');
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en', { waitUntil: 'domcontentloaded' });
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }

    async checkAndClickSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toBeEnabled();
        await this.signUpButton.click();
    }
}