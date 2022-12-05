import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import DatabaseService from 'src/services/database.service';

import schema from './schema';

const getArticleList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const databaseService = new DatabaseService();
  // await databaseService.create({TableName: "articles", Item: { "id": "a lovely value"}});
  // await databaseService.create({TableName: "articles", Item: { "id": "an even lovelier one"}});
  // await databaseService.create({TableName: "articles", Item: { "id": "the loveliest one"}});

  const articles = await databaseService.getAll({TableName: "articles"});

  return formatJSONResponse({
    body: articles,
    event,
  });
};

export const main = middyfy(getArticleList);
