import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import { Handler } from "aws-lambda";
import { apiGatewayResponseMiddleware } from "./middleware";

// this function essentially adds "middlewares" to lambda functions that are passed into it
// these middlewares will be run against every lambda function automatically so 
// we don't have to remember to do it in each lambda function
export const middyfy = (handler: Handler) => {
  return middy(handler)
    // parse the json string body to a json object
    .use(middyJsonBodyParser())
    // creates a response with the correctly formatted response code and body
    .use(apiGatewayResponseMiddleware({ enableErrorLogger: process.env.IS_OFFLINE === "true" }));
}