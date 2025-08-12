import { expect } from "@playwright/test";

export class Checkout_Page {
    constructor(page) {
        // Store the page context for later use
        this.page = page;
        // Locator for the "Checkout" button
        this.continueToCheckout_button = page.getByRole('button', { name: 'Continue to Checkout' })
        this.basketItems = page.locator('[data-qa="basket-item-price"]');
        this.removeFromBasket_button = page.getByRole('button', { name: 'Remove from basket' })
    }

    visit = async () => {
        await this.page.goto('/basket'); // Navigate to the basket page
    }

    continueToCheckout_click = async () => {
        // Click on the Continue To Checkout button
        await this.continueToCheckout_button.click();
        await this.page.waitForURL(/\/login/)


        // Verify that the URL changes to the checkout page
        //await expect(this.page).toHaveURL(/.*checkout/);
        
    }

    removeCheapestProduct = async(page) =>
    {
        const ItemsBeforeRemoval = await this.basketItems.count()
        const allPrices = await this.basketItems.allInnerTexts()
        console.warn({allPrices})

        //remove $ from $449 and convert to number 449
        const justNumbers = allPrices.map((element) => {
            const withoutDollarSign = element.replace("$","") //449$ -> 449
            return parseInt(withoutDollarSign,10)
        })
        console.warn({justNumbers})

        //To get the smallest number
        const cheapestProduct = Math.min(...justNumbers) //justNumbers is a list. To unpack the list use "..."
        const cheapest_index = justNumbers.indexOf(cheapestProduct) 
        await this.removeFromBasket_button.nth(cheapest_index).click()
        // const p1 = await this.basketItems.first().innerText()
        // console.warn({p1})

        // const p2 = await this.basketItems.nth(1).innerText()
        // console.warn({p2})
        //const actualCount = await this.basketItems.count(); 
        //console.log("Actual basket item count:", actualCount);
       // await expect(this.basketItems).toHaveCount(ItemsBeforeRemoval-1);

    

    }
}