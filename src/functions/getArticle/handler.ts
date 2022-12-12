import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const getArticle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const databaseService = new DatabaseService();

  const article = await databaseService.getItem({ tableName: "articles", key: event.pathParameters.id});

  return {
    body: article,
    event,
  };
};

export const main = middyfy(getArticle);
