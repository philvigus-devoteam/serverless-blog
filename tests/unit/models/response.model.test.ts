import ResponseModel from "../../../src/models/response.model";

describe("Response model", () => {
    describe("build()", () => {
        it("should return the response with the correct parameters", () => {
            const response = new ResponseModel();

            response.setBodyVariable("first key", "first value");
            response.setBodyVariable("second key", "second value");

            response.setData(25.233344);

            response.setCode(200);
            response.setMessage("test message");

            const builtResponse = response.build();

            expect(builtResponse.statusCode).toBe(200);
            expect(builtResponse.body).toBe('{"data":25.233344,"message":"test message","status":"bad request","first key":"first value","second key":"second value"}');
        });
    });
});