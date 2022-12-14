import { Handler } from "aws-lambda";
import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";
import { ARTICLES_TABLE_NAME } from "src/resources/dynamodb-tables";

const getArticleList: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const articles = await databaseService.getAll({
    TableName: ARTICLES_TABLE_NAME,
  });

  return {
    body: articles,
    event,
  };
};

export const main = middyfy(getArticleList);
