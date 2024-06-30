// hooks.ts

import { After, AfterAll, Before, BeforeAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { Browser, chromium, Page, BrowserContext } from "@playwright/test";
import { setPage, getPage } from "./pageFixture"; 
import { config } from "../../../playwright.config"; 

let browser: Browser;
let context: BrowserContext;

//Initializes the browser before any tests run.
BeforeAll(async function () {
    browser = await chromium.launch(config); 
    
});

// Sets up a new browser context and page before each test
Before(async function () {
    context = await browser.newContext({ viewport: null,  recordVideo: { dir: 'test-result/reports/videos' } });
    const page = await context.newPage();
    setPage(page); 
});

//Handles actions after each test, such as taking screenshots and closing the page.
After(async function ({ pickle, result }) {
    console.log(result?.status);
    if (result?.status === Status.PASSED) {
        const img = await getPage().screenshot({ path: `./test-result/screenshots/${pickle.name}.png`, type: "png" });
        await this.attach(img, "image/png");
        await getPage().close();
    }
});
//Cleans up after all tests have run.
AfterAll(async function () {
    await browser.close();
});
