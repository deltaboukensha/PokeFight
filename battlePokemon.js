const fs = require("fs");

const runAsync = async () => {
    const jsonData = fs.readFileSync("./data/pokemonTypes.json", "utf-8");
    const pokemonTypes = JSON.parse(jsonData);
    // console.log(pokemonTypes.map(i => {
    //     return {
    //         name: i.name,
    //         strongAgainst: i.strongAgainst.length,
    //         weakAgainst: i.weakAgainst.length,
    //         resistantTo: i.resistantTo.length,
    //         vulnerableTo: i.vulnerableTo.length,
    //     };
    // }));

    console.log(pokemonTypes.sort((a, b) => {
        return a.strongAgainst.length - b.strongAgainst.length;
    }));

    console.log(pokemonTypes.sort((a, b) => {
        return a.strongAgainst.length - b.strongAgainst.length;
    }));
};

runAsync()
    .catch(console.error)
    .then(() => process.exit(0));