const mongodb = require('mongodb');
const url = 'mongodb:49.234.124.17:27017/foo';

mongodb.connect(url,(err,client)=>{
    if (err) {
        console.log('连接失败');
    } else {
        client.close();
        console.log('链接成功');
    }
})

