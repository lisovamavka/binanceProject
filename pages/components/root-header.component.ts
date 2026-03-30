import { expect, Locator, Page } from "@playwright/test";


export class RootHeader {
    // page locator
    private page: Page;
    public headerLocator: Locator;
    
    // navbar locators
    public buyCrypto: Locator;
    public markets: Locator;
    public trade: Locator;
    public futures: Locator;
    public earn: Locator;
    public square: Locator;
    public more: Locator;
    
    //button locators
    public loginButton: Locator;
    public signupButton: Locator;
    public searchInput: Locator;
    public scanToDownloadIcon: Locator;
    public languageIcon: Locator;
    public darkModeIcon: Locator;

    //dropdown locators
    public tradeDropdown: Locator;
    public futuresDropdown: Locator;
    public earnDropdown: Locator;
    public squareDropdown: Locator;
    public moreDropdown: Locator;
    public searchContent: Locator;
    private readonly basicTradeOptions = ['Spot', 'Margin', 'P2P', 'Convert & Block Trade', 'Demo Trading'] as const;
    private readonly advancedTradeOptions = ['DEX', 'Alpha', 'Trading Bots', 'Copy Trading', 'APIs'] as const;


    constructor(page: Page) {
        this.page = page;
        this.headerLocator = page.getByRole('banner');
        this.buyCrypto = page.locator('#ba-titile2-2');
        this.markets = page.locator('#ba-tableMarkets');
        this.trade = page.locator('#ba-trade');
        this.futures = page.locator('#ba-binanceFutrue');
        this.earn = page.locator('#ba-Earntitle');
        this.square = page.getByRole('link', { name: 'Square', exact: true });
        this.more = page.locator('#ba-moreManagement');
        
        this.loginButton = page.locator('#toLoginPage').getByRole('button', { name: 'Log In' });
        this.signupButton = page.locator('#toRegisterPage').getByText('Sign Up');
        this.searchInput = page.locator('.search-icon');
        this.scanToDownloadIcon = page.locator('.header-menu-rightItem > .bn-svg').first();
        this.languageIcon = page.locator('.header-menu-rightItem > .bn-svg').nth(1);
        this.darkModeIcon = page.locator('.header-menu-rightItem > .bn-svg').nth(2);

        this.searchContent = page.locator('.header-search-content');

        this.tradeDropdown = page.locator('.header-menu-item-active:has(#ba-trade) > .header-menu-subgrid');
        this.futuresDropdown = page.locator('.header-menu-item-active:has(#ba-binanceFutrue) > .header-menu-subgrid');
        this.earnDropdown = page.locator('.header-menu-item-active:has(#ba-Earntitle) > .header-menu-subgrid');
        this.squareDropdown = page.locator('.header-menu-item-active:has(#ba-Square) > .header-menu-subgrid');
        this.moreDropdown = page.locator('.header-menu-item-active:has(#ba-moreManagement) > .header-menu-subgrid');
        
    }

    public async dropdownIsVisible() {
        await expect(this.headerLocator).toBeVisible();
        await expect(this.buyCrypto).toBeVisible();
        await expect(this.markets).toBeVisible();
        await expect(this.trade).toBeVisible();
        await expect(this.futures).toBeVisible();
        await expect(this.earn).toBeVisible();
        await expect(this.square).toBeVisible();
        await expect(this.more).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.signupButton).toBeVisible();
        await expect(this.searchInput).toBeVisible();
        await expect(this.scanToDownloadIcon).toBeVisible();
        await expect(this.languageIcon).toBeVisible();
        await expect(this.darkModeIcon).toBeVisible();
    }

    public async searchContentIsVisibleAfterClick() {
        await this.page.keyboard.press('Escape');
        // somehow search panel in headless mode is blocked by google popup
        // remove credential_picker_container if shown
        await this.page.evaluate(() => {
            document.getElementById('credential_picker_container')?.remove();
        });
        await this.searchInput.click();
        await expect(this.searchContent).toBeVisible();
    }

    public async tradeDropdownOptionsAreVisible(locator: Locator) {
        await expect(locator).toBeVisible();
        await locator.click({ trial: true });
    }

    public getTradeOption(option: string): Locator {
        const byLink = this.tradeDropdown.getByRole('link', { name: option, exact: true });
        const byMenuItem = this.tradeDropdown.getByRole('menuitem', { name: option, exact: true });
        const byText = this.tradeDropdown.getByText(option, { exact: true });
        return byLink.or(byMenuItem).or(byText).first();
    }

    public async tradeDropdownIsVisible() {
        await this.trade.hover();
        await expect(this.tradeDropdown).toBeVisible();
        await expect(this.tradeDropdown.getByText('Basic', { exact: true })).toBeVisible();
        await expect(this.tradeDropdown.getByText('Advanced', { exact: true })).toBeVisible();

        for (const option of this.basicTradeOptions) {
            await this.tradeDropdownOptionsAreVisible(this.getTradeOption(option));
        }

        for (const option of this.advancedTradeOptions) {
            await this.tradeDropdownOptionsAreVisible(this.getTradeOption(option));
        }
    }

    public async tradeOptionsHaveDescriptions() {
        await this.trade.hover();
        await expect(this.tradeDropdown).toBeVisible();

        const allOptions = [...this.basicTradeOptions, ...this.advancedTradeOptions];
        for (const option of allOptions) {
            const optionLocator = this.getTradeOption(option);
            await expect(optionLocator).toBeVisible();
            // Read the whole option card text (title + description), not only the title node.
            const optionCard = optionLocator.locator('xpath=ancestor::*[self::a or self::li][1]');
            const cardText = (await optionCard.innerText()).replace(/\s+/g, ' ').trim();
            expect(cardText.length).toBeGreaterThan(option.length);
        }
    }

    public async clickSpotAndVerifyRedirect() {
        await this.trade.hover();
        const spotOption = this.getTradeOption('Spot');
        await expect(spotOption).toBeVisible();
        await spotOption.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page).toHaveURL(/\/(en\/)?trade/i);
    }

    public async futuresDropdownIsVisible() {
        await this.futures.hover();
        await expect(this.futuresDropdown).toBeVisible();
    }

    public async earnDropdownIsVisible() {
        await this.earn.hover();
        await expect(this.earnDropdown).toBeVisible();
    }

    public async squareDropdownIsVisible() {
        await this.square.hover();
        await expect(this.squareDropdown).toBeVisible();
    }

    public async moreDropdownIsVisible() {
        await this.more.hover();
        await expect(this.moreDropdown).toBeVisible();
    }

}
