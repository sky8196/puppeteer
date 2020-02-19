const puppeteer = require('puppeteer'); //引入puppeteer库
const fs=require('fs');
var jsonscv = require('json-2-csv');
var iconv = require('iconv-lite');

const getSiteMapUrl = async ( url ) => {
    const browser = await puppeteer.launch({    //启动浏览器
        headless: true,
    });
    const page = await browser.newPage();  //打开浏览器的一个tab 页
    await page.goto(url, {timeout: 10 * 1000, waitUntil: 'networkidle2'});  //访问网址 只有2个网络连接时触发（至少500毫秒后）
    await page.waitForSelector('.collapsible-content', {timeout: 10 * 1000});
    let netSiteProvince=await page.$$eval('.collapsible-content span.text',els=>{
        let arr= [];
        els.forEach((el)=>{
            if(el.innerText.indexOf('http') == 0) {
                arr.push(el.innerText);
            }
        });
        return arr;
    });
    let apiData=netSiteProvince.toString();
    apiData=apiData.replace(/\,/g,'\r');

    try {
        fs.accessSync(`./data/urlTXT/1.txt`);
        fs.appendFile(`./data/urlTXT/1.txt`, `\r${apiData}`, function(err) {
            if(err) {
                console.log(`38:${err}`);
                return false;
            }
            console.log('写入成功!!!');
        })
    } catch (e) {
        fs.writeFile('./data/urlTXT/1.txt',apiData,function (err){
            if (err){
                throw err;
            }
            console.log('生成文件，并写入')
        })
    }
    await browser.close();  //关闭浏览器
};
let urlArray = [
    'https://www.china-medicaldressing.com/sitemap_tags_1.xml',
    'https://www.china-medicaldressing.com/sitemap_product_1.xml',
    'https://www.china-medicaldressing.com/sitemap_product_2.xml',
    'https://www.china-medicaldressing.com/sitemap_news_1.xml',
    'https://www.china-medicaldressing.com/sitemap_category.xml'
];
for (let i = 0; i < urlArray.length; i += 1 ) {
    getSiteMapUrl(urlArray[i]);
}

