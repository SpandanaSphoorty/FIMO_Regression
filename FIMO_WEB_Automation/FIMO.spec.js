
const { test, expect } = require('@playwright/test');

test.setTimeout(100000);
test('FIMOTEST', async ({ browser }) => {   
    // Create a browser context with HTTPS errors ignored
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });
   // const browser = await chromium.launch({ headless: false });
    const page = await context.newPage();
    await page.goto("https://qa-fimo.spandanasphoorty.com/Fimo_UAT/Master.aspx");
    await page.locator("[id='txtLoginName']").fill("sf0098003");//sf0057696
    await page.locator("[id='txtPassword']").fill("Ssfl@2021"); 
    await page.locator("[id='btnlogin']").click();
   // await expect(page.locator("[id='welcomeMessage']")).toBeVisible(); // Update `welcomeMessage` with the correct selector
   await page.waitForTimeout(2000);
   await page.locator("//span[contains(text(),'Loans')]").click();
   await page.waitForTimeout(1000);
   await page.locator('//*[@id="arrow707"]').click();
   await page.waitForTimeout(1000);
   await page.locator("//div[contains(text(),'KYC & Loan Details Verification')]").click();

   //await page.locator("//table[@id='tbletails']//tbody/tr/td[text()='+loginRecord.FormNo+']/parent::tr//span[@class='ui-icon ui-icon-video']").click();

   await page.waitForTimeout(2000);
  
   var iFrame = page.frameLocator('[id="ifmMain"]');
   await iFrame.locator("//input[contains(@id,'txtBranch')]").click();
   await page.waitForTimeout(2000);
   await iFrame.locator("//input[contains(@id,'txtBranch')]").fill("Rep");
   await page.waitForTimeout(2000);
   await iFrame.locator("//a[contains(text(),'Repalle(APGL0025)|195')]").click();
   await iFrame.locator("//td[contains(text(),'8719')]").click();
   await page.waitForTimeout(3000);

   const [newPage]= await Promise.all(
    [context.waitForEvent('page'),//listen any new pages pending,rejected,fulfilled
   await iFrame.locator(".ui-icon-video").click(),
   await page.waitForTimeout(15000)
     ])  //new page is opened
 
   await newPage.locator("#ui-accordion-accordian-header-1").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//input[@id="ChkBank"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="ChkCusBank"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="ChkIFSC"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator("#ui-accordion-accordian-header-2").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="Checkbox1"]').click();
   await newPage.locator('//*[@id="Checkbox2"]').click();
   await newPage.locator('//*[@id="ChkDeemed"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator("#ui-accordion-accordian-header-3").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="statuscheckbox"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator("#ui-accordion-accordian-header-5").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="Checkbox3"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator("//span[contains(text(),'Update')]").click();
   await page.waitForTimeout(2000);

    //await context.close();
});

