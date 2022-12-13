import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "DELETE",
        path: "articles/{id}",
        request: {
          parameters: {
            paths: {
              id: true,
            },
          },
        },
      },
    },
  ],
};
