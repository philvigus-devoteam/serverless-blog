type ResponseHeader = { [header: string]: string | number | boolean; }

export default interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}