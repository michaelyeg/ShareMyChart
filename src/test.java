//package com.example.tests;


//imported from selenium IDE --doesnt work with selenium server 3.0.1
/*
import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

public class test extends SeleneseTestCase{
    private Selenium selenium;



    @Before
    public void setUp() throws Exception {
        selenium = new DefaultSelenium("localhost", 4444, "*chrome", "https://www.wikipedia.org/");
        selenium.start();
    }

    @Test
    public void testSel() throws Exception {
        selenium.open("/");
        selenium.type("id=searchInput", "computer");
        selenium.click("css=button.pure-button.pure-button-primary-progressive");
        selenium.waitForPageToLoad("30000");
        assertEquals("Computer - Wikipedia", selenium.getTitle());
    }

    @After
    public void tearDown() throws Exception {
        selenium.stop();
    }
}
*/