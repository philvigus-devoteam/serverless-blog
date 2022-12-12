import { formatJSONResponse } from '@libs/api-gateway';
import { Handler } from 'aws-lambda';
import DatabaseService from 'src/services/database.service';

const getArticleList: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const articles = await databaseService.getAll({TableName: "articles"});

  return formatJSONResponse({
    body: articles,
    event,
  });
};

export const main = getArticleList;
