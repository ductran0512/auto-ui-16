import { expect, Page, test } from "@playwright/test";
import path from "path";

test(`Verify upload`, async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/upload');
    await uploadImageByLabel('Upload file', 'data/upload/IMG_0937.jpg', page);
    await expect(page.getByText(`IMG_0937.jpg`)).toBeVisible();
});

async function uploadImageByLabel(label: string, filePath: string, page: Page) {
    let xpath = `(//div[@role='separator' and normalize-space()='${label}']/following::input[@type='file'])[1]`;
    let absolutePath = path.join(process.cwd(), filePath);
    await page.locator(xpath).setInputFiles(absolutePath);
}