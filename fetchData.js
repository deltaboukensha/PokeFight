const puppeteer = require("puppeteer");
const fs = require("fs");

const sources = [
    {
        url: "https://gamepress.gg/pokemongo/pokemon-go-type-chart",
        tag: "pokemon-go-type-chart"
    }
];

const runAsync = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(const {url, tag} of sources){
        await page.goto(url);
        const content = await page.content();
        fs.writeFileSync(`./data/${tag}.txt`, content, "utf-8");
    }

    await browser.close();
};

runAsync()
.then(() => process.exit(0))
.catch(console.error);