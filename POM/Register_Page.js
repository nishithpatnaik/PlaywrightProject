import { expect } from "@playwright/test"
import { deliveryDetails } from "../testData/deliveryDetails";
export class Register_Page{
    constructor(page){
        this.page=page;
        this.email_textbox = page.getByRole('textbox',{name:'E-Mail'})
        this.password_textbox = page.getByRole('textbox',{name:'Password'})
        this.register_button = page.getByRole('button',{name: 'Register'})
        this.firstName_textbox = page.getByRole('textbox', {name: 'First name'})
        this.lastName_textbox = page.getByRole('textbox', {name: 'Last name'})
        this.street_textbox = page.getByRole('textbox', {name: 'Street'})
        this.postCode_textbox = page.getByRole('textbox', {name: 'Post code'})
        this.city_textbox = page.getByRole('textbox', {name: 'City'})
        this.country_dropdown = page.getByRole('combobox')
        this.saveAddress_button = page.getByRole('button',{name: 'Save address for next time'})
        this.continueToPay_button = page.getByRole('button',{name: 'Continue to payment'})
        this.savedAddressed_textArea = page.locator('div[data-qa="saved-address-container"]')
        this.savedAddressFirstName_label = page.locator('p.saved-address-firstName')
        this.savedAddressLastName_label = page.locator('p.saved-address-lastName')
        this.savedAddressStreet_label = page.locator('p.saved-address-street')
        this.savedAddressPostCode_label = page.locator('p.saved-address-postcode')
        this.savedAddressCity_label = page.locator('p.saved-address-city')
        this.savedAddressCountry_label = page.locator('p.saved-address-country')

    }

    generateRandomEmail = async(request, expect) =>
    {
          //we are making a GET request to fetch a unique id everytime
        const response = await request.get("https://www.uuidgenerator.net/api/guid");
        expect(response.ok()).toBeTruthy();
        const email = await response.text()+"@gmail.com";
        return email;
    }

    registerCredentials = async (email) =>
    {
        await this.page.waitForURL(/\/signup/)
        await this.email_textbox.waitFor();
        await this.email_textbox.fill(email);
        await this.password_textbox.fill("HalaMadrid!!!");
        await this.register_button.click();
    }

    registerUser = async (deliveryDetails) =>
    {
        await this.page.waitForURL(/\/delivery-details/)
        await this.firstName_textbox.fill(deliveryDetails.firstName)
        await this.lastName_textbox.fill(deliveryDetails.lastName)
        await this.street_textbox.fill(deliveryDetails.street)
        await this.postCode_textbox.fill(deliveryDetails.postCode)
        await this.city_textbox.fill(deliveryDetails.city) 
        await this.country_dropdown.selectOption(deliveryDetails.country)
        await this.validateSavedAddress()
        
    }

    validateSavedAddress = async () =>
    {
        const count = await this.savedAddressed_textArea.count();
        await this.saveAddress_button.click()
        await this.savedAddressed_textArea.waitFor()
        //After Count
        await expect(this.savedAddressed_textArea).toHaveCount(count+1)
        //expect(await this.savedAddressFirstName_label.first().innerText()).toBe(await this.firstName_textbox.inputValue())
        //Playwright Expect (when you just have a locator and you want to validate its properties)
        await expect(this.savedAddressFirstName_label.first()).toHaveText(await this.firstName_textbox.inputValue())
        //Playwright Jest (when you already have two string)
        expect(await this.savedAddressLastName_label.first().innerText()).toBe(await this.lastName_textbox.inputValue())
        expect(await this.savedAddressStreet_label.first().innerText()).toBe(await this.street_textbox.inputValue())
        expect(await this.savedAddressPostCode_label.first().innerText()).toBe(await this.postCode_textbox.inputValue())
        expect(await this.savedAddressCity_label.first().innerText()).toBe(await this.city_textbox.inputValue())
        expect(await this.savedAddressCountry_label.first().innerText()).toBe(await this.country_dropdown.inputValue())
    }

    continueToPay = async () =>
    {
        await this.continueToPay_button.click() 
        await this.page.waitForURL(/\payment/)
    }

       

}