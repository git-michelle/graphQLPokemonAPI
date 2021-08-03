const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

module.exports = {
  //Comments
  createComment: async (
    parent,
    { pokemonId, author, text, upvotes, downvotes },
    { models }
  ) => {
    // extract the fields that were passed in by the client from args
    // save the comment to the db with those values
    const comment = await models.Comment.create({
      pokemonId,
      author,
      text,
      upvotes,
      downvotes,
    });

    // send back the saved comment to the client
    return comment;
  },
  updateComment: async (
    parent,
    { commentId, pokemonId, author, text, upvotes, downvotes },
    { models }
  ) => {
    // extract the fields that were passed in by the client from args
    // save the comment to the db with those values
    const commentUpdates = {};
    Object.entries({
      commentId,
      pokemonId,
      author,
      text,
      upvotes,
      downvotes,
    }).forEach(([key, value]) => {
      if (value) commentUpdates[key] = value;
    });

    return await models.Comment.findOneAndUpdate(
      { _id: commentId },
      commentUpdates,
      {
        new: true,
      }
    ).exec();
  },
  deleteComment: async (parent, { commentId }, { models }) => {
    return await models.Comment.findOneAndDelete({ _id: commentId }).exec();
  },

  // AUTH
  signUp: async (parent, { username, password }, { models }) => {
    username = username.trim();
    const exists = await models.User.findOne({ username });
    if (exists) throw new AuthenticationError("Username already exists");

    // hash the pw
    password = await bcrypt.hash(password, 10);

    // save the user in the db
    const user = await models.User.create({ username, password });

    // return a token to the frontend
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return token;
  },
  signIn: async (parent, { username, password }, { models }) => {
    // validation
    username = username.trim();

    // check if user exists
    const user = await models.User.findOne({ username }).exec();
    if (!user) throw new AuthenticationError("Username does not exist");

    // check if pw matches the hash in the db
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AuthenticationError("Incorrect Credentials");

    // return a token to the frontend
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return token;
  },
};
