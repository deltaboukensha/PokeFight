const fs = require("fs");
const puppeteer = require("puppeteer");

const runAsync = async () => {
    var pageData = fs.readFileSync("./data/pokemon-go-type-table.txt", "utf-8")
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setContent(pageData);

    const evalResult = await page.evaluate(() => {
        const data = [];
        document.querySelectorAll("#page-wrapper > main > div.document > div.main > article > div.body > section:nth-child(3) > div > table > tbody > tr > td").forEach(i => data.push(i.innerText))
        const list = [];

        for (let i = 0; i < data.length; i += 5) {
            const name = data[i + 0];
            const strongAgainst = data[i + 1].split(",").map(i => i.trim()).filter(i => i);
            const weakAgainst = data[i + 2].split(",").map(i => i.trim()).filter(i => i);
            const resistantTo = data[i + 3].split(",").map(i => i.trim()).filter(i => i);
            const vulnerableTo = data[i + 4].split(",").map(i => i.trim()).filter(i => i);
            list.push({
                name,
                strongAgainst,
                weakAgainst,
                resistantTo,
                vulnerableTo
            });
        }

        return list;
    });

    fs.writeFileSync(`./data/pokemonTypes.json`, JSON.stringify(evalResult, null, 4), "utf-8");
    await browser.close();
};

runAsync()
    .catch(console.error)
    .then(() => process.exit(0))