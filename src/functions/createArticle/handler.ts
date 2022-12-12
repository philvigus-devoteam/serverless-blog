import { formatJSONResponse } from '@libs/api-gateway';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import DatabaseService from 'src/services/database.service';
import { v4 as uuid } from 'uuid';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const createArticle: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const databaseService = new DatabaseService();

  const body = { id: uuid(), ...event.body };

  await databaseService.create({
    TableName: "articles",
    Item: body
  });

  return formatJSONResponse({
    body,
    event,
  });
};

export const main = middyfy(createArticle);
