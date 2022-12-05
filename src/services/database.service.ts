import * as AWS from 'aws-sdk';

// Models
import ResponseModel from '../models/response.model';

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
    CREATE_LIST_SUCCESS = 'To-do list successfully created',
    CREATE_LIST_FAIL = 'To-do list cannot be created',
    DELETE_LIST_SUCCESS = 'To-do list successfully deleted',
    DELETE_LIST_FAIL = 'To-do list cannot be deleted',
    GET_LIST_SUCCESS = 'To-do list successfully retrieved',
    GET_LIST_FAIL = 'To-do list not found',
    UPDATE_LIST_SUCCESS = 'To-do list successfully updated',
    UPDATE_LIST_FAIL = 'To-do list cannot be updated',
    CREATE_TASK_SUCCESS = 'Task successfully added',
    CREATE_TASK_FAIL = 'Task could not be added',
    DELETE_TASK_SUCCESS = 'Task successfully deleted',
    DELETE_TASK_FAIL = 'Task could not be deleted',
    UPDATE_TASK_SUCCESS = 'Task successfully updated',
    UPDATE_TASK_FAIL = 'Task could not be updated',
    GET_TASK_SUCCESS = 'Task successfully retrieved',
    GET_TASK_FAIL = 'Task not found',
    ERROR = 'Unknown error.',
    INVALID_REQUEST = 'Invalid Request!',
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

// const {
//     STAGE,
//     DYNAMODB_LOCAL_STAGE,
//     DYNAMODB_LOCAL_ACCESS_KEY_ID,
//     DYNAMODB_LOCAL_SECRET_ACCESS_KEY,
//     DYNAMODB_LOCAL_ENDPOINT
// } = process.env;

const config: IConfig = { region: "eu-west-1", accessKeyId: "blah", secretAccessKey: "blah", endpoint: "http://localhost:8008" };

// if (STAGE === DYNAMODB_LOCAL_STAGE) {
//     config.accessKeyId = DYNAMODB_LOCAL_ACCESS_KEY_ID; // local dynamodb accessKeyId
//     config.secretAccessKey = DYNAMODB_LOCAL_SECRET_ACCESS_KEY; // local dynamodb secretAccessKey
//     config.endpoint = DYNAMODB_LOCAL_ENDPOINT; // local dynamodb endpoint
// }

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
        try {
            return await documentClient.batchWrite(params).promise();
        } catch (error) {
            console.error(`batch-write-error: ${error}`);
            throw new ResponseModel({}, 500, `batch-write-error: ${error}`);
        }
    }

    update = async (params: UpdateItem): Promise<UpdateItemOutPut> => {
        try {
            // result.Attributes
            return await documentClient.update(params).promise();
        } catch (error) {
            console.error(`update-error: ${error}`);
            throw new ResponseModel({}, 500, `update-error: ${error}`);
        }
    }

    query = async (params: QueryItem): Promise<QueryItemOutput> => {
        try {
            return await documentClient.query(params).promise();
        } catch (error) {
            console.error(`query-error: ${error}`);
            throw new ResponseModel({}, 500, `query-error: ${error}`);
        }
    }

    get = async (params: GetItem): Promise<GetItemOutput> => {
        // console.log('DB GET - STAGE: ', STAGE);
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