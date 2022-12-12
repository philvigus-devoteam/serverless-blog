import { formatJSONResponse } from '@libs/api-gateway';
import { Handler } from 'aws-lambda';
import DatabaseService from 'src/services/database.service';
import { v4 as uuid } from 'uuid';


const createArticle: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const body = { id: uuid(), ...JSON.parse(event.body) };

  await databaseService.create({
    TableName: "articles",
    Item: body
  });

  return formatJSONResponse({
    body: body,
    event,
  });
};

export const main = createArticle;
