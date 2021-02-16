const puppeteer = require('puppeteer')
const fs = require('fs');

const html = fs.readFileSync("./index.html", "utf-8");

(async () => {
    let browser = await puppeteer.launch({
        headless: true
    })
    let page = await browser.newPage()

    await page.setContent(html)

    const container = await page.evaluate(() => {
        const gradient = document.getElementById("container");
        const { x, y, width, height } = gradient.getBoundingClientRect();
        return { x, y, width, height };
    });

    await page.screenshot({ path: `opengraph.jpg`, clip: container })
    await browser.close()
})();