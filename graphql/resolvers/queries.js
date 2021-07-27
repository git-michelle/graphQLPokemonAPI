const got = require("got");
const apiUrlForNames = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
  pokemon: async (parent, { name, id, _id }, { models }) => {
    // check if in local db/cached
    const pokemon = await models.Pokemon.findOne({
      $or: [{ id }, { name }, { _id }],
    }).exec();

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
      response = await got(`${apiUrlForNames}${name || id || _id}`);
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
  pokemonCount: async (parents, args, { models }) => {
    // return count of pokemon in db
    return await models.Pokemon.count().exec();
  },

  //Comments
  pokemonComments: async (parent, { pokemonId }, { models }) => {
    return await models.Comment.find({
      pokemonId: pokemonId,
    })
      .sort({ createdAt: -1 })
      .exec();
  },
};

const throwDefaultFormattedError = (error) => {
  throw new Error(
    `Sorry, there was an error: , ${error.response.statusCode} =  ${error.response.statusMessage}`
  );
};
