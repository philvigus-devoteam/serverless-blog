export default {
    ArticleTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Delete',
        Properties: {
            TableName: 'articles',
            BillingMode: 'PAY_PER_REQUEST',
            AttributeDefinitions: [
                { AttributeName: 'id', AttributeType: 'S' },
            ],
            KeySchema: [
                { AttributeName: 'id', KeyType: 'HASH' }
            ]
        }
    }
}