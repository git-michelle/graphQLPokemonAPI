const got = require("got");
const apiUrlForNames = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
  pokemon: async (parent, { name, id }, context) => {
    // 1. extract name from args ^^
    // 2. make request to pokemon api for the name
    let response;

    try {
      response = await got(`${apiUrlForNames}${name || id}`);
    } catch (error) {
      throwDefaultFormattedError(error);
    }

    // 3. parse the response
    const result = JSON.parse(response.body);
    // 4. send the response to the client
    return result;
    // return {
    //   id: "123",
    //   name: "Mew",
    //   weight: 900,
    // };
  },
};

const throwDefaultFormattedError = (error) => {
  throw new Error(
    `Sorry, there was an error: , ${error.statusCode} =  ${error.statusMessage}`
  );
};
