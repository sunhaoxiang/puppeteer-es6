const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
  let page = await browser.newPage();
  await page.goto('http://es6.ruanyifeng.com/#README', { waitUntil: 'networkidle0' });
  let aTags = await page.evaluate(() => {
    let as = [...document.querySelectorAll('ol li a')];
    return as.map((a) =>{
      return {
        name: a.text,
        href: a.href.trim()
      }
    });
  });

  await browser.close();
});

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://es6.ruanyifeng.com/#README');
//   await page.waitForNavigation({ waitUntil: 'load' });
//   let aTags = await page.evaluate(() => {
//     let as = [...document.querySelectorAll('ol li a')];
//     return as.map((a) =>{
//       return {
//         href: a.href.trim(),
//         name: a.text
//       }
//     });
//   });
//   console.log(aTags);

//   await browser.close();
// })();
