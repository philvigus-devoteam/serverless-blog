import { StatusCode } from "../../../src/models/response/status";
import AppError, { DEFAULT_STATUS_CODE } from "../../../src/libs/app-error";

describe("AppError", () => {
  it("creates an app error with the given message and status code", () => {
    const message = "Message";
    const code = StatusCode.ERROR;

    const appError = new AppError(message, code);

    expect(appError.message).toEqual(message);
    expect(appError.statusCode).toEqual(code);
  });

  it("creates an app error with the default status code when none is provided", () => {
    const message = "Message";

    const appError = new AppError(message);

    expect(appError.statusCode).toEqual(DEFAULT_STATUS_CODE);
  });

  it("creates an app error with an empty message when none is provided", () => {
    const appError = new AppError();

    expect(appError.message).toEqual("");
  });
});
