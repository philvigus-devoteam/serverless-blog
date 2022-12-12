
import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

import { formatJSONResponse } from "./api-gateway";
import { AppError } from "./app-error";
import MiddlewareFunction = middy.MiddlewareFn;

type MiddlewareOutput = Promise<middy.Request<APIGatewayProxyEvent, any, Error, Context>>;

export const apiGatewayResponseMiddleware = (options: { enableErrorLogger?: boolean } = {}) => {
  // This runs before the lambda handler
  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request): MiddlewareOutput => {
    if (isInvalidRequest(request)) {
        return;
    }

    if (isHttpResponse(request.response)) {
        return;
    }

    request.response = formatJSONResponse(request.response);
  }

// This runs if the lambda errors
  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<void> => {
    const { error } = request;
    let statusCode = 500;

    if (error instanceof AppError) {
      statusCode = error.statusCode;
    }

    if (options.enableErrorLogger) {
      console.error(error);
    }

    request.response = formatJSONResponse({ message: error.message }, statusCode);
  }

  return {
    after,
    onError,
  };
}

const isInvalidRequest = (request): boolean => {
    return !request.event?.httpMethod
      || request.response === undefined
      || request.response === null;
}

const isHttpResponse = (response): boolean => {
    const existingKeys = Object.keys(response);

    return existingKeys.includes("statusCode")
      && existingKeys.includes("headers")
      && existingKeys.includes("body");
}