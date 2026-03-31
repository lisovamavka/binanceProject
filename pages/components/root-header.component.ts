import { expect, Locator, Page } from "@playwright/test";
import { HeaderDropdownComponent } from "./header-dropdown.component";

export class RootHeader {
    private readonly page: Page;
    public readonly headerLocator: Locator;
    
    // navbar locators
    public readonly buyCrypto: Locator;
    public readonly markets: Locator;
    public readonly trade: Locator;
    public readonly futures: Locator;
    public readonly earn: Locator;
    public readonly square: Locator;
    public readonly more: Locator;
    
    // button locators
    public readonly loginButton: Locator;
    public readonly signupButton: Locator;
    public readonly searchInput: Locator;
    public readonly scanToDownloadIcon: Locator;
    public readonly languageIcon: Locator;
    public readonly darkModeIcon: Locator;

    public readonly searchContent: Locator;

    // dropdown objects
    public readonly tradeDropdownMenu: HeaderDropdownComponent;
    public readonly futuresDropdownMenu: HeaderDropdownComponent;
    public readonly earnDropdownMenu: HeaderDropdownComponent;
    public readonly squareDropdownMenu: HeaderDropdownComponent;
    public readonly moreDropdownMenu: HeaderDropdownComponent;

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

        this.tradeDropdownMenu = new HeaderDropdownComponent(page, this.trade, '#ba-trade', [
            'Spot','Margin','P2P','Convert & Block Trade','Demo Trading','DEX','Alpha','Trading Bots','Copy Trading','APIs',
        ] as const);

        this.futuresDropdownMenu = new HeaderDropdownComponent(page, this.futures, '#ba-binanceFutrue', [
            'USDⓈ-M Futures','COIN-M Futures','Options',
        ] as const);

        this.earnDropdownMenu = new HeaderDropdownComponent(page, this.earn, '#ba-Earntitle', ['Overview','Simple Earn','Advanced Earn','Loans',
        ] as const);

        this.squareDropdownMenu = new HeaderDropdownComponent(page, this.square, '#ba-Square', [
            'Square','Blog','Research',
        ] as const);

        this.moreDropdownMenu = new HeaderDropdownComponent(page, this.more, '#ba-moreManagement', [
            'VIP & Institutional','Affiliate','Referral','Binance Junior','Launchpool','Megadrop','Mining Pool','Pay','NFT','Fan Token','Binance Wallet','BNB Chain','Binance Academy','Charity','Travel Rule',
        ] as const);
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

        await this.page.evaluate(() => {
            document.getElementById('credential_picker_container')?.remove();
        });

        await this.searchInput.click();
        await expect(this.searchContent).toBeVisible();
    }
}