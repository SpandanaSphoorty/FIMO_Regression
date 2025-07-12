const {expect,test} = require('@playwright/test');
import fs from "fs";
import { parse } from "csv-parse/sync";

const LoginRecords=parse(fs.readFileSync("tests/Fimo loginPage.csv"),{
  columns:true,
  skip_empty_lines:true,
  bom:true
});
test('Sample Test',async ({browser})=>{    
  const context = await browser.newContext({ignoreHTTPSErrors: true,});    
  const page = await context.newPage();
 
    test.setTimeout(150000);

    for (const loginRecord of LoginRecords) {
    const loginUrl = loginRecord.LoginURL; 
    console.log(`Navigating to URL: ${loginUrl}`);
    await page.goto(loginUrl);
    await page.waitForTimeout(1000);

    await page.locator('//*[@id="txtLoginName"]').fill(loginRecord.FimoUser);
    await page.locator("//*[@id='txtPassword']").fill(loginRecord.FMpassword);
    await page.locator("#btnlogin").click();
    await page.waitForTimeout(1000);
    
   await page.locator("//span[contains(text(),'Loans')]").click();
   await page.waitForTimeout(1000);
   await page.locator('//*[@id="arrow707"]').click();
   await page.waitForTimeout(1000);
   await page.locator("//div[contains(text(),'KYC & Loan Details Verification')]").click();
   await page.waitForTimeout(1000);

   var iFrame = page.frameLocator('[id="ifmMain"]');
   await iFrame.locator("//input[contains(@id,'txtBranch')]").click();
   await page.waitForTimeout(1000);
   await iFrame.locator("//input[contains(@id,'txtBranch')]").fill(loginRecord.Branch);
   await page.waitForTimeout(1000);

   const branchNameLocator = iFrame.locator(`//a[contains(text(),'${loginRecord.BranchName}')]`);
   await branchNameLocator.waitFor({ state: 'visible', timeout: 3000 });
   await branchNameLocator.click();
   await page.waitForTimeout(2000);

   const groupID = loginRecord.GroupID;
  // const villageLocator = iFrame.locator(`//td[contains(text(),'${VillageID}')]`);
   const villageLocator = iFrame.locator(`//td[@title="${groupID}"]`);
   await villageLocator.waitFor({ state: 'visible', timeout: 3000 });
   await villageLocator.click();
   console.log(`Successfully clicked GROUPID: ${groupID}`);
   await page.waitForTimeout(2000);
   
   const formNo = loginRecord.FormNo;
   const videoIconLocator = iFrame.locator(
     `//table[@id='tbletails']//tbody/tr/td[text()='${formNo}']/parent::tr//span[@class='ui-icon ui-icon-video']`);
   await videoIconLocator.waitFor({ state: 'visible', timeout: 5000 });
   
   const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    videoIconLocator.click(),
    ]);
    await page.waitForTimeout(12000);
  
   await newPage.locator("#ui-accordion-accordian-header-1").click();
   await page.waitForTimeout(2000);
   await newPage.locator('//input[@id="ChkBank"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="ChkCusBank"]').click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="ChkIFSC"]').click();
   await page.waitForTimeout(2000);
   await newPage.locator("#ui-accordion-accordian-header-2").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="Checkbox1"]').click();
   await newPage.locator('//*[@id="Checkbox2"]').click();
   await newPage.locator('//*[@id="ChkDeemed"]').click();

  const dropdown = newPage.locator("#ddlOccupation");
await dropdown.selectOption('Agriculture');
const selectedOption = await dropdown.inputValue();
console.log(`Selected option: ${selectedOption}`);
 
   await page.waitForTimeout(4000);
   await newPage.locator("#ui-accordion-accordian-header-3").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="statuscheckbox"]').click();
   await page.waitForTimeout(1000);

  // await newPage.locator('#fileToUpload').click();
   await page.waitForTimeout(2000);
   await newPage.locator('#fileToUpload').setInputFiles('C:\\Testing\\PLAY-Wright\\tests\\sunflower.jpg');
   await page.waitForTimeout(2000);
   
   newPage.on('dialog', async (dialog) => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept(); 
  });
   await page.waitForTimeout(2000);
   await newPage.locator("#ui-accordion-accordian-header-5").click();
   await page.waitForTimeout(1000);
   await newPage.locator('//*[@id="Checkbox3"]').click();
   await page.waitForTimeout(2000);

   const accordionHeader = newPage.locator('#ui-accordion-accordian-header-11');
const isVisible = await accordionHeader.isVisible();
if (isVisible) {
  console.log('Element is available, clicking on it...');
  await accordionHeader.click(); 
  await newPage.locator("//span[contains(text(),'New UCIC')]").click();
} else {
  console.log('Element is not available, moving to the next step...');
}
await page.waitForTimeout(2000);
await newPage.locator("//span[contains(text(),'Update')]").click();
await page.waitForTimeout(3000);
await newPage.close();
}
const lastLoginRecord = LoginRecords[LoginRecords.length - 1];
const formNo = lastLoginRecord.FormNo;

const dropdownLocator = iFrame.locator(
  `//table[@id='tbletails']//tbody/tr/td[text()='${formNo}']/following-sibling::td//select[contains(@id,'ddlAuthanticate')]`);

   await dropdownLocator.waitFor({ state: 'visible', timeout: 60000 });
   console.log(`Dropdown for FormNo ${formNo} found.`);

   const options = await dropdownLocator.locator('option').allTextContents();
   console.log('Dropdown options:', options); 

   await dropdownLocator.selectOption({ label: 'Authenticate' });
   await page.waitForTimeout(2000);
   const selectedOption = await dropdownLocator.inputValue();
   console.log(`Selected option: ${selectedOption}`);

 /*var isOptionAvailable = options.some(option => option.trim() === 'Authenticate');
  if (isOptionAvailable) {
     await dropdownLocator.selectOption({ label: 'Authenticate' }); // Using label for better accuracy
     console.log('Option "Authenticate" selected');
   } else {
     console.error('Option "Authenticate" not found in the dropdown');
   }*/
   
     await page.waitForTimeout(4000);

    console.log('Clicking Authenticate button...');
    await iFrame.locator("//span[contains(text(),'Authenticate')]").click();   
    
    page.on("dialog", async alert => {
      const text = alert.message();
      console.log(text);
      expect(text).toContain("Authenticated successfully");
    })
    await page.waitForTimeout(4000);
         
    //await context.close();
});