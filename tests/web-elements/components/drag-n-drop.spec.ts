import { expect, Page, test } from "@playwright/test";

test(`Verify drag n drop`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/drag-n-drop');
    await dragAndDropByLabelFromLeftToRight('Drag n Drop', ['Apple', 'Orange'], page);
    await dragAndDropByLabelFromRightToLeft('Drag n Drop', ['Mango', 'Pineapple'], page);
    await page.waitForTimeout(1000);
});

async function dragAndDropByLabelFromLeftToRight(label: string, inputs: string[], page: Page) {
    let leftPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-teal-500 ")])[1]`;
    let leftPanelLocator = page.locator(leftPanelXpath);
    let rightPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-orange-500 ")])[1]`;
    let rightPanelLocator = page.locator(rightPanelXpath);
    for (let input of inputs) {
        let itemXpath = `//button[normalize-space()="${input}"]`;
        await leftPanelLocator.locator(itemXpath).dragTo(rightPanelLocator);
    }
}

async function dragAndDropByLabelFromRightToLeft(label: string, inputs: string[], page: Page) {
    let leftPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-teal-500 ")])[1]`;
    let leftPanelLocator = page.locator(leftPanelXpath);
    let rightPanelXpath = `(//div[@role="separator" and normalize-space()="${label}"]/following::div[contains(concat(" ", @class, " "), " border-orange-500 ")])[1]`;
    let rightPanelLocator = page.locator(rightPanelXpath);
    for (let input of inputs) {
        let itemXpath = `//button[normalize-space()="${input}"]`;
        await rightPanelLocator.locator(itemXpath).dragTo(leftPanelLocator);
    }
}