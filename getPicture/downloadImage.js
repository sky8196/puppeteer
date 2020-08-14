const fs = require('fs');
let path = require('path');
const request = require('request');
const Bagpipe = require('bagpipe');
const crypto = require('crypto');
let lsArray = [];
fs.readFile('./data/3.txt','utf-8',(err,val)=>{
    lsArray = val.split(',')
    console.log(123)
    let index =1
    let downloadPic = function(src, dest){
        request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
            console.log('pic saved!')
        })
    }
    let bagpipe = new Bagpipe(10,{timeout: 200});
    for (let i = 0; i < lsArray.length; i++) {
        let destImage = path.resolve("./images/", lsArray[i].split("/")[lsArray[i].split("/").length -1]);
        bagpipe.push(downloadPic, lsArray[i], destImage, function(err, data) {
            console.log("["+ index++ +"]: " + data+err);
        });
    }
})
