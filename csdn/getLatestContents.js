const puppeteer = require('puppeteer'); //引入puppeteer库

(async ()=>{
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto('https://www.csdn.net/');
    await page.waitForSelector('#feedlist_id');

    let title = await page.$eval('.clearfix .list_con', els => els.innerHTML);
    // let title = await page.$$eval('.clearfix .list_con', els => {
    //     let arr = [];
    //     for (let i = 0, len = els.length; i < len; i += 1 ){
    //         let str = els[i].innerHTML;
    //         // if (str.indexOf('荐') == 0) {
    //         //     str = str.substr(1);
    //         // }
    //         // str = str.replace(/\s*/g,"");
    //         console.log(str)
    //         // arr.push(str);
    //     }
    //     return arr;
    // });
    console.log(title)
    console.log('完成');
    await browser.close();  //关闭浏览器
})();


