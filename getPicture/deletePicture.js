const fs = require('fs');

const fileUrl = './HighDefinitionPicture'

let files = fs.readdirSync(fileUrl)

files.forEach(file=>{
    var stats = fs.statSync(fileUrl+'/'+file);
    if (stats.size < 1000) {
        console.log(stats)
        fs.unlinkSync(fileUrl+'/'+file);
    }
})