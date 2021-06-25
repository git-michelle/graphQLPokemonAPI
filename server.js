const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
// inject envs into global namespaace
require("dotenv").config();
// exxtact env variabes
const port = process.env.PORT || 5000;

// start app
const app = express();

// -----GraphQL section

// create GraphQL server
const graphQLserver = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// apply graphQL to express / app
graphQLserver.applyMiddleware({
  app: app,
  path: "/api",
});

// setup and connect to db

// home route
app.get("/", (req, res) => res.send("hello"));

// listen for requests
app.listen(port, () => {
  console.log(`Server up at port ${port} ${graphQLserver.graphqlPath}`);
});
