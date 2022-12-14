import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import DatabaseService from "src/services/database.service";
import { v4 as uuid } from "uuid";
import { middyfy } from "@libs/lambda";
import { ARTICLES_TABLE_NAME } from "src/resources/dynamodb-tables";

import schema from "./schema";

const createArticle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const databaseService = new DatabaseService();

  const body = { id: uuid(), ...event.body };

  await databaseService.create({
    TableName: ARTICLES_TABLE_NAME,
    Item: body,
  });

  return {
    body,
    event,
  };
};

export const main = middyfy(createArticle);
