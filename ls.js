const puppeteer=require('puppeteer');
class  Ls {
    constructor(){
        this.target={
            province:'#netSiteProvince',
            city:'#netSiteCity',
            area:'#netSiteArea',
            name:'#netSiteName'
        }
    }
    async start(){
      await this.openBrowser();
      let netSiteProvince=await this.getProvince(this.target.province);
      await console.log(netSiteProvince);
      await this.browser.close();
    }
    async openBrowser(){
        this.browser=await puppeteer.launch({
            headless:false
        });
        this.page=await this.browser.newPage();
        await this.page.goto('https://web.zj.icbc.com.cn/p/tbxz/pc/init?data=CB27FC5421D3F0031504B2DCE5BC355FF7F8B3C0A0E59510C8C743852774F3E78F9139C85DF336DE8172EF5C5AE414485E4BEE08991E8481F80B8CC060041419ACCEC7576BEBE861562A8AE6482C1AD926930D85704FF959CDCE8686C3DF6911D1F67C91FF3826579AE9D84690AC7BFDCD643B044E89AE959FCB129B1B3C34E4', {timeout: 10 * 1000, waitUntil: 'networkidle2'});  //访问网址 只有2个网络连接时触发（至少500毫秒后）
        await this.page.waitForSelector('.btn-outline-secondary', {timeout: 10 * 1000});
        await this.page.click('.btn-outline-secondary');
        await this.page.waitFor('#netSiteProvince');
    }
    async getProvince(target){
        console.log(target)
        // let that=await this.pushArr;
        // console.log(this)
        let result=await this.page.$$eval(`${target} option`, els=>{
            console.log(els)
            return 1
        })
        return result;
    }
     pushArr(els){
        let arr=[];
        // for (let i=1;i<els.length;i++){
        //     arr.push(els[i].value)
        // }
        // els.forEach(el=>{
        //     arr.push(el.value)
        // })
        return arr;
    }

}
let start=new Ls();
start.start();