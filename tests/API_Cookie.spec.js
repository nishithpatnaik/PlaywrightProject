import {test} from "@playwright/test"
import { MyAccount_Page } from "../POM/MyAccount_Page";
import { getLoginToken } from "../api/getLoginToken";
import { userDetails } from "../testData/userDetails";

test("My Account - Cookie Injection with API", async ({page}) =>
{
    //const loginToken = request.post("http://localhost:2221/api/login")
    const loginToken = await getLoginToken(userDetails.username,userDetails.password)
    //console.warn({loginToken})

    //Inject the token into the browser
    const myAccount = new MyAccount_Page(page);
    await myAccount.visit();
    await page.evaluate(([loginTokenInsideBrowserCode])=>{
        document.cookie = "token=" + loginTokenInsideBrowserCode

    },[loginToken])
    await myAccount.visit();
    await myAccount.waitForPageHeading();
});