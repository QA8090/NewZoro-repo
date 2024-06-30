// pageFixture.ts

import { Page } from "@playwright/test";

let _page: Page;

//Sets the Playwright Page instance to _page.
export function setPage(page: Page): void {
    _page = page;
}

//Retrieves the current Playwright Page instance.
export function getPage(): Page {
    if (!_page) {
        throw new Error('Page is not initialized in pageFixture');
    }
    return _page;
}
