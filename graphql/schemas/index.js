const { gql } = require("apollo-server-express");

// common hs export syntax
module.exports =
  // Type definitions
  gql`
    # Queries
    type Query {
      # this query type is getting the pokemon type
      pokemon(name: String, id: ID): Pokemon!
      pokemonCount: Int!
    }

    # Mutations

    # Types
    type Pokemon {
      id: ID!
      name: String!
      base_experience: Int!
      height: Int!
      is_default: Boolean!
      order: Int!
      weight: Int!
      location_area_encounters: String!
      sprites: PokemonSprites!
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
  `;
