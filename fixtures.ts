import { test as base, expect } from '@playwright/test';
import { BuySellPage } from './pages/components/buy&sell.page';
import { HomePage } from './pages/home.page';

// Define the type of the app fixtures
type AppFixtures = {
  app: {
    homePage: HomePage;
    buySellPage: BuySellPage;
  };
};

// Extend the base test with the app fixtures
export const test = base.extend<AppFixtures>({
  app: async ({ page }, use) => {
    const app = {
      homePage: new HomePage(page),
      buySellPage: new BuySellPage(page),
    };

    await use(app);
  },
});

export { expect };
