export const ARTICLES_TABLE_NAME = "articles";

export default {
  ArticleTable: {
    Type: "AWS::DynamoDB::Table",
    DeletionPolicy: "Delete",
    Properties: {
      TableName: ARTICLES_TABLE_NAME,
      BillingMode: "PAY_PER_REQUEST",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    },
  },
};
