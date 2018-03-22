const puppeteer = require('puppeteer');
const colors = require('colors');

puppeteer.launch().then(async browser => {
  let page = await browser.newPage();
  await page.goto('http://es6.ruanyifeng.com/#README', { waitUntil: 'networkidle0' });
  // 获取所有页面的标题和链接
  let aTags = await page.evaluate(() => {
    let as = [...document.querySelectorAll('#sidebar ol li a')];
    return as.map((a) =>{
      return {
        name: a.text,
        href: a.href.trim()
      }
    });
  });
  // 抓取第一页
  await page.pdf({path: `./pdf/1 - ${aTags[0].name}.pdf`});
  console.log(`${aTags[0].name}抓取完成！`);
  await page.close();

  // 从第二页开始循环往后抓取
  for (let i = 1; i < aTags.length; i++) {
    page = await browser.newPage();
    let a = aTags[i];
    await page.goto(a.href, { waitUntil: 'networkidle0' });
    await page.pdf({path: `./pdf/${i + 1} - ${a.name}.pdf`});
    console.log(`${a.name}抓取完成！`);
    await page.close();
  }
  console.log('*************************************'.rainbow);
  console.log('所有页面均抓取完成！'.rainbow);
  console.log('*************************************'.rainbow);

  await browser.close();
});

