import { formatJSONResponse } from '@libs/api-gateway';
import { Handler } from 'aws-lambda';
import DatabaseService from 'src/services/database.service';
import { v4 as uuid } from 'uuid';


const createArticle: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const body = Object.assign({}, JSON.parse(event.body));
  body["id"] = uuid();

  const article = await databaseService.create({
    TableName: "articles",
    Item: body
  });

  return formatJSONResponse({
    body: article,
    event,
  });
};

export const main = createArticle;
