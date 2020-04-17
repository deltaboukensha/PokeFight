const fs = require("fs");

const runAsync = async () => {
    const jsonData = fs.readFileSync("./data/pokemonTypes.json", "utf-8");
    const pokemonTypes = JSON.parse(jsonData);
    const combinations = [];

    for(let a of pokemonTypes){
        for(let b of pokemonTypes){
            if(a.name == b.name){
                continue;
            }
            
            combinations.push({
                name: a.name + "&" + b.name,
                strongAgainst: Array.from(new Set([...a.strongAgainst, ...b.strongAgainst])),
                // weakAgainst: Array.from(new Set([...a.weakAgainst, ...b.weakAgainst])),
                weakAgainst: Array.from(new Set([
                    ...a.weakAgainst.filter(i => b.weakAgainst.includes(i)),
                    ...b.weakAgainst.filter(i => a.weakAgainst.includes(i))
                ])),
                resistantTo: Array.from(new Set([
                    ...a.resistantTo.filter(i => !b.vulnerableTo.includes(i)),
                    ...b.resistantTo.filter(i => !a.vulnerableTo.includes(i))
                ])),
                superResistantTo: a.resistantTo.filter(i => b.resistantTo.includes(i)),
                vulnerableTo: Array.from(new Set([
                    ...a.vulnerableTo.filter(i => !b.resistantTo.includes(i)),
                    ...b.vulnerableTo.filter(i => !a.resistantTo.includes(i))
                ])),
                superVulnerableTo: a.vulnerableTo.filter(i => b.vulnerableTo.includes(i)),
            });
        }
    }

    const computeScore = (item) => {
        const attackPositive = item.strongAgainst.length;
        const attackNegative = item.weakAgainst.length;
        const attackScore = attackPositive - attackNegative;
        const defensePositive = item.resistantTo.length + item.strongAgainst.length + item.superResistantTo.length;
        const defenseNegative = item.vulnerableTo.length + item.weakAgainst.length - item.superVulnerableTo.length;
        const defenseScore = defensePositive - defenseNegative;
        return attackScore + defenseScore;
    };

    for(const combination of combinations){
        combination.score = computeScore(combination);
    }

    const sorted = combinations.sort((a, b) => {
        return a.score - b.score;
    });
    console.log(sorted
        .reverse()
        .splice(0, 50)
        .reverse()
    );

    // .map(item => {
    //     // item.powerful = Array.from(new Set([...item.strongAgainst, ...item.resistantTo]));
    //     item.powerless = Array.from(new Set([...item.weakAgainst, ...item.vulnerableTo]));
    //     item.score = computeScore(item);
    //     return item;
    // });
    
};

runAsync()
    .catch(console.error)
    .then(() => process.exit(0));