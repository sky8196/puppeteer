const request = require('request');
const axios = require('axios');
const fs = require('fs');
function getImage(page=1,array=[]) {
    let b = '';
    const fileName = '3'
    axios(`https://www.mxnzp.com/api/image/girl/list?app_id=mmr6xofenhiofvyi&app_secret=RmNncDJ6S2JvWGpFa0dKQTFFWU5hQT09&page=${page}`)
        .then(res =>{
            if (res.data && res.data.code === 1 ){
                const imgArray = [...array,...res.data.data.list]
                console.log(`第${page}页`);
                if (res.data.data.totalPage !== page) {
                // if (1 !== page) {
                    setTimeout(()=>{
                        getImage(page+=1,imgArray)
                    },3000)
                } else {
                    console.log('读取完毕')
                    let lsArray = []
                    for (let i=0;i<imgArray.length;i+=1){
                        lsArray.push(imgArray[i].imageUrl)
                    }
                    console.log(lsArray.length);
                    lsArray = lsArray.toString();
                    try {
                        fs.accessSync(`./data/${fileName}.txt`);
                        fs.appendFile(`./data/${fileName}.txt`, `\r${lsArray}`, function(err) {
                            if(err) {
                                console.log(`错误:${err}`);
                                return false;
                            }
                            console.log(`写入成功`);
                        })
                    } catch (e) {
                        fs.writeFile(`./data/${fileName}.txt`,lsArray,function (err){
                            if (err){
                                throw err;
                            }
                            console.log(`生成文件，并写入`)
                        })
                    }
                }
            } else {
                console.log(res)
            }
        })
        .catch(error=>{
            console.log(error);
        })
    return b
}
getImage()