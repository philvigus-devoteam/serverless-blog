import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import ArticleService from 'src/services/ArticleService';

import schema from './schema';

const getArticleList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const articleService = new ArticleService();

  return formatJSONResponse({
    articles: articleService.getArticles(),
    event,
  });
};

export const main = middyfy(getArticleList);
