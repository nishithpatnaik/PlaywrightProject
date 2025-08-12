import * as dotenv from "dotenv" //Import this after installing the dotenv dependency


export default () => 
{
    dotenv.config()//this will fetch the ENVIRONMENT VARIABLES from the .env file during runtime
}