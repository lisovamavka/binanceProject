import { Locator, Page } from '@playwright/test';

export class HeaderDropdownComponent {
    private page: Page;
    private dropdownContainer: Locator;
    private items: readonly string[];

    constructor(page: Page, dropdownContainer: Locator, items: readonly string[]) {
        this.page = page;
        this.dropdownContainer = dropdownContainer;
        this.items = items;
    }

    public getItems() {
        return this.items;
    }

    public async getOption(option: string): Promise<Locator> {
        const byLink = this.dropdownContainer.getByRole('link', { name: option, exact: true });
        if (await byLink.count()) {
            return byLink;
        }

        const byMenuItem = this.dropdownContainer.getByRole('menuitem', { name: option, exact: true });
        if (await byMenuItem.count()) {
            return byMenuItem;
        }

        return this.dropdownContainer.getByText(option, { exact: true });
    }

    public async trialClickOption(option: string): Promise<void> {
        const optionLocator = await this.getOption(option);
        await optionLocator.click({ trial: true });
    }

    public async getOptionCard(option: string): Promise<Locator> {
        const optionLocator = await this.getOption(option);
        return optionLocator.locator('xpath=ancestor::*[self::a or self::li][1]');
    }

    public async clickOption(option: string): Promise<void> {
        const optionLocator = await this.getOption(option);
        await optionLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}