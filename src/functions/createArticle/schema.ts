export default {
    type: "object",
    properties: {
        title: { type: "string" },
        content: { type: "string"},
        author: { type: "string" }
    },
    required: ["title", "content", "author"]
} as const;
  