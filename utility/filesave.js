const fs = require('fs');


//const filePath=path.join(rootDir,'products.json');

module.exports.readFile=(filePath,cb)=>{
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

module.exports.writeFile=(filePath,data,cb)=>{
    var stringVal= JSON.stringify(data,'product');
    fs.writeFile(filePath,stringVal,(err)=>{
        if(!err)
        {
            cb();
        }
    });
}