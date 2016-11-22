import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.MarionetteDriver; //*needs* selenium server 3.0.1
import org.openqa.selenium.remote.DesiredCapabilities;


public class test2 {

    @Test
    public void startWebDriver(){


        /* The following code is for the Marionette Driver
            this will work in v 2.53.1 and v 3.0.0 and 3.0.1 of WebDriver
            but is deprecated in v 3.0.1 of WebDriver so may not work in future versions
           You also need to download the Marionette executable
           https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver
           for version 2.53.1 of webdriver, rename geckodriver.exe to wires.exe
         */

        /* You can set the path to the actual file location of the driver */
        // String currentDir = System.getProperty("user.dir");
        // String marionetteDriverLocation = currentDir + "/tools/marionette/wires.exe";
         System.setProperty("webdriver.gecko.driver", "geckodriver.exe");

        //If you add the folder with geckodriver.exe (wires.exe) to the path then you only need the following line
        // and you don't need to set the property as listed in the 3 lines above
        // e.g. D:\Users\Alan\Documents\github\startUsingSeleniumWebDriver\tools\marionette

        //i added in these 2 lines to try to set the port
        DesiredCapabilities cap=new DesiredCapabilities();
        cap.setCapability("webdriver_firefox_port",4444);

        WebDriver driver = new FirefoxDriver(cap);


        // The actual test code follows assumes that you have either
        // - been able to instantiate FirefoxDriver or
        // - downloaded firefox portable and instantiated a driver with FirefoxBinary
        // - or using Marionette/GeckoDriver and set the webdriver.gecko.driver and instantiated MarionetteDriver
        // - or added the path of geckodriver.exer (wires.exe) to the system path and instantiated MarionetteDriver

        driver.navigate().to("http://seleniumsimplified.com");

        Assert.assertTrue("title should start differently",
                driver.getTitle().startsWith("Selenium Simplified"));

        driver.close();
        driver.quit();
    }
}