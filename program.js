const puppeteer = require('puppeteer');

(async () => {
  console.log("start")
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/google-chrome'
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.click('#L2AGLb > div');
  await page.click('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input');
  
  console.log("end")
})();

