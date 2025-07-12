const {expect,test} = require('@playwright/test');
import fs from "fs";
import { parse } from "csv-parse/sync";

const LoginRecords=parse(fs.readFileSync('C:/Testing/PLAY-Wright/tests/Disbursment.csv'),{
  columns:true,
  skip_empty_lines:true,
  bom:true
});
test('Sample Test',async ({browser})=>{    
  const context = await browser.newContext({ignoreHTTPSErrors: true,});    
  const page = await context.newPage();
    test.setTimeout(150000);

    page.on('dialog', async (alert) => {
      const text = alert.message();
      console.log(`Dialog message: ${text}`);
      expect(text).toContain("saved successfully");
      await alert.accept(); // Accept the dialog
    });
    
    for (const loginRecord of LoginRecords) {
    const loginUrl = loginRecord.URL; 
    console.log(`Navigating to URL: ${loginUrl}`);
    await page.goto(loginUrl);
    await page.waitForTimeout(1000);
    await page.locator('//*[@id="txtLoginName"]').fill(loginRecord.UserName);
    await page.locator("//*[@id='txtPassword']").fill(loginRecord.Password);
    await page.waitForTimeout(2000);
    await page.locator("#btnlogin").click();
    await page.waitForTimeout(2000);
    await page.locator("//span[contains(text(),'Loans')]").click();
    await page.waitForTimeout(1000);
    await page.locator('//span[@id="arrow710"]').click();
    await page.waitForTimeout(2000);
    await page.locator("//div[contains(text(),'Post Sanction & Disbursement')]").click();
    await page.waitForTimeout(2000);

    var iFrame = page.frameLocator('[id="ifmMain"]');
    await iFrame.locator('//*[@id="ctl00_ContentPlaceHolder1_MemberHierarchy1_txtBranch"]').click();//Narasaraopet-1(APGL0021)
    await page.waitForTimeout(2000);
    await iFrame.locator('//*[@id="ctl00_ContentPlaceHolder1_MemberHierarchy1_txtBranch"]').fill(loginRecord.Branch);//
    await page.waitForTimeout(2000);
    await iFrame.locator(`//a[contains(text(),'${loginRecord.BranchName}')]`).click();
    await page.waitForTimeout(2000);

  const dropdown = iFrame.locator("#ctl00_ContentPlaceHolder1_MemberHierarchy1_ddlFilter");
  await dropdown.selectOption('Group'); 
  const selectedOption = await dropdown.evaluate(el => el.value);
  console.log(`Selected option value: ${selectedOption}`);
  await page.waitForTimeout(3000);

  const textbox = iFrame.locator('//*[@id="ctl00_ContentPlaceHolder1_MemberHierarchy1_txtsearch"]');
  await textbox.click();
  await page.waitForTimeout(2000);
  //await textbox.pressSequentially(loginRecord.Group,{delay:300});
  await textbox.pressSequentially(loginRecord.Group,{delay:250}); 
  await page.waitForTimeout(3000);
  await iFrame.locator(`//a[contains(text(),'${loginRecord.GroupName}')]`).click({ timeout: 30000 });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(3000);
  //     //*[@id='tblDisbursement']/tbody/tr[@id='1']/td[@aria-describedby='tblDisbursement_MLAI_ID']

  var numberOfRows = await iFrame.locator('//*[@id="tblDisbursement"]/tbody//tr').count();
 
  console.log(`Sanction eligible loans: ${numberOfRows}`);
   
const currentRowCheckbox = iFrame.locator(
  `//*[@id='tblDisbursement']/tbody//td[@aria-describedby='tblDisbursement_MLAI_ID' and contains(text(),'${loginRecord.LoanID}')]/preceding-sibling::td/input`);
await currentRowCheckbox.click();
await page.waitForTimeout(3000);
await iFrame.locator('[id="btnSave"]').click();
await page.waitForTimeout(3000);

/*page.on("dialog", async alert => {
    const text = alert.message();
    console.log(text);    
    expect(text).toContain("saved successfully");
    await alert.accept();

});*/

    }
});