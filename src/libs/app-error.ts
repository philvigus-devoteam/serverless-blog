import { StatusCode } from "../../src/models/response/status";

export const DEFAULT_STATUS_CODE = StatusCode.BAD_REQUEST;

export default class AppError extends Error {
  statusCode: StatusCode;

  constructor(
    message: string = "",
    statusCode: StatusCode = DEFAULT_STATUS_CODE
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
