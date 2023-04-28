import { test, page, expect } from '@playwright/test';
import { chromium } from 'playwright';

const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];  

const caps = {
  'browser': 'playwright-firefox',
  'os': 'os x',
  'os_version': 'big sur',
  'name': 'Playwright',
  'build': process.env.BROWSERSTACK_BUILD_NAME,
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'browserstack.local': true,
  'client.playwrightVersion': clientPlaywrightVersion
};

test('firstTest',async () => {
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
    headless: true
});
  const page = await browser.newPage();
  await page.goto("https://bstackdemo.com/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.locator("#username svg").click();
  await page.locator("#react-select-2-option-0-0").click();
  await page.locator("#password svg").click();
  await page.locator("#react-select-3-option-0-0").click();
  await page.getByRole("button", { name: "Log In" }).click();
  await page.locator('[id="\\31 "]').getByText("Add to cart").click();
  await page.getByText("Samsung").click();
  await page.locator('[id="\\31 5"]').getByText("Add to cart").click();
  await page.getByText("Checkout").click();
  await page.getByLabel("First Name").click();
  await page.getByLabel("First Name").fill("Adarsh");
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill("T S");
  await page.getByLabel("Address").click();
  await page.getByLabel("Address").fill("ABC");
  await page.getByLabel("State/Province").click();
  await page.getByLabel("State/Province").fill("KL");
  await page.getByLabel("Postal Code").click();
  await page.getByLabel("Postal Code").fill("555555");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator(".form-legend")).toHaveText("Your Order has been successfully placed.");
  await browser.close();
});
