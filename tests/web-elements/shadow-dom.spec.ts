import { expect, Page, test } from "@playwright/test";

// DOM bình thường
test(`Verify shadow DOM`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    let shadowRoot = page.locator('#my-shadow');
    await shadowRoot.locator('#name-input').fill('Test With Me');
    await shadowRoot.locator('#shadow-btn').click();
    await expect(shadowRoot.getByText("What you just type: Test With Me")).toBeVisible();
});

// Accessibility Tree
test(`Verify shadow DOM v2`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    let shadowRoot = page.locator('#my-shadow');
    await page.getByRole('textbox', { name: 'Name' }).fill('Test With Me');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText("What you just type: Test With Me")).toBeVisible();
});

