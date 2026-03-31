import test, { expect} from "@playwright/test";
import { RegisterPage } from "../pages/register.page";

const invalidCredentials = [
    '   ',
    '',
    '1',
    '12',
    '123',
    '1234',
    '12345', // fails - binance thinks it is valid phone number, likely defect
    '09635t4333',
    'test@test',
    'test@tes',
    'test@123'
];

const validCredentials = [
    '+380963524333',
    '0963524333',
    'y4uk.v@gmail.com',
    'y4uk.v@gmail.co',
];

// Helper function to check if the credential is potentially an email
function isPotentiallyEmail(email: string): boolean {
    return email.includes('@');
}

// Helper function to expect the error message based on the credential type
const expectErrorMessage = (page: RegisterPage, credential: string) => {
    return isPotentiallyEmail(credential) ? expect(page.emailError) : expect(page.usernameError);
}

test.describe('C57,C58 - Email validation - Invalid credentials', () => {
    for (const credential of invalidCredentials) {
        test(`Invalid credential: ${credential}`, async ({ page}) => {
            const registerPage = new RegisterPage(page);
            await registerPage.goto();
            await registerPage.usernameInput.fill(credential);
            await registerPage.usernameInput.blur();
            // Close the hint by clicking on the body
            await registerPage.page.locator('body').click({ position: { x: 0, y: 0 } });
            await expect(registerPage.usernameHints).toBeHidden();
            await registerPage.continueButton.click();
            await expectErrorMessage(registerPage, credential).toBeVisible();
        });
    }
});

test.describe('C57,C58 - Email validation - Valid credentials', () => {
    for (const credential of validCredentials) {
        test(`Valid credential: ${credential}`, async ({ page }) => {
            const registerPage = new RegisterPage(page);
            await registerPage.goto();
            await registerPage.usernameInput.fill(credential);
            await registerPage.usernameInput.blur();
            // Close the hint by clicking on the body
            await registerPage.page.locator('body').click({ position: { x: 0, y: 0 } });
            await expect(registerPage.usernameHints).toBeHidden();
            await registerPage.continueButton.click();
            await expectErrorMessage(registerPage, credential).toBeHidden();
        });
    }
});