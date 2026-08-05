import { expect, Page, test } from "@playwright/test";

test(`Verify table`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
    let expectedHeaders = ['Name', 'Address', 'Tags', 'Age'];
    let tableData = await getTableDataByLabel('Table', expectedHeaders, page);
    await page.waitForTimeout(1000);
});

async function getTableDataByLabel(label: string, expectedHeaders: string[], page: Page) {
    let tableXpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::table)[1]`;
    let tableLocator = page.locator(tableXpath);
    await page.waitForTimeout(500);
    let actualHeaders = await tableLocator.locator('th').allTextContents();
    let listHeaderWithIndex = [];
    for (let expectedHeader of expectedHeaders) {
        let obj = {
            header: expectedHeader,
            index: actualHeaders.indexOf(expectedHeader)
        }
        listHeaderWithIndex.push(obj)
    }

    let rows = await tableLocator.locator('//tbody//tr').all();
    let tableData = [];
    for (let row of rows) {
        let rowData: any = {};
        for (let mapObject of listHeaderWithIndex) {
            let tdXpath = `//td[${mapObject.index + 1}]`;
            let tdValue;
            if (mapObject.header == 'Tags') {
                let tagSelector = '.ant-tag';
                tdValue = await row.locator(tdXpath).locator(tagSelector).allTextContents();
            } else {
                tdValue = await row.locator(tdXpath).textContent();
            }
            rowData[mapObject.header] = tdValue;
        }
        tableData.push(rowData);
    }
    return tableData;
}