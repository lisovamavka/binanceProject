import { expect, Locator, Page } from "@playwright/test";
import { HeaderDropdownComponent } from "./header-dropdown.component";


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
    
    // button locators
    public loginButton: Locator;
    public signupButton: Locator;
    public searchInput: Locator;
    public scanToDownloadIcon: Locator;
    public languageIcon: Locator;
    public darkModeIcon: Locator;

    // dropdown locators
    public tradeDropdown: Locator;
    public futuresDropdown: Locator;
    public earnDropdown: Locator;
    public squareDropdown: Locator;
    public moreDropdown: Locator;
    public searchContent: Locator;

    // dropdown objects
    public tradeDropdownMenu: HeaderDropdownComponent;
    public futuresDropdownMenu: HeaderDropdownComponent;
    public earnDropdownMenu: HeaderDropdownComponent;
    public squareDropdownMenu: HeaderDropdownComponent;
    public moreDropdownMenu: HeaderDropdownComponent;

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

        this.tradeDropdownMenu = new HeaderDropdownComponent(page, this.tradeDropdown, [
        'Spot','Margin','P2P','Convert & Block Trade','Demo Trading','DEX','Alpha','Trading Bots','Copy Trading','APIs',
        ] as const);

        this.futuresDropdownMenu = new HeaderDropdownComponent(page, this.futuresDropdown, ['USDⓈ-M Futures','COIN-M Futures','Options',
        ] as const);

        this.earnDropdownMenu = new HeaderDropdownComponent(page, this.earnDropdown, [
        'Overview','Simple Earn','Advanced Earn', 'Loans',
        ] as const);

        this.squareDropdownMenu = new HeaderDropdownComponent(page, this.squareDropdown, ['Square','Blog','Research',
        ] as const);

        this.moreDropdownMenu = new HeaderDropdownComponent(page, this.moreDropdown, ['VIP & Institutional','Affiliate','Referral','Binance Junior','Launchpool','Megadrop','Mining Pool','Pay','NFT','Fan Token','Binance Wallet','BNB Chain','Binance Academy','Charity','Travel Rule',
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

    public async tradeDropdownIsVisible() {
        await this.trade.hover();
        await expect(this.tradeDropdown).toBeVisible();
        await expect(this.tradeDropdown.getByText('Basic', { exact: true })).toBeVisible();
        await expect(this.tradeDropdown.getByText('Advanced', { exact: true })).toBeVisible();

        for (const option of this.tradeDropdownMenu.getItems()) {
            await this.tradeDropdownMenu.trialClickOption(option);
        }
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