const fileSave = require('../utility/filesave');
module.exports =  class Product {
       constructor(name, description, image, price)
       {
           this.name=name;
           this.description=description;
           this.image=image;
           this.price=price;
       }

       save(){
          

           fileSave.readFile((data)=>{
               if(data===null){data=[]};
            data.push(this);
            fileSave.writeFile(data,()=>{
                console.log('saved now');
            })
           })
       }
      
      static getAll(cb){
           fileSave.readFile((data)=>{
              cb(data);
           });
       }
}