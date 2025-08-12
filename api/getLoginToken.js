import * as nodeFetch from "node-fetch" //import everything from node-fetch. Node-fetch is used for API calls that converts JSON to JS

export const getLoginToken = async (username, password) =>
{
    const response = await nodeFetch("http://localhost:2221/api/login" ,{
        method: "POST",
        body: JSON.stringify({"username": username,"password": password}),
    })

    if (response.status!==200)
    {
        throw new Error("An error occured !!")
    }

    const responseBody = await response.json()
    return responseBody.token
}
