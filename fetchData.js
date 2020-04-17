const puppeteer = require("puppeteer");
const fs = require("fs");

const sources = [
    // {
    //     url: "https://gamepress.gg/pokemongo/pokemon-go-type-chart",
    //     tag: "pokemon-go-type-chart"
    // },
    {
        url: "https://www.eurogamer.net/articles/2018-12-21-pokemon-go-type-chart-effectiveness-weaknesses",
        tag: "pokemon-go-type-table"
    }
];

const runAsync = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for(const source of sources){
        await page.goto(source.url);
        const content = await page.content();
        const url = new URL(source.url);
        fs.mkdirSync(`./data/${url.hostname}/${url.pathname}/`, { recursive: true });
        fs.writeFileSync(`./data/${url.hostname}/${url.pathname}/data.txt`, content, "utf-8");
    }

    await browser.close();
};

runAsync()
.catch(console.error)
.then(() => process.exit(0))