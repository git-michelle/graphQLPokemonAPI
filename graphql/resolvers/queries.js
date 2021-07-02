const got = require("got");
const apiUrlForNames = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
  pokemon: async (parent, { name, id }, { models }) => {
    // check if in local db/cached
    const pokemon = await models.Pokemon.findOne({ name }).exec();
    console.log(pokemon);

    if (pokemon) {
      console.log(`${pokemon.name} found in db`);
      return pokemon;
    }

    console.log(`${name} not found in db`);

    // 1. extract name from args ^^
    // 2. make request to pokemon api for the name
    let response;

    try {
      response = await got(`${apiUrlForNames}${name || id}`);
    } catch (error) {
      console.log(error);
      throwDefaultFormattedError(error);
    }

    // 3. parse the response
    const result = JSON.parse(response.body);

    // 3.5 cache the result in the local mongodb
    await models.Pokemon.create(result);
    // 4. send the response to the client
    return result;
  },
  pokemonCount: async (parents, args, context) => {
    // return count of pokemon in db
    return await models.Pokemon.count().exec();
  },
};

const throwDefaultFormattedError = (error) => {
  throw new Error(
    `Sorry, there was an error: , ${error.response.statusCode} =  ${error.response.statusMessage}`
  );
};
