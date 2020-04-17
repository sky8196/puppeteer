const puppeteer = require('puppeteer'); //引入puppeteer库

(async () => {
    const browser = await puppeteer.launch({    //启动浏览器
        headless: false,   //代码运行时打开浏览器方便观察
        // devtools:true   //打开f12界面
    });
    const page = await browser.newPage();  //打开浏览器的一个tab 页
    await page.goto('https://juejin.im/welcome/frontend', {timeout: 10 * 1000, waitUntil: 'networkidle2'});  //访问网址 只有2个网络连接时触发（至少500毫秒后）
    //等待某个元素出现，  这里我们要抓取文章，所以等待文章标题
    await page.waitForSelector('.entry-list a.title', {timeout: 10 * 1000});

    //开始解析每篇文章的标题
    //$$eval() 此方法在页面内执行 Array.from(document.querySelectorAll(selector))，然后把匹配到的元素数组作为第一个参数传给 pageFunction。
    let titleArr = await page.$$eval('.entry-list a.title', els => {
        let arr = [];
        //开始解析每篇文章的标题
        for (let i = 0, len = els.length; i < len; i++) {
            arr.push(els[i].innerText); //获取文章的标题
        }
        return arr;
    });
    let nameArr = await page.$$eval('.user-popover-box a', els => {
        let arr = [];
        //开始解析每篇文章的标题
        for (let i = 0, len = els.length; i < len; i++) {
            arr.push(els[i].innerText); //获取文章的标题
        }
        return arr;
    });
    let timeArr = await page.$$eval('.meta-list li:nth-child(3)', els => {
        let arr = [];
        //开始解析每篇文章的标题
        for (let i = 0, len = els.length; i < len; i++) {
            arr.push(els[i].innerText); //获取文章的标题
        }
        return arr;
    });
    let fabulousArr = await page.$$eval('.action-list .like .count', els => {
        let arr = [];
        //开始解析每篇文章的标题
        for (let i = 0, len = els.length; i < len; i++) {
            arr.push(els[i]!==null?els[i].innerText:0); //获取文章的标题
            // arr.push(els[i].innerText)
        }
        return arr;
    });
    // 输出获取的标题
    await  console.log('输出方法获取的标题');
    // await console.log(fabulousArr)
    // await console.log(fabulousArr.length)

    const  obj=[]
    for (let i = 0, len = titleArr.length; i < len; i++) {
        await obj.push({
            name:nameArr[i],
            time:timeArr[i],
            title:titleArr[i],
            fabulous:fabulousArr[i],
        })
    }
    await console.log('完成');
    await browser.close();  //关闭浏览器
})();
