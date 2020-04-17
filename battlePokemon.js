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

    // console.log(pokemonTypes.sort((a, b) => {
    //     return a.strongAgainst.length - b.strongAgainst.length;
    // }));

    const computeScore = (item) => Array.from(new Set([...item.strongAgainst, ...item.resistantTo])).length - Array.from(new Set([...item.weakAgainst, ...item.vulnerableTo])).length;

    const sorted = pokemonTypes.sort((a, b) => {
        return computeScore(a) - computeScore(b);
    }).map(item => {
        item.powerful = Array.from(new Set([...item.strongAgainst, ...item.resistantTo]));
        item.powerless = Array.from(new Set([...item.weakAgainst, ...item.vulnerableTo]));
        item.score = computeScore(item);
        return item;
    });
    console.log(sorted);
};

runAsync()
    .catch(console.error)
    .then(() => process.exit(0));