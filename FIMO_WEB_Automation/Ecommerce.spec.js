const {expect, test}=require("@playwright/test");

test('sample test',async({page})=>{
    test.setTimeout(60000);
await page.goto("https://teststore.automationtesting.co.uk/");
await page.waitForTimeout(3000);
await page.locator('//*[@id="content"]/section[1]/div/div[2]/article/div/div[1]/a').hover();
await page.locator('//*[@id="content"]/section[1]/div/div[2]/article/div/div[1]/div/a').click();
await page.waitForTimeout(2000);
await page.locator("#group_1").click();
//await page.locator('//*[@id="group_1"]/option[3]').click();
await page.locator('//*[@id="add-to-cart-or-refresh"]/div[2]/div/div[2]/button').click();
await page.locator('//*[@id="blockcart-modal"]/div/div/div[2]/div/div[2]/div/div/a').click();
await page.locator("//a[contains(text(),'Proceed to checkout')]").click();
await page.waitForTimeout(2000);
await page.locator("#field-id_gender-1").click();
await page.locator("#field-firstname").fill("CHILKA");
await page.locator("#field-lastname").fill("AJAYKUMAR");
await page.waitForTimeout(2000);
await page.locator('//*[@id="customer-form"]/div/div[4]/label').fill("ajaych1@gmail.com")
await page.locator('//*[@id="customer-form"]/div/div[5]/div/label').fill("Ajay@#!$12345");
await page.locator('//*[@id="customer-form"]/div/div[8]/div[1]/span').click();
await page.waitForTimeout(2000);
await page.locator('//*[@id="customer-form"]/footer/button').click();
await page.locator('//*[@id="delivery-address"]/div/section/div[5]/div[1]').fill("Auro building,16th floor");
//await page.locator("#field-city").click();
await page.waitForTimeout(2000);


})