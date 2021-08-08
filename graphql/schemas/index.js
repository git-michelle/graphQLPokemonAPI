const { gql } = require("apollo-server-express");

// common hs export syntax
module.exports =
  // Type definitions
  gql`
    # Directives
    directive @auth(roles: [String!]!) on FIELD_DEFINITION

    # Queries
    type Query {
      # this query type is getting the pokemon type
      pokemon(name: String, id: ID, _id: ID): Pokemon!
      pokemonCount: Int! @auth(roles: ["ADMIN", "MEMBER"])

      # Comments
      pokemonComments(pokemonId: ID!): [Comment]!
    }

    # Mutations
    type Mutation {
      #Comments
      createComment(
        pokemonId: ID!
        text: String!
        author: String
        upvotes: Int
        downvotes: Int
      ): Comment!

      updateComment(
        commentId: ID!
        pokemonId: ID!
        text: String!
        author: String
        upvotes: Int
        downvotes: Int
      ): Comment!

      deleteComment(commentId: ID!): Comment!

      # Auth

      signUp(username: String!, password: String!): String!
      signIn(username: String!, password: String!): String!
    }

    # Types
    type Pokemon {
      # _id is the mongo id, keep optional for initial search before pokemon added to db
      _id: ID
      id: ID!
      name: String!
      base_experience: Int!
      height: Int!
      is_default: Boolean!
      order: Int!
      weight: Int!
      location_area_encounters: String!
      sprites: PokemonSprites!
      comments: [ID!]!
    }

    type Comment {
      id: ID!
      author: String
      upvotes: Int
      downvotes: Int
      text: String!
      pokemonId: ID!
      createdAt: String!
      updatedAt: String!
    }

    type PokemonSprites {
      front_default: String!
      front_shiny: String!
      front_female: String!
      front_shiny_female: String!
      back_default: String!
      back_shiny: String!
      back_female: String!
      back_shiny_female: String!
    }

    # Auth
    type User {
      id: ID!
      username: String!
      comments: [Comment!]!
      role: RoleEnum!
    }

    enum RoleEnum {
      ANONYMOUS
      MEMBER
      ADMIN
    }
  `;
