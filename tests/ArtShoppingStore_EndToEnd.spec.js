import { test, expect } from "@playwright/test"
import { Products_Page } from "../POM/Products_Page.js"
import { Navigation } from "../POM/Navigation.js"
import { Checkout_Page } from "../POM/CheckOut_Page.js"
import { Login_Page} from "../POM/Login_Page.js"
import { Register_Page } from "../POM/Register_Page.js"
import { deliveryDetails } from "../testData/deliveryDetails.js"
import { Payments_Page } from "../POM/Payments_Page.js"

//For this TEST to execute launch the shopping-store-windows-386.exe from your OneNote or Downloads folder

test("Art Store - End To End Testing", async ({ page, request }, testInfo) => 
    {
    const productPage = new Products_Page(page) 
    await productPage.visit()
    await productPage.sortProducts()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(2)

    const navigateTo = new Navigation(page, testInfo)
    await navigateTo.checkoutPage() 
   
    const checkoutPage = new Checkout_Page(page)
    await checkoutPage.removeCheapestProduct()
    await checkoutPage.continueToCheckout_click()
    

    const LoginPage = new Login_Page(page)
    //LoginPage.enterLoginCredential()
    await LoginPage.clickRegister_Button()

    const RegisterPage = new Register_Page(page)
    let email = await RegisterPage.generateRandomEmail(request, expect);
    await RegisterPage.registerCredentials(email)
    await RegisterPage.registerUser(deliveryDetails)
    await RegisterPage.continueToPay()
    

    const PaymentsPage = new Payments_Page(page)
    await PaymentsPage.applyDiscountCode()
    await PaymentsPage.enterCreditCardDetails()
    await PaymentsPage.pay()
   
});
