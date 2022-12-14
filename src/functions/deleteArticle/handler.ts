import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";
import { ARTICLES_TABLE_NAME } from "src/resources/dynamodb-tables";

const deleteArticle: Handler = async (event) => {
  const databaseService = new DatabaseService();

  await databaseService.delete({
    TableName: ARTICLES_TABLE_NAME,
    Key: { id: event.pathParameters.id },
  });

  return {
    body: {},
    event,
  };
};

export const main = middyfy(deleteArticle);
