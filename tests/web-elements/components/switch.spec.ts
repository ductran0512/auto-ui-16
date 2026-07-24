import { expect, Page, test } from "@playwright/test";

test(`Verify switch`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/switch');
    await selectSwitchByLabel('Switch', 'check', page);
    await expect(page.getByText(`Current Value: true`)).toBeVisible();
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

async function selectSwitchByLabel(label: string, action: 'check' | 'uncheck', page: Page) {
    let xpath = `(//div[@role='separator' and normalize-space() = '${label}']/following::*[@role='switch'])[1]`;
    let locator = page.locator(xpath);
    let checked = await locator.getAttribute('aria-checked');
    if ((checked == 'true' && action == 'uncheck') || (checked === 'false' && action === 'check')) {
        await page.locator(xpath).click();
    }
}