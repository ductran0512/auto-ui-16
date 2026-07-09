import { expect, Page, test } from "@playwright/test";

test(`Verify checkbox`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox');
    await selectCheckBoxByLabel('Apple', 'check', page);
    await expect(page.getByText(`Selected values: Apple`)).toBeVisible();
});

// async function selectCheckBoxByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
//     let xpath = `//label[contains(concat(' ', @class, ' '), 'ant-checkbox-wrapper') and contains(normalize-space(), '${label}')]`;
//     let locator = page.locator(xpath);
//     let checkbox = locator.getByRole('checkbox');
//     let isCurrentChecked = await checkbox.isChecked();
//     if ((isCurrentChecked === true && action === 'uncheck') || (isCurrentChecked === false && action === 'check')) {
//         await page.locator(xpath).click();
//     }
// }

async function selectCheckBoxByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
    let xpath = `//label[contains(concat(' ', @class, ' '), 'ant-checkbox-wrapper') and contains(normalize-space(), '${label}')]`;
    let locator = page.locator(xpath);
    let classes = await locator.getAttribute('class');
    let isChecked = ` ${classes}`.includes(' ant-checkbox-wrapper-checked ')
    if ((isChecked == true && action == 'uncheck') || (isChecked === false && action === 'check')) {
        await page.locator(xpath).click();
    }
}