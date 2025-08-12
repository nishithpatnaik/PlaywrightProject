export class Login_Page{
    
    constructor(page){
        this.page=page;
        this.email_textbox = page.getByRole('textbox',{name:'Email'})
        this.password_textbox = page.getByRole('textbox',{name:'Password'})
        this.register_button = page.getByRole('button', {name:'Register'})

    }

    visit = async () =>
    {
        await this.page.goto('/login?redirect=/delivery-details')
    }

    enterLoginCredential = async () =>
    {
        await this.email_textbox.fill(email+"@gmail.com")
        await this.password_textbox.fill("HalaMadrid")

    }

    clickRegister_Button = async () =>
    {
        await this.register_button.click()
        await this.page.waitForURL("/\/delivery-details/")
    }

}