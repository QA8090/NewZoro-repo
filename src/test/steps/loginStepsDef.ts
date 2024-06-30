// loginStepsDef.ts

import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { getPage } from "../hooks/pageFixture";
import { Login } from "../pages/LoginPage"; // Corrected import path
import { Page } from "@playwright/test";

// Set a default timeout for your test scenarios
setDefaultTimeout(150000);

let loginPage: Login;

Given('the user lands at the webpage.', async function () {
    const page: Page = getPage(); 
    loginPage = new Login(page);
    await page.goto('https://www.zoro.co.uk/');

    // Add code to accept cookies
    try {
        const acceptCookiesButton = await page.locator("//button[@id='onetrust-accept-btn-handler']");
        if (acceptCookiesButton) {
            await acceptCookiesButton.click();
            console.log("Accepted cookies.");
        } else {
            console.log("Accept cookies button not found.");
        }
    } catch (error) {
        console.error('Error accepting cookies:', error);
        // Handle errors if necessary
    }
});

When('User goes to the website & click on login button', async function () {
    await loginPage.clickLoginButton();
});

When('user enters correct {string} and {string}.', async function (username: string, password: string) {
    await loginPage.enterCredentials(username, password);
});

When('user enters incorrect {string} and {string}.', async function (username: string, password: string) {
    await loginPage.enterCredentials(username, password);
});

When('user clicks on signIn button', async function () {
    await loginPage.clickSignInButton();
});

Then('The user is logged in.', async function () {
    const successMessage = await loginPage.assertUserLoginSuccess();
    console.log("User logged in successfully:", successMessage);

});

Then('The user is not logged in.', async function () {
    const errorMessage = await loginPage.assertUserNotLoggedIn();
    console.log("Login failed:", errorMessage);
});
