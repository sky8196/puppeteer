const puppeteer = require('puppeteer'); //引入puppeteer库
const fs=require('fs');

(async () => {
    const browser = await puppeteer.launch({    //启动浏览器
        headless: false,
        // devtools:true   //打开f12界面
    });
    const page = await browser.newPage();  //打开浏览器的一个tab 页
    await page.goto('https://web.zj.icbc.com.cn/p/tbxz/pc/init?data=CB27FC5421D3F0031504B2DCE5BC355FF7F8B3C0A0E59510C8C743852774F3E78F9139C85DF336DE8172EF5C5AE414485E4BEE08991E8481F80B8CC060041419ACCEC7576BEBE861562A8AE6482C1AD926930D85704FF959CDCE8686C3DF6911D1F67C91FF3826579AE9D84690AC7BFDCD643B044E89AE959FCB129B1B3C34E4', {timeout: 10 * 1000, waitUntil: 'networkidle2'});  //访问网址 只有2个网络连接时触发（至少500毫秒后）
    //等待某个元素出现
    await page.waitForSelector('.btn-outline-secondary', {timeout: 10 * 1000});
    await page.click('.btn-outline-secondary')
    await page.waitFor('#netSiteProvince')

    let netSiteProvince=await page.$$eval('#netSiteProvince option',els=>{
        let arr=[];
        els.forEach(el=>{
            arr.push(el.value)
        })
        return arr;
    })
    console.log(netSiteProvince.length)
    let allObj=[];
    //1 2 3--4 5 6--7 8 9--10 11 12--13 14 15--16 17 18--19 20 21--22 23 24 25 26-27 28 29--30 31
    for(let i=1;i<2;i++){
    // for(let i=1;i<3;i++){
        await page.select('#netSiteProvince',netSiteProvince[i])
        await page.waitFor(1000);
        // 获取第二级option
        let netSiteCity=await page.$$eval('#netSiteCity option',els=>{
            let arr=[];
            els.forEach(el=>{
                arr.push(el.value)
            })
            return arr;
        })
        let twoObj=[]
        // for(let i=1;i<netSiteCity.length;i++){
        for(let i=1;i<3;i++){
            await page.select('#netSiteCity',netSiteCity[i]);
            await page.waitFor(1000);
            // 根据点击，获取第三级option
            let netSiteArea=await page.$$eval('#netSiteArea option',els=>{
                let arr=[];
                els.forEach(el=>{
                    arr.push(el.value)
                })
                return arr;
            })
            let obj=[]
            // for(let i=1;i<netSiteArea.length;i++){
            for(let i=1;i<3;i++){
                await page.select('#netSiteArea',netSiteArea[i]);
                await page.waitFor(1000);
                let netSiteName=await page.$$eval('#netSiteName option',els=>{
                    let arr=[];
                    els.forEach(el=>{
                        arr.push(el.value)
                    })
                    return arr;
                })
                await  obj.push({
                    [netSiteArea[i]]:netSiteName
                })
            }
            await twoObj.push({
                [netSiteCity[i]]:obj
            })
        }
        await allObj.push({
            [netSiteProvince[i]]:twoObj
        })

    }
    let apiData={
        code:0,
        message:'suucess',
        data:allObj
    };
    await fs.writeFile('./data/data_10.json',JSON.stringify(apiData),function (err){
        if (err){
            throw err;
        }
    });
    await console.log(allObj)
    await browser.close();  //关闭浏览器
})();
// exports.run=async (els)=>{
//     let arr=[];
//     els.forEach(el=>{
//         arr.push(el.value)
//     })
//     return arr;
// }