const fs = require('fs');
const request = require('request');
const crypto = require("crypto");
let path = require('path');
let index=1;
function cryptPwd() {
    // 密码“加盐”
    const saltPassword = Date.now() + ':' + 'abc';

    // 密码“加盐”的md5
    const md5 = crypto.createHash("md5");
    const result = md5.update(saltPassword).digest("hex");
    return result+'.jpg';
}

let downloadPic = function(){
    const src = 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
    const name = cryptPwd();
    let destImage = path.resolve("./HighDefinitionPicture/", name);
    request(src).pipe(fs.createWriteStream(destImage)).on('close',function(){
        console.log(index++)
        downloadPic();
    })
}
try {
    downloadPic();
}catch (e) {
    console.log(e)
    downloadPic();
}
