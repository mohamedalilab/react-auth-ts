const postSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      maxLength: 200,
    },
    content: {
      type: "string",
      minLength: 1,
      maxLength: 5000,
    },
  },
  required: ["title", "content"],
  additionalProperties: false,
};

module.exports = postSchema;
