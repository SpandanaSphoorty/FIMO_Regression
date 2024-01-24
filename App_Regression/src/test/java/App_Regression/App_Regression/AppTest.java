package App_Regression.App_Regression;

import org.openqa.selenium.By;
import org.testng.annotations.*;

import io.appium.java_client.AppiumBy;
import io.appium.java_client.android.*;
import io.appium.java_client.android.options.UiAutomator2Options;
import io.appium.java_client.service.local.AppiumDriverLocalService;
import io.appium.java_client.service.local.AppiumServiceBuilder;

import java.io.File;
import java.net.*;

/**
 * Unit test for simple App.
 */
public class AppTest 
{
    /**
     * Rigorous Test :-)
     */
	@BeforeTest
	public void SetPreRequisites() 
	{
		
	}
    @Test
    public void ValidateCGT1_Submission()throws MalformedURLException, InterruptedException
    {
    	AppiumDriverLocalService service = new AppiumServiceBuilder()
    			.withAppiumJS(new File("C:\\Users\\SF0080719\\AppData\\Roaming\\npm\\node_modules\\appium\\build\\lib\\main.js"))
    			.withIPAddress("127.0.0.1").usingPort(4723).build();
    	service.start();
    	UiAutomator2Options options = new UiAutomator2Options();    
    	options.setApp("D:\\OneDrive - SpandanaSphoortyFinancialLimited\\Desktop\\MobileAutomation_Regression\\App_Regression\\src\\test\\java\\Resources\\Spandana_UAT_LOS_Phase31122023.apk");
    	options.setDeviceName("Test_Device");
    	options.setAutoGrantPermissions(true);
    	AndroidDriver driver = new AndroidDriver(new URL("http://127.0.0.1:4723"),options);
    	driver.findElement(AppiumBy.id("com.jayam.basixuat:id/etUserName")).sendKeys("sf0058270");
    	driver.findElement(AppiumBy.id("com.jayam.basixuat:id/etPassword")).sendKeys("Ssfl@2021");
    	driver.findElement(AppiumBy.id("com.jayam.basixuat:id/btnLogin")).click();
    	Thread.sleep(500000);
    	driver.findElement(AppiumBy.id("android:id/button1")).click();
    	Thread.sleep(500000);
    	driver.quit();
    	service.stop();
    }
}
