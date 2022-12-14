import type { APIGatewayProxyEvent, Handler } from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";
import { StatusCode } from "../models/response/status";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  any
>;

export const DEFAULT_STATUS_CODE = StatusCode.OK;

// Correctly formats a lambda response with a status code and stringified body
export const formatJsonResponse = (
  response: Record<string, unknown>,
  statusCode: number = DEFAULT_STATUS_CODE
) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};
