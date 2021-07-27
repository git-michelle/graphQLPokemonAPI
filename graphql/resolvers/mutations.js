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
};
