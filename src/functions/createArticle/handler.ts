import { formatJSONResponse } from '@libs/api-gateway';
import { Handler } from 'aws-lambda';
import DatabaseService from 'src/services/database.service';

const createArticle: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const article = await databaseService.create({
    TableName: "articles",
    Item: {
      id: "blah",
      author: "Bilbo Baggins",
      title: "To there and back again",
      content: "A really interesting story",
      createdAt: Date.now()
    }
  });

  return formatJSONResponse({
    body: article,
    event,
  });
};

export const main = createArticle;
