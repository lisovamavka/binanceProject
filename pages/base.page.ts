import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Shared helper for dismissing blocking overlays that may prevent UI interactions.
    protected async dismissBlockingOverlays() {
        await this.page.addLocatorHandler(
            this.page.locator('div.bn-mask.bn-modal.modalForm'),
            async () => {
              await this.page.keyboard.press('Escape');
            },
        );
    }
}