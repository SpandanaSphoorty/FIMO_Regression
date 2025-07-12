const {expect,test} = require('@playwright/test');
import fs from "fs";
import { parse } from "csv-parse/sync";

const LoginRecords=parse(fs.readFileSync('C:/Testing/PLAY-Wright/tests/Post sanction.csv'),{
  columns:true,
  skip_empty_lines:true,
  bom:true
});
test('Sample Test',async ({browser})=>{    
  const context = await browser.newContext({ignoreHTTPSErrors: true,});    
  const page = await context.newPage();
    test.setTimeout(150000);

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
    await page.locator("//div[contains(text(),'Sanctions')]").click();
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
  await page.waitForTimeout(3000);
  await dropdown.selectOption('Group');
  await page.waitForTimeout(2000);
  //await textbox.pressSequentially(loginRecord.Group,{delay:300});
  await textbox.pressSequentially(loginRecord.Group,{delay:250});
  
  await page.waitForTimeout(4000);
  await iFrame.locator(`//a[contains(text(),'${loginRecord.GroupName}')]`).click();
  await page.keyboard.press("Tab");
  await page.waitForTimeout(4000);

  //loop through the sanction table

  var numberOfRows=await iFrame.locator('//*[@id="tblFillGV"]/tbody//tr').count();
  var sanctionMode=null;
  var tenure=null;
  var sanctionStatus=null;
  var sanctionRemarks=null;
  console.log(`Sanction eligible loans: ${numberOfRows}`);
  var currentRow=null;
  var currentCell=null;
  var cellText=null;

  for (var i=1; i<numberOfRows; i++) {
    currentRow=iFrame.locator("//*[@id='tblFillGV']/tbody//tr[@id="+i+"]");
  
      currentCell=currentRow.locator("//td[@aria-describedby='tblFillGV_MMI_Code']");
      cellText=await currentCell.innerText();
      sanctionMode=currentRow.locator("//select[contains(@id,'ddleSignMode')]");
      tenure=currentRow.locator("//select[contains(@id,'ddlTenure')]");
      sanctionStatus=currentRow.locator("//select[contains(@id,'ddlSanctionStatus')]");
      sanctionRemarks=currentRow.locator("//select[contains(@id,'ddlSanctionRemarks')]");
      if(cellText==loginRecord.ClientCode)
      {
        sanctionMode.selectOption(loginRecord.Mode);
        tenure.selectOption(loginRecord.Tenure);        
      }
      else{
        sanctionStatus.selectOption("Hold");
        sanctionRemarks.selectOption("Not Interested");
      }
  }
  await page.waitForTimeout(5000);
//Save the sanction
    var saveButton=iFrame.locator("//*[@id='btnSave']");
    await saveButton.click();

     page.on("dialog", async alert => {
       const text = alert.message();
       console.log(text);
       expect(text).toContain("saved successfully");
       await alert.accept();
  })
    }

});