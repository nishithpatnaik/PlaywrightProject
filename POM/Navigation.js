import { expect } from "@playwright/test";

export class Navigation{
    constructor(page, testInfo){
        // Store the page context for later use
        this.page = page;
        this.testInfo = testInfo;
        // Locator for the "Products" link in the navigation menu
        //this.checkout_link = this.page.locator('[data-qa="go-to-checkout-button"]');
        this.checkout_link = page.getByRole('link', { name: 'Checkout' })
        this.hamburgerMenu_button = page.locator('.burger-button')
    }
        
    checkoutPage = async () => {
        //Click on Checkout 
        //If else to handle both Browser or Mobile locators depending on visibility
        // if(await this.checkout_link.isVisible()) //Browser
        // {
        //     await this.checkout_link.click();
        // }
        // else //Mobile
        // {
        //     await this.hamburgerMenu_button.click();
        //     await this.checkout_link.click(); 
        // }

        //ALTERNATIVE
        //If Mobile
        if(this.testInfo.project.name.includes('Mobile'))
        {
            await this.hamburgerMenu_button.click();
            await this.checkout_link.click(); 
        }
        else //If Browser
        {
            await this.checkout_link.click();
        }
       
        await expect(this.page).toHaveURL(/.*basket/)    

    }

   
}   

