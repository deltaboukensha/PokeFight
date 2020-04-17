const fs = require("fs");
const puppeteer = require("puppeteer");

const runAsync = async () => {
    var pageData = fs.readFileSync("./data/pokemon-go-type-chart.txt", "utf-8")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(pageData);
    const typeNames = await page.$$eval("sapn", result => {
        return result.map(i => i.innerText);
    });

    const pokemonTypes = typeNames.map(typeName => {
        return {
            "name": typeName
        };
    });

    console.log(pokemonTypes)

    fs.writeFileSync(`./data/pokemonTypes.js`, JSON.stringify(pokemonTypes, null, 4), "utf-8");

    await browser.close();
};

runAsync()
.catch(console.error)
.then(() => process.exit(0))