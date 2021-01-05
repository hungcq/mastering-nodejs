const puppeteer = require('puppeteer');
const fs = require('fs');

describe(`Puppeteer`, function () {
  this.timeout(30000);

  it(`Title should be 'Example Domain'`, async function () {
    let browser = await puppeteer.launch({
      headless: false
    });
    let page = await browser.newPage();
    await page.goto(`http://example.org`);
    let title = await page.title();
    await browser.close();
    expect(title).to.equal(`Example Domain`);
  });

  it(`Should create an imageless screenshot`, async function() {
    let savePath = './news.png';
    const browser = await puppeteer.launch({
      headless: true
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.resourceType === 'image') {
        request.abort();
      }
      else {
        request.continue();
      }
    });
    await page.goto('http://www.nytimes.com');
    await page.screenshot({
      path: savePath,
      fullPage: true
    });
    expect(fs.existsSync(savePath)).to.equal(true);

    savePath = './news.pdf';
    await page.pdf({path: savePath});

    await browser.close();
    expect(fs.existsSync(savePath)).to.equal(true);
  });
});