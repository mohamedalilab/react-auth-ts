const REGEX = require("../config/regex");

const userAuthSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports = userAuthSchema;
