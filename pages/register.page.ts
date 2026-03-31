import { Page, Locator } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
    public header: RootHeader;
    readonly continueWithGoogleButton: Locator;
    readonly googleLoginIframe: Locator;
    readonly continueWithAppleButton: Locator;
    readonly continueWithTelegramButton: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new RootHeader(page);
        this.continueWithAppleButton = page.getByRole('button', { name: 'Continue with Apple' });
        this.continueWithGoogleButton = page.locator('button[aria-label="Continue with Google"]');
        this.continueWithTelegramButton = page.getByRole('button', { name: 'Continue with Telegram' });
        this.googleLoginIframe = page.locator('iframe[src*="accounts.google.com"]');
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en/register');
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }
}