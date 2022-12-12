import type { APIGatewayProxyEvent, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";
type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, any>

// Correctly formats a lambda response with a status code and stringified body
export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  }
}
