const axios = require('axios');
let path = require('path');
const fs = require('fs');
const request = require('request');
const Bagpipe = require('bagpipe');
let index = 1;
let lsArray = []
function getRDP(page=1,array=[]) {
    axios('https://api.dongmanxingkong.com/suijitupian/acg/1080p/index.php?return=json')
        .then(res =>{
            if (res.data && res.data.code === '200' ){
                let downloadPic = function(src, dest){
                    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
                    })
                }
                let url = res.data.imgurl.split("/")[res.data.imgurl.split("/").length -1];
                if (url.length>4 && lsArray.indexOf(url) < 0) {
                    lsArray.push(url);
                    let bagpipe = new Bagpipe(10,{timeout: 200});
                    let destImage = path.resolve("./comic/", url);
                    bagpipe.push(downloadPic,  res.data.imgurl, destImage, function(err, data) {
                        console.log("["+ index++ +"]");
                    });
                }
                setTimeout(()=>{
                    getRDP()
                },2000)
            } else {
                console.log(res)
            }
        })
        .catch(error=>{
            console.log(error);
        })
}
getRDP()