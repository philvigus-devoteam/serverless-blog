import DatabaseService from "src/services/database.service";
import { middyfy } from "@libs/lambda";
import { Handler } from "aws-lambda";

const deleteArticle: Handler = async (event) => {
  const databaseService = new DatabaseService();

  await databaseService.delete({
    TableName: "articles",
    Key: { id: event.pathParameters.id },
  });

  return {
    body: {},
    event,
  };
};

export const main = middyfy(deleteArticle);
