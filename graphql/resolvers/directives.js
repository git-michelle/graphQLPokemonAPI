const {
  SchemaDirectiveVisitor,
  ForbiddenError,
} = require("apollo-server-express");
const { defaultFieldResolver } = requre("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (...args) => {
      const [parent, args, ctx] = args;
      const result = await resolve.apply(this, args);

      // check and verify the token
      let verified;
      try {
        verified = jwt.verify(ctx.token, JWT_SECRET);
      } catch (err) {
        throw new Error(err.message);
      }

      //valid token
      // get user from token

      const user = await ctx.models.User.findOne({ _id: verified.userId });

      // check if the roles match
      if (!this.args.roles.includes(user.role)) {
        throw new ForbiddenError("You need permission to be here");
      }
      return result;
    };
  }
}
