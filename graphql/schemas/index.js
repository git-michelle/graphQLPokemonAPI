const { gql } = require("apollo-server-express");

// common hs export syntax
module.exports =
  // Type definitions
  gql`
    # Queries
    type Query {
      # this query type is getting the pokemon type
      pokemon(name: String, id: ID): Pokemon!
    }

    # Mutations

    # Types
    type Pokemon {
      id: ID!
      name: String!
    }
  `;
