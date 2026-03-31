import { Page, Locator, expect } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";
import { BasePage } from "./base.page";

export class RegisterPage extends BasePage {
    public header: RootHeader;

    // username input
    readonly usernameInput: Locator;
    // username hints
    readonly usernameHints: Locator;
    // error messages
    readonly usernameError: Locator;
    readonly emailError: Locator;
    // buttons
    readonly continueButton: Locator;
    readonly continueWithGoogleButton: Locator;
    readonly continueWithAppleButton: Locator;
    readonly continueWithTelegramButton: Locator;
    readonly googleLoginIframe: Locator;
    // dialog window
    readonly dialogWindow: Locator;
    readonly continueButtonDialogWindow: Locator;


    constructor(page: Page) {
        super(page);
        this.header = new RootHeader(page);
        this.usernameInput = page.getByRole('textbox', { name: 'username' });
        this.usernameHints = page.getByRole('listbox', { name: 'Email domain suggestions' });
        this.usernameError = page.getByText('Please enter a valid email or phone number');
        this.emailError = page.getByText('Invalid email address');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.continueWithAppleButton = page.getByRole('button', { name: 'Continue with Apple' });
        this.continueWithGoogleButton = page.locator('button[aria-label="Continue with Google"]');
        this.continueWithTelegramButton = page.getByRole('button', { name: 'Continue with Telegram' });
        this.googleLoginIframe = page.locator('iframe[src*="accounts.google.com"]');
        this.dialogWindow = page.getByRole('dialog', { name: 'modal' });
        this.continueButtonDialogWindow = this.dialogWindow.getByRole('button', { name: 'Connect' });
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en/register');
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }

    async verifyPageUrl() {
        await expect(this.page).toHaveURL(/https:\/\/(www|accounts)\.binance\.com\/en\/register/);
    };

    async checkAndClickTelegramLoginButton() {
        await expect(this.continueWithTelegramButton).toBeVisible();
        await expect(this.continueWithTelegramButton).toBeEnabled();
        await this.continueWithTelegramButton.click();
    };

    async verifyDialogWindowIsOpened() {
        await expect(this.dialogWindow).toBeVisible();
    };

    async verifyContinueButtonDialogWindowAndClick() {
        await expect(this.continueButtonDialogWindow).toBeVisible();
        await expect(this.continueButtonDialogWindow).toBeEnabled();
        await this.continueButtonDialogWindow.click();
    };
}