const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const db = require("./db");
const models = require("./models");

// inject envs into global namespaace
require("dotenv").config();
// exxtact env variabes
const port = process.env.PORT || 5000;
const db_host = process.env.DB_HOST;

// setup and connect to db
db.connect(db_host);

// start app
const app = express();

// -----GraphQL section

// create GraphQL server
const graphQLserver = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    let token = null;

    if (
      typeof authHeader === "string" &&
      authHeader.toLowerCase().startsWith("bearer")
    ) {
      const split = authHeader.split(" ");
      if (split.length === 2) {
        token = split[1];
      }
    }

    return { models, token };
  },
});

// apply graphQL to express / app
graphQLserver.applyMiddleware({
  app: app,
  path: "/api",
});

// home route
app.get("/", (req, res) => res.send("hello"));

// listen for requests
app.listen(port, () => {
  console.log(`Server up at port ${port} ${graphQLserver.graphqlPath}`);
});
