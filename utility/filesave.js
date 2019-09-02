const fs = require('fs');
const path =require('path');
const rootDir= require('./path');

const filePath=path.join(rootDir,'products.json');

module.exports.readFile=(cb)=>{
    fs.readFile(filePath,(err, data)=>{
        var arr=[];
        if(!err  &&  data!=null && data.length>0 )
        {
            arr=JSON.parse(data);
            console.log(arr);
            cb(arr);
        }else{
            cb(arr);
        }
    });
}

module.exports.writeFile=(data,cb)=>{
    var stringVal= JSON.stringify(data);
    fs.writeFile(filePath,stringVal,(err)=>{
        if(!err)
        {
            cb();
        }
    });
}