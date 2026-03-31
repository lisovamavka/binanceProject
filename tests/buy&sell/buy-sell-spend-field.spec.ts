import { test, expect } from '../../fixtures';

test.describe('Buy & Sell & Spend field', () => {
    const BaseUrl = 'https://www.binance.com/en';

    test.beforeEach('opens Trade dropdown from home page', async ({ page, app }) => {
        await app.homePage.goto();
        await app.homePage.buyCryptoMenuItem.click();
        await expect(page).toHaveURL(`${BaseUrl}/crypto/buy/USD/BTC`);
    });

    async function cleanSpendField(app) {
        await app.buySellPage.spendInput.clear();
        await expect(app.buySellPage.spendInput).toHaveValue('');
    };

    test('C62 - Verify that user cannot enter letters in "Spend" field (Buy)', async ({ page, app }) => {
        await cleanSpendField(app);
        const invalidData = 'abc';
        const expectedValue = '';

        // Here start my test
        await test.step('Observe the "Spend" and "Receive" fields', async () => {
            await expect(app.buySellPage.spendInput).toHaveAttribute('placeholder', 'Enter Amount');
            await expect(app.buySellPage.receiveInput).toHaveAttribute('placeholder', '0');
        });

        await test.step('Enter a valid amount in the "Spend" field', async () => {
            await app.buySellPage.spendInput.fill(invalidData);
            await expect(app.buySellPage.spendInput).toHaveValue(expectedValue);
        });
    });

    test('C63 - Verify maximum allowed input value in "Spend" field (Buy)', async ({ page, app }) => {
        await cleanSpendField(app);
        const validData = '12,222,222,222';
        const expectedValue = validData;
        const number = '1';

        // Here start my test
        await test.step('Observe the "Spend" and "Receive" fields', async () => {
            await expect(app.buySellPage.spendInput).toHaveAttribute('placeholder', 'Enter Amount');
            await expect(app.buySellPage.receiveInput).toHaveAttribute('placeholder', '0');
            await expect(app.buySellPage.receiveInput).toHaveValue('');
        });

        await test.step('Enter a large numeric value (e.g., 12,222,222,222)', async () => {
            await app.buySellPage.spendInput.type(validData);
            await expect(app.buySellPage.spendInput).toHaveValue(expectedValue);
        });

        test.step('Continue entering more digits', async () => {
            await app.buySellPage.spendInput.type(number);
            await expect(app.buySellPage.spendInput).not.toHaveValue(number);
        });
    });

    test('C65 - Verify maximum allowed input value in "Spend" field (Sell)', async ({ page, app }) => {
        await app.buySellPage.clickSellTab();
        await cleanSpendField(app);
        const validData = '12,222,222,222';
        const expectedValue = validData;
        const number = '1';

        // Here start my test
        await test.step('Observe the "Spend" and "Receive" fields', async () => {
            await expect(app.buySellPage.spendInput).toHaveAttribute('placeholder', 'Enter Amount');
            await expect(app.buySellPage.receiveInput).toHaveAttribute('placeholder', '0');
            await expect(app.buySellPage.receiveInput).toHaveValue('');
        });

        await test.step('Enter a large numeric value (e.g., 12,222,222,222)', async () => {
            await app.buySellPage.spendInput.type(validData);
            await expect(app.buySellPage.spendInput).toHaveValue(expectedValue);
        });

        test.step('Continue entering more digits', async () => {
            await app.buySellPage.spendInput.type(number);
            await expect(app.buySellPage.spendInput).not.toHaveValue(number);
        });
    });
});

