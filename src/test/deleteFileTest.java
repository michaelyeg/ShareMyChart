package test;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * Created by M.Guo on 28/11/2016.
 */
public class deleteFileTest {
    public static void main(String[] args) {
        ChromeDriver driver = new ChromeDriver();
        driver.get("http://localhost:8080/main.html");
        WebElement element = driver.findElement(By.id("clicktab2"));
        element.click();
        driver.findElement(By.id("test.ttl")).click();
        driver.findElement(By.id("delete")).click();
    }
}
