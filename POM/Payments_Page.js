import { expect } from "@playwright/test"
import { CreditCard } from  "../testData/paymentDetails.js"

export class Payments_Page{
    constructor(page)
    {
        this.page=page;
        this.totalCost_label = this.page.locator('[data-qa = "total-value"]')
        //iFRAME
        this.discountCode_label = this.page.frameLocator('[data-qa="active-discount-container"]')
                                           .locator('[data-qa = "discount-code"]')
        this.enterDiscountCode_textbox = this.page.getByRole('textbox',{name:'Discount code'})
        this.submitDiscount_button = this.page.getByRole('button', { name: 'Submit discount' })
        this.costAfterDiscount_label = this.page.locator('[data-qa="total-with-discount-value"]')
        this.discountActivated_label = this.page.getByText('Discount activated!')
        this.creditCardOwner_textbox = this.page.getByRole('textbox', { name: 'Credit card owner' })
        this.creditCardNumber_textbox = this.page.getByRole('textbox', { name: 'Credit card number' })
        this.creditCardValidity_textbox = this.page.getByRole('textbox', { name: 'Valid until' })
        this.creditCardCVC_textbox = this.page.getByRole('textbox', { name: 'Credit card CVC' })
        this.pay_button = this.page.getByRole('button', { name: 'Pay' })

    }

    applyDiscountCode = async ( page ) =>
    {
        await expect(this.discountActivated_label).toBeHidden()
        const totalCost = await this.totalCost_label.innerText()
        totalCost.replace("$","")
        const totalCostNum = parseInt(totalCost)
        const discountCode = await this.discountCode_label.innerText()
        await this.enterDiscountCode_textbox.waitFor()
        await this.enterDiscountCode_textbox.fill(discountCode)
        await expect(this.enterDiscountCode_textbox).toHaveValue(discountCode)
        //Submit the Discount
        await this.submitDiscount_button.click()
        //Validate Discount is Applied
        await expect(this.discountActivated_label).toBeVisible()
        await this.costAfterDiscount_label.waitFor()
        const discountedCost = await this.costAfterDiscount_label.innerText()
        discountedCost.replace("$","")
        const discountedCostNum = parseInt(discountedCost)
        expect (discountedCostNum).toBeLessThan(totalCostNum)
        


    }

    enterCreditCardDetails = async ( page ) =>
    {
        
        await this.creditCardOwner_textbox.fill(CreditCard.owner)
        await this.creditCardNumber_textbox.fill(CreditCard.cardNumber)
        await this.creditCardValidity_textbox.fill(CreditCard.validUntil)
        await this.creditCardCVC_textbox.fill(CreditCard.cvc)

    }

    pay = async (page) =>
    {
        await this.pay_button.click()
        await this.page.waitForURL(/\/thank-you/)
       // await this.page.pause()
    }

}