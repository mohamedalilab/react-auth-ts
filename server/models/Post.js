const mongoose = require("mongoose");
const { OBJECT_ID } = require("../config/regex");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 5000,
    },
    authorId: {
      type: String,
      match: OBJECT_ID,
      required: true,
    },
    authorName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postSchema);
