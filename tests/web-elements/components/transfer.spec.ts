import { expect, Page, test } from "@playwright/test";

test(`Verify transfer`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');
    let inputs = ['Apple', 'Banana'];
    await transferFromSourceToTargetByLabel('Transfer', inputs, page);
    let sourcePanelItems = await getPanelListByLabel('Transfer', 'Source', page);
    expect(sourcePanelItems).not.toEqual(expect.arrayContaining(inputs))
    let targetPanelItems = await getPanelListByLabel('Transfer', 'Target', page);
    expect(targetPanelItems).toEqual(expect.arrayContaining(inputs))
    await page.waitForTimeout(1000);

    inputs = ['Orange', 'Pineapple'];
    await transferFromTargetToSourceByLabel('Transfer', inputs, page);
    sourcePanelItems = await getPanelListByLabel('Transfer', 'Source', page);
    expect(sourcePanelItems).toEqual(expect.arrayContaining(inputs))
    targetPanelItems = await getPanelListByLabel('Transfer', 'Target', page);
    expect(targetPanelItems).not.toEqual(expect.arrayContaining(inputs))
});

// async function transferByLabel(label: string, source: 'Source' | 'Target', items: string[], page: Page) {
//     let transferXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')])[1]`;
//     let transferLocator = page.locator(transferXpath);
//     let sourcePanel = transferLocator.locator(`//div[contains(concat(" ", @class, " ")," ant-transfer-section ") and .//span[contains(concat(" ", @class, " ")," ant-transfer-list-header-title ") and normalize-space()='${source}']]`);
//     for (let item of items) {
//         let itemXpath = `//li[normalize-space()='${item}']`;
//         await sourcePanel.locator(itemXpath).click();
//     }
//     let direction = source == 'Source' ? 'right' : 'left'
//     let moveButtonXpath = `//button[.//*[@aria-label="${direction}"]]`;
//     await transferLocator.locator(moveButtonXpath).click();
// }

async function transferFromSourceToTargetByLabel(label: string, items: string[], page: Page) {
    let transferXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')])[1]`;
    let transferLocator = page.locator(transferXpath);
    let sourcePanel = transferLocator.locator(`//div[contains(concat(" ", @class, " ")," ant-transfer-section ") and .//span[contains(concat(" ", @class, " ")," ant-transfer-list-header-title ") and normalize-space()='Source']]`);
    for (let item of items) {
        let itemXpath = `//li[normalize-space()='${item}']`;
        await sourcePanel.locator(itemXpath).click();
    }
    let moveButtonXpath = `//button[.//*[@aria-label="right"]]`;
    await transferLocator.locator(moveButtonXpath).click();
}

async function transferFromTargetToSourceByLabel(label: string, items: string[], page: Page) {
    let transferXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')])[1]`;
    let transferLocator = page.locator(transferXpath);
    let targetPanel = transferLocator.locator(`//div[contains(concat(" ", @class, " ")," ant-transfer-section ") and .//span[contains(concat(" ", @class, " ")," ant-transfer-list-header-title ") and normalize-space()='Target']]`);
    for (let item of items) {
        let itemXpath = `//li[normalize-space()='${item}']`;
        await targetPanel.locator(itemXpath).click();
    }
    let moveButtonXpath = `//button[.//*[@aria-label="left"]]`;
    await transferLocator.locator(moveButtonXpath).click();
}

async function getPanelListByLabel(label: string, panel: string, page: Page) {
    let transferXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')])[1]`;
    let transferLocator = page.locator(transferXpath);
    let sourcePanel = transferLocator.locator(`//div[contains(concat(" ", @class, " ")," ant-transfer-section ") and .//span[contains(concat(" ", @class, " ")," ant-transfer-list-header-title ") and normalize-space()='${panel}']]`);
    let items = await sourcePanel.locator('.ant-transfer-list-content-item').allTextContents();
    return items;
}