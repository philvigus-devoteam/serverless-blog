import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const updateArticle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const databaseService = new DatabaseService();

  await databaseService.update({
    TableName: "articles",
    Key: { id: event.pathParameters.id },
    UpdateExpression: "set title = :t, author = :a, content = :c",
    ExpressionAttributeValues: {
      ":t": event.body.title,
      ":a": event.body.author,
      ":c": event.body.content,
    },
  });

  const body = { id: event.pathParameters.id, ...event.body };

  return {
    body,
    event,
  };
};

export const main = middyfy(updateArticle);
