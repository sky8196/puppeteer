const puppeteer = require('puppeteer'); //引入puppeteer库
const fs = require('fs');

(async ()=>{
try {
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('http://www.xbiquge.la/10/10489/', { waitUntil: 'networkidle2' });
        await page.waitForSelector('#list');
        let res = await page.evaluate(() => {
            let $ = window.$;
            let items = $('#list dl dd');
            console.log(items)
            let lsArray = [];
            let linkArray = [];
            if (items.length >= 1) {
                items.each((index, item) => {
                    let ele = $(item);
                    let title = ele.find('a').text();
                    let link = ele.find('a').attr('href');
                    if (linkArray.indexOf(link) == -1 ) {
                        title = title.replace(/\s*/g,'');
                        linkArray.push(link);
                        lsArray.push({
                            link,
                            title
                        })
                    }
                })
            }
            return lsArray;
        });
		console.log(res)
        await browser.close();  //关闭浏览器
    } catch (e) {
        console.log("error:",e.message);
    }
})();


