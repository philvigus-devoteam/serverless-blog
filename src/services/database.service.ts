import * as AWS from 'aws-sdk';

// Models
import ResponseModel from '../models/response/response.model';

interface IConfig {
    region: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    endpoint?: string;
}

enum StatusCode {
    OK = 200,
    ERROR = 500,
    BAD_REQUEST = 400,
}

enum ResponseMessage {
    ERROR = 'Unknown error',
    INVALID_REQUEST = 'Invalid Request',
    GET_ITEM_ERROR = 'Item does not exist',
}

// Put
type PutItem = AWS.DynamoDB.DocumentClient.PutItemInput;
type PutItemOutput = AWS.DynamoDB.DocumentClient.PutItemOutput;

// Batch write
type BatchWrite = AWS.DynamoDB.DocumentClient.BatchWriteItemInput;
type BatchWriteOutPut = AWS.DynamoDB.DocumentClient.BatchWriteItemOutput;

// Update
type UpdateItem = AWS.DynamoDB.DocumentClient.UpdateItemInput;
type UpdateItemOutPut = AWS.DynamoDB.DocumentClient.UpdateItemOutput;

// Query
type QueryItem = AWS.DynamoDB.DocumentClient.QueryInput;
type QueryItemOutput = AWS.DynamoDB.DocumentClient.QueryOutput;

// Get
type GetItem = AWS.DynamoDB.DocumentClient.GetItemInput;
type GetItemOutput = AWS.DynamoDB.DocumentClient.GetItemOutput;

// Delete
type DeleteItem = AWS.DynamoDB.DocumentClient.DeleteItemInput;
type DeleteItemOutput = AWS.DynamoDB.DocumentClient.DeleteItemOutput;

// Scan
type ScanInput = AWS.DynamoDB.DocumentClient.ScanInput;
type ScanOutput = AWS.DynamoDB.DocumentClient.ScanOutput;

type Item = {[index: string]: string};

const config: IConfig = { region: "eu-west-1" };

// For local dev, the only value here that is used is the endpoint
// However, the others need to be set or else an error is thrown
if (process.env.STAGE === 'dev') {
    config.accessKeyId = "blah"; 
    config.secretAccessKey = "uber-blah";
    config.endpoint = "http://localhost:8008";
}

AWS.config.update(config);

const documentClient = new AWS.DynamoDB.DocumentClient();

export default class DatabaseService {
    getItem = async ({ key, hash, hashValue, tableName}: Item): Promise<GetItemOutput> => {
        const params = {
            TableName: tableName,
            Key: {
                id: key,
            },
        }

        if (hash) {
            params.Key[hash] = hashValue;
        }

        const results = await this.get(params);

        if (Object.keys(results).length) {
            return results;
        }

        console.error('Item does not exist');
        throw new ResponseModel({ id: key }, StatusCode.BAD_REQUEST, ResponseMessage.INVALID_REQUEST)
    }

    create = async(params: PutItem): Promise<PutItemOutput> => {
        try {
            console.log('DB CREATE - params.TableName: ', params.TableName);
            console.log('DB CREATE - params.Item: ', params.Item);
            
            return await documentClient.put(params).promise();
        } catch (error) {
            console.error(`create-error: ${error}`);
            throw new ResponseModel({}, 500, `create-error: ${error}`);
        }
    }

    batchCreate = async(params: BatchWrite): Promise<BatchWriteOutPut> => {
        console.log('DB CREATE - params.RequestItems: ', params.RequestItems);

        try {
            return await documentClient.batchWrite(params).promise();
        } catch (error) {
            console.error(`batch-write-error: ${error}`);
            throw new ResponseModel({}, 500, `batch-write-error: ${error}`);
        }
    }

    update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
        console.log('DB UPDATE - params.TableName: ', params.TableName);
        console.log('DB UPDATE - params.Key: ', params.Key);
        console.log('DB UPDATE - params.AttributeUpdates: ', params.AttributeUpdates);

        try {
            return await documentClient.update(params).promise();
        } catch (error) {
            console.error(`update-error: ${error}`);
            throw new ResponseModel({}, 500, `update-error: ${error}`);
        }
    }

    query = async (params: QueryItem): Promise<QueryItemOutput> => {
        console.log('DB QUERY - params.TableName: ', params.TableName);
        console.log('DB QUERY - params.AttributesToGet: ', params.AttributesToGet);

        try {
            return await documentClient.query(params).promise();
        } catch (error) {
            console.error(`query-error: ${error}`);
            throw new ResponseModel({}, 500, `query-error: ${error}`);
        }
    }

    get = async (params: GetItem): Promise<GetItemOutput> => {
        console.log('DB GET - params.TableName: ', params.TableName);
        console.log('DB GET - params.Key: ', params.Key);

        try {
            return await documentClient.get(params).promise();
        } catch (error) {
            console.error(`get-error - TableName: ${params.TableName}`);
            console.error(`get-error: ${error}`);
            throw new ResponseModel({}, 500, `get-error: ${error}`);
        }
    }

    delete = async (params: DeleteItem): Promise<DeleteItemOutput> => {
        console.log('DB DELETE - TableName: ', params.TableName);
        console.log('DB DELETE - Key: ', params.Key);

        try {
            return await documentClient.delete(params).promise();
        } catch (error) {
            console.error(`delete-error: ${error}`);
            throw new ResponseModel({}, 500, `delete-error: ${error}`);
        }
    }
    
    getAll = async (params: ScanInput): Promise<ScanOutput> => {
        console.log('DB GETALL - TableName: ', params.TableName);

        try {
            return await documentClient.scan(params).promise();
        } catch (err) {
            console.log(err);
        }
    }
}