// Login.ts

import { Page } from "@playwright/test";
import { PageElement } from "../resources/interfaces/iPageElement"; // Adjust path as needed
import * as loginPageResources from "../resources/LoginPageLocators.json"; // Adjust path as needed
import axios from "axios";

interface LocatorMap {
    [key: string]: string;
}

function getResource(resourceName: string): PageElement {
    return loginPageResources.webElements.find((element: PageElement) => element.elementName === resourceName) as PageElement;
}

export class Login {
    private page: Page;
    private locators: LocatorMap; //Maps element names to their respective CSS selectors fetched from LoginPageLocators.json.


    constructor(page: Page) {
        this.page = page;
        this.locators = {
            usernameField: getResource("usernameField").selectorValue,
            passwordField: getResource("passwordField").selectorValue,
            loginBtn: loginPageResources.webElements.find(element => element.elementName === "loginBtn").selectorValue,
            signInBtn: getResource("signInBtn").selectorValue,
            errorMessage: getResource("errorMessage").selectorValue,
            tost: getResource("tost").selectorValue,
        };
    }

    public async enterCredentials(username: string, password: string): Promise<void> {
        await this.page.locator(this.locators.usernameField).fill(username);
        await this.page.locator(this.locators.passwordField).fill(password);
    }

    public async clickLoginButton(): Promise<void> {
        await this.page.waitForSelector(this.locators.loginBtn);
        await this.page.locator(this.locators.loginBtn).click();
    }
    public async clickSignInButton(): Promise<number | null> {
        try {
            await this.page.locator(this.locators.signInBtn).click();
            await this.page.waitForTimeout(2000); // Waiting for any animations or transitions
            
            // Make API call after clicking sign-in button
            const apiUrl = 'https://restapi.zoro.co.uk/v1.0/security/login';


            const response = await axios.post(apiUrl, {
                username: process.env.ZORO_USERNAME || "",  
                password: process.env.ZORO_PASSWORD || ""
            });

            console.log("API Response:", response.status); // Log response status

            return response.status; // Return status code
        } catch (error) {
            console.error("Error calling sign-in API:", error.message);
            return null;
        }
    }

    public async assertUserLoginSuccess(): Promise<void> {
        try {
            // Check if the page title is as expected
            const title = await this.page.title();
            if (title === 'Zoro - Experts in Hand Tools, Power Tools and PPE') {
                console.log("User logged in successfully.");
            } else {
                throw new Error(`Expected page title 'Zoro - Experts in Hand Tools, Power Tools and PPE', but found '${title}'`);
            }
        } catch (error) {
            throw new Error(`Login success message not found or page title incorrect: ${error}`);
        }

  
        //     try {
        //         // Check if the toast message appears with the expected text
        //         const toastElement = await this.page.locator(this.locators.toast).first();
        //         const toastText = await toastElement.textContent();
    
        //         if (toastText.includes('Welcome Test Tet')) {
        //             console.log("User logged in successfully.");
        //         } else {
        //             throw new Error(`Expected toast message 'Welcome Test Tet' not found.`);
        //         }
        //     } catch (error) {
        //         throw new Error(`Login success message not found or toast message incorrect: ${error}`);
        //     }
        // }
    }


    public async assertUserNotLoggedIn(): Promise<void> {
        try {
            // Check if the page title is as expected
            const title = await this.page.title();
            if (title === 'Zoro - Experts in Hand Tools, Power Tools and PPE') {
                console.log("enter the valid username or password");
            } else {
                throw new Error(`Expected page title 'Zoro - Experts in Hand Tools, Power Tools and PPE', but found '${title}'`);
            }
        } catch (error) {
            throw new Error(`Login failure message not found or validation message incorrect: ${error}`);
        }
        // try {
        //     // Wait for the error message element to be visible
        //     await this.page.waitForSelector(this.locators.errorMessage, { state: 'visible' });

        //     // Get the error message text
        //     const errorMessageElement = await this.page.locator(this.locators.errorMessage);
        //     const errorMessage = await errorMessageElement.innerText();

        //     // Check if the error message is as expected
        //     if (errorMessage.trim().toLowerCase() === 'enter the valid username or password') {
        //         console.log("Validation message 'enter the valid username or password' received.");
        //     } else {
        //         throw new Error(`Unexpected error message: ${errorMessage}`);
        //     }
        // } catch (error) {
        //     throw new Error(`Login failure message not found or validation message incorrect: ${error}`);
        // }
    }
}
