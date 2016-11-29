package test;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * Created by M.Guo on 28/11/2016.
 */
public class loadDataTest {
    public static void main(String[] args) {
        ChromeDriver driver = new ChromeDriver();
        driver.get("http://localhost:8080/main.html");
        driver.findElement(By.id("clicktab2")).click();
        driver.findElement(By.id("filesuperstore-small.ttl")).click();
        try {
            WebDriverWait wait = new WebDriverWait(driver, 2);
            wait.until(ExpectedConditions.alertIsPresent());
            Alert alert = driver.switchTo().alert();
            alert.accept();
            driver.findElement(By.id("defaultOpen")).click();
        } catch (Exception e) {
            //exception handling
        }
    }
}
