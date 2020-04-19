const puppeteer = require('puppeteer'); //引入puppeteer库
const fs = require('fs');
(async ()=>{
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://www.csdn.net', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#feedlist_id .list_con');
    let res = await page.evaluate(() => {
       let $ = window.$;
       let items = $('.list_con');
       let lsArray = [];
       let linkArray = [];
       if (items.length >= 1) {
           items.each((index, item) => {
               let ele = $(item);
               let link = ele.find('.title h2 a').attr('href');
               let title = ele.find('.title h2 a').text();
               let abstract = ele.find('div.summary').text();
               let author = ele.find('.list_userbar .name a').text();
               if (linkArray.indexOf(link) == -1 ) {
                   title = title.replace(/\s*/g,'');
                   abstract = abstract.replace(/\s*/g,'');
                   author = author.replace(/\s*/g,'');
                   if (title.indexOf('荐') == 0) {
                       title = title.substr(1)
                   }
                   linkArray.push(link);
                   lsArray.push({
                       link,
                       title,
                       abstract,
                       author
                   })
               }
           })
       }
       return lsArray;
    });
    res = JSON.stringify(res);
    try {
        fs.accessSync(`./csdn/data/topBlog.json`);
        fs.unlink(`./csdn/data/topBlog.json`, function(err) {
            if(err) {
                console.log(`错误:${err}`);
                return false;
            }
            fs.writeFile(`./csdn/data/topBlog.json`,res,function (err){
                if (err){
                    throw err;
                }
                console.log(`删除后，生成文件，并写入`)
            })
        })

    } catch (e) {
        fs.writeFile(`./csdn/data/topBlog.json`,res,function (err){
            if (err){
                throw err;
            }
            console.log(`生成文件，并写入`)
        })
    }
    await browser.close();  //关闭浏览器
})();


