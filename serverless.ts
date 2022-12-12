import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getArticleList from '@functions/getArticleList';
import createArticle from '@functions/createArticle';
import getArticle from '@functions/getArticle';
import dynamoDbTables from './src/resources/dynamodb-tables';

const serverlessConfiguration: AWS = {
  service: 'blog',
  useDotenv: true,
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      STAGE: '${sls:stage}',
      LOCAL_END_POINT: 'http://localhost:8008'
    },
    iam: {
      role: {
        name: 'lambda-dynamodb-access',
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:DescribeTable',
              'dynamodb:Query',
              'dynamodb:Scan',
              'dynamodb:GetItem',
              'dynamodb:PutItem',
              'dynamodb:UpdateItem',
              'dynamodb:DeleteItem'
            ],
            Resource: [
              {"Fn::GetAtt": [ 'ArticleTable', 'Arn' ]},
            ]
          }
        ]
      }
    }
  },
  // import the function via paths
  functions: { hello, getArticleList, createArticle, getArticle },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ['dev'],
      start: {
        port: 8008,
        inMemory: true,
        heapInitial: '200m',
        heapMax: '1g',
        migrate: true,
        seed: true,
        convertEmptyValues: true,
        // Uncomment only if you already have a DynamoDB running locally
        // noStart: true
      }
    },
  },
  resources: {
    Resources: dynamoDbTables
  }
};

module.exports = serverlessConfiguration;
