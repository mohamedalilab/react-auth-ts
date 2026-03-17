const mongoose = require("mongoose");
const REGEX = require("../config/regex");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email regex
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    refreshToken: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
