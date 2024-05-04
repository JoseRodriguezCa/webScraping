const puppeteer = require("puppeteer");
const fs = require("fs");

const scrapper = async (url) => {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1020 });

  await page.goto(url);

  await page.$eval('li[data-title="Characters"]', (element) => {
    element.click();
  });

  while (true) {
    let showMoreButton = await page.$("a.show_more");
    if (!showMoreButton) break;

    try {
      await showMoreButton.click();
      await page.waitForSelector("li.building-block-config");
    } catch (error) {
      break;
    }
  }

  const data = [];

  const links = await page.$$("div.aspect > a");

  for (const link of links) {
    const href = await link.evaluate((element) => element.getAttribute("href"));
    const newPage = await browser.newPage();
    await newPage.goto(href);

    const name = await newPage.$eval(
      "span.long-title",
      (element) => element.textContent
    );
    const description = await newPage.$eval(
      "p.desc",
      (element) => element.textContent
    );
    const imageUrl = await newPage.$eval("img.thumb", (element) =>
      element.getAttribute("data-src")
    );

    const item = {
      name: name.trim(),
      description,
      imageUrl,
    };
    data.push(item);
    await newPage.close();
  }

  const jsonData = JSON.stringify(data);
  fs.writeFileSync("datos.json", jsonData);

  await browser.close();
};

module.exports = { scrapper };
