export class MyAccount_Page{
    constructor(page)
    {
        this.page=page;
        this.pageHeading = page.getByRole('heading',{name:'My Account'})
    }

    visit = async () =>
    {
        await this.page.goto("/my-account")
        
        //await this.page.pause();
    }

    waitForPageHeading = async () =>
    {
        await this.pageHeading.waitFor()
    }

}