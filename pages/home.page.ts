import { Page, Locator } from "@playwright/test";
import { RootHeader } from "./components/root-header.component";

export class HomePage {
    private page: Page;
    public header: RootHeader;
    public appleLoginButton: Locator;
    private overlayHandlersRegistered = false;

    constructor(page: Page) {
        this.page = page;
        this.header = new RootHeader(page);
        this.appleLoginButton = page.locator('#apple-login > .third-part-btn');
    }

    private async dismissBlockingOverlays() {
        await this.page.locator('div.bn-mask.bn-modal.modalForm').first()
            .waitFor({ state: 'visible', timeout: 12_000 })
            .catch(() => {});
        for (let i = 0; i < 2; i++) {
            await this.page.keyboard.press('Escape');
        }
        await this.page.evaluate(() => {
            document.getElementById('credential_picker_container')?.remove();
            document
                .querySelectorAll('div.bn-mask.bn-modal.modalForm[role="presentation"]')
                .forEach((el) => el.remove());
        });
    }

    async goto() {
        await this.page.goto('https://www.binance.com/en', { waitUntil: 'domcontentloaded' });
        await this.dismissBlockingOverlays();
    }

    async getTitle() {
        return await this.page.title();
    }
}