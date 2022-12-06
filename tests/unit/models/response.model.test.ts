import ResponseModel, {STATUS_MESSAGES} from "../../../src/models/response/response.model";
import {StatusCode} from "../../../src/models/response/status";

describe("Response model", () => {
    describe("build()", () => {
        it("should return the response with the correct parameters", () => {
            const dataValue = 25.23344;
            const status = StatusCode.OK;
            const message = "test message";

            const firstKey = "first key";
            const secondKey = "second key";
            const firstValue = "first value";
            const secondValue = "second value";
            
            const response = new ResponseModel();

            response.setBodyVariable(firstKey, firstValue);
            response.setBodyVariable(secondKey, secondValue);

            response.setData(dataValue);
            response.setCode(status);
            response.setMessage(message);

            const builtResponse = response.build();

            expect(builtResponse.statusCode).toBe(status);
            expect(builtResponse.body).toBe(`{"data":${dataValue},"message":"${message}","status":"${STATUS_MESSAGES[status]}","${firstKey}":"${firstValue}","${secondKey}":"${secondValue}"}`);
        });
    });
});