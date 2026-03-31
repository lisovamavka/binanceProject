import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Shared helper for dismissing blocking overlays that may prevent UI interactions.
    protected async dismissBlockingOverlays() {
        await this.page.locator('div.bn-mask.bn-modal.modalForm').first()
            .waitFor({ state: 'visible', timeout: 12_000 })
            .catch(() => {});
        for (let i = 0; i < 100; i++) {
            await this.page.keyboard.press('Escape');
        }
        await this.page.evaluate(() => {
            document.getElementById('credential_picker_container')?.remove();
            document
                .querySelectorAll('div.bn-mask.bn-modal.modalForm[role="presentation"]')
                .forEach((el) => el.remove());
        });
    }
}