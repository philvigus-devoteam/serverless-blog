import {
  formatJsonResponse,
  DEFAULT_STATUS_CODE,
} from "../../../src/libs/api-gateway";
import { StatusCode } from "../../../src/models/response/status";

describe("API Gateway library functions", () => {
  describe("formatJsonResponse", () => {
    it("returns a formatted JSON response", () => {
      const stringValue = "String value";
      const numberValue = 10;
      const statusCode = StatusCode.BAD_REQUEST;

      const body = {
        firstKey: stringValue,
        secondKey: numberValue,
      };

      const response = formatJsonResponse(body, statusCode);

      expect(response).toEqual({
        body: `{"firstKey":"${stringValue}","secondKey":${numberValue}}`,
        statusCode: statusCode,
      });
    });

    it("returns a response with a default status code when one is not specified", () => {
      const response = formatJsonResponse({});

      expect(response.statusCode).toEqual(DEFAULT_STATUS_CODE);
    });
  });
});
