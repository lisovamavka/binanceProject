import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Shared helper for dismissing blocking overlays that may prevent UI interactions.
    protected async dismissBlockingOverlays(): Promise<void> {
        const blockingOverlay = this.page.locator('div.bn-mask.bn-modal.modalForm[role="presentation"]');

        try {
            if (await blockingOverlay.isVisible({ timeout: 5000 })) {
                await this.page.keyboard.press('Escape');
                await this.page.keyboard.press('Escape');
            }
        } catch {
            // overlay is not visible
        }

        await this.page.evaluate(() => {
            document.getElementById('credential_picker_container')?.remove();
            document
                .querySelectorAll('div.bn-mask.bn-modal.modalForm[role="presentation"]')
                .forEach((element) => element.remove());
        });
    }
}