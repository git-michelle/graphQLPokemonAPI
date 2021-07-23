const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    upvotes: {
      type: Number,
      required: true,
      default: 0,
    },
    downvotes: {
      type: Number,
      required: true,
      default: 0,
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    pokemon_id: {
      type: mongoose.Schema.Types.ObjectId,
      // ref to the pokemon model "Pokemon" specifically, to use its id
      ref: "Pokemon",
    },
  },
  { timestamps: true }
);

// generate model from the schema
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
