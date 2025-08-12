import { expect } from "@playwright/test";

export class Products_Page{
    
    count = 0;
    constructor(page){
        // Store the page context for later use
        this.page = page;
        //this.page.waitForLoadState('networkidle');
        // Locator for the "Add to Basket" button for products
        this.AddRemove_button = page.locator("[data-qa='product-button']");
       // this.basketCounter_label = page.locator("div.header-basket-count");
        this.basketCounter_label = page.locator("div[data-qa='header-basket-count']");
        this.sortProducts_dropdown = page.locator(".sort-dropdown");
        
    }

    visit = async () => {
        await this.page.goto('/');//Base URL is set in playwright.config.js
        
    }

    
    addProductToBasket = async (productIndex) => {

        const button = this.AddRemove_button.nth(productIndex)
        //Wait for the Add to Basket button to be available for the product at the given index
        await button.waitFor();
        //Click on Add to basket against the product at the given index
        await button.click();
        //Verify that the button text changes to "Remove From Basket"
        await expect(button).toHaveText(/Remove From Basket/i)//i here is regex to ignore case sensitivity
        this.count = this.count+1;
        await expect(this.basketCounter_label).toHaveText(this.count.toString())
        await console.log("Product: "+productIndex+" added to basket")
        // Verify that the basket count is updated to 1
        //const innertext = await this.basketCounter_label.innerText()// you need to first receive the promise in a variable and then print the vairable
        //console.log("Basket count label text:", innertext);
    }

    sortProducts = async (page) =>
    {
        await this.sortProducts_dropdown.waitFor()
        await this.sortProducts_dropdown.selectOption('price-asc');
        
    }
}