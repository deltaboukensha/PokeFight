const { pokemonTypes } = require("./data/pokemonTypes");

const runAsync = async () => {
    console.log(pokemonTypes);
};

runAsync().catch(console.error);