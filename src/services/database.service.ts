import * as AWS from 'aws-sdk';
import ResponseModel from 'src/models/response.model';

type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

const documentClient = new AWS.DynamoDB.DocumentClient();

export default class DatabaseService {
    get = async (params:GetItem): Promise<GetItemOutput> => {
        try {
            return await documentClient.get(params).promise();
        } catch (error) {
            throw new ResponseModel({}, 500, `gete-error: ${error}`);
        }
    }
}