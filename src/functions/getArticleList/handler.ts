import { Handler } from "aws-lambda";
import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";

const getArticleList: Handler = async (event) => {
  const databaseService = new DatabaseService();

  const articles = await databaseService.getAll({TableName: "articles"});

  return {
    body: articles,
    event,
  };
};

export const main = middyfy(getArticleList);

