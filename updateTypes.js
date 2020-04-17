const fs = require("fs");
const puppeteer = require("puppeteer");

const runAsync = async () => {
    var data = fs.readFileSync("./data/pokemon-go-type-chart.txt", "utf-8")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(data);
    const name = await page.$eval("sapn.type-label", i => i.innerText)
    console.log(name)
    await browser.close();
};

runAsync()
.then(() => process.exit(0))
.catch(console.error);