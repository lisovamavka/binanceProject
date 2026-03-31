import { Locator, Page } from '@playwright/test';

export class HeaderDropdownComponent {
    private readonly page: Page;
    private readonly trigger: Locator;
    public readonly dropdownContainer: Locator;
    private readonly items: readonly string[];

    constructor(
        page: Page,
        trigger: Locator,
        triggerSelector: string,
        items: readonly string[],
    ) {
        this.page = page;
        this.trigger = trigger;
        this.dropdownContainer = page.locator(
            `.header-menu-item-active:has(${triggerSelector}) > .header-menu-subgrid`,
        );
        this.items = items;
    }

    public getItems() {
        return this.items;
    }

    public async hover(): Promise<void> {
        await this.trigger.hover();
    }

    public async waitUntilVisible(): Promise<void> {
        await this.dropdownContainer.waitFor({ state: 'visible' });
    }

    public getSection(title: string): Locator {
        return this.dropdownContainer.getByText(title, { exact: true });
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
    }
}