import {Status, StatusCode} from "./status";
import ResponseInterface from "./response.interface";
import ResponseBodyInterface from "./responseBody.interface";
import {ResponseHeader as ResponseHeaderType} from "./responseHeader.type";

export const STATUS_MESSAGES = {
    [StatusCode.OK]: Status.SUCCESS,
    [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
    [StatusCode.ERROR]: Status.ERROR,
}

const RESPONSE_HEADERS: ResponseHeaderType = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

export default class ResponseModel {
    private body: ResponseBodyInterface;
    private code: number;

    constructor(data = {}, code = StatusCode.BAD_REQUEST, message = '') {
        this.body = {
            data: data,
            message: message,
            status: STATUS_MESSAGES[code],
        };
        this.code = code;
    }

    setBodyVariable = (variable: string, value: string): void => {
        this.body[variable] = value;
    }

    setData = (data: any): void => {
        this.body.data = data;
    }

    setCode = (code: StatusCode): void => {
        this.body.status = STATUS_MESSAGES[code];
        this.code = code;
    }

    getCode = (): StatusCode => {
        return this.code;
    }

    setMessage = (message: string): void => {
        this.body.message = message;
    }

    getMessage = (): any => {
        return this.body.message;
    }

    build = (): ResponseInterface => {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.body),
        };
    }
}