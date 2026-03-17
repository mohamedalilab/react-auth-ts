const REGEX = require("../config/regex");

const userRegistrationSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: "string",
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    password: {
      type: "string",
      minLength: 6,
    },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

module.exports = userRegistrationSchema;
