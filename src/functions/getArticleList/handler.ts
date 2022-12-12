import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import DatabaseService from 'src/services/database.service';

const getArticleList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('here');
  const databaseService = new DatabaseService();
  // await databaseService.create({TableName: "articles", Item: { "id": "a lovely value"}});
  // await databaseService.create({TableName: "articles", Item: { "id": "an even lovelier one"}});
  // await databaseService.create({TableName: "articles", Item: { "id": "the loveliest one"}});

  console.log(databaseService);
  const articles = await databaseService.getAll({TableName: "articles"});
  // const articles = await databaseService.get({TableName: "articles", Key: "wibble"});
  console.log('there');
  return formatJSONResponse({
    body: articles,
    event,
  });
};

export const main = getArticleList;
