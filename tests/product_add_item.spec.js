import {expect, test} from "@playwright/test"

test.skip('Product: Add to Basket', async({page}) => {

    await page.goto('/')
    const AddToBasket_button = await page.locator('div').filter({ hasText: /^499\$Add to Basket$/ })
    //Fetch the count of buttons named "Add to Basket"
    const count = await page.locator('[data-qa="product-button"]').count()
    console.log(count);
    await expect(count).toBe(5); // Should be 5
    
    //Before adding to cart, cart should have 0 items
    await expect(page.locator("div.header-basket-count")).toHaveText('0')
    AddToBasket_button.click()
    //Cart should have 1 item
    await expect(page.locator("div.header-basket-count")).toHaveText('1')
    //After clicking Add to basket, the button is renamed to Remove from basket
    var RemoveFromBasket = page.locator("button[class='product-button rounded-lg border-2 border-amber-300 bg-gradient-to-b from-amber-200 to-amber-100 hover:from-amber-300 hover:to-white py-1 mt-2 px-2 w-full shadow-md'] div")
    await expect(RemoveFromBasket).toHaveText("Remove from Basket")
    //Click on Checkout
    await page.getByRole('link', { name: 'Checkout' }).click()
   
    //await page.pause()    
    //Verify that you are in the Checkout Basket Page by verifying the URL
    await page.waitForURL("/basket") //Note: the base url has been setup in the config.js
    
})


