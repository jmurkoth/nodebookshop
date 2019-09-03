const fileSave = require('../utility/filesave');
module.exports =  class Product {
    
       constructor(id, name, description, image, price)
       {   
           this.name=name;
           this.description=description;
           this.image=image;
           this.price=price;
           this.id=id;
        
       }
       save(){
          

           fileSave.readFile((data)=>{
            
            if(data===null){data=[]};
            // add the new product
            if (this.id=='')
            {
              //generate the new id 
              this.id=Math.random().toString(36).substr(2,9);
              data.push(this);
            }
            else{
                
                data.forEach(c=>{
                  if(c.id===this.id)
                  {
                      c.name=this.name;
                      c.description=this.description;
                      c.price=this.price;
                      c.image=this.image;
                  }
                });
            }
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
       
       static deleteProductById(id,calb){
           console.log('deleting the product ');
           fileSave.readFile((data)=>{
                let dataToSave =data.filter(c=> c.id!=id);
                fileSave.writeFile(dataToSave,()=>{
                    calb();
                });
           });
           
       }
       static getProductById(id ,calb) {
           console.log(`received param: ${id}`);
           fileSave.readFile((data)=>{
             var matchProduct = data.find(c=> c.id==id);
             console.log(`id: ${id} matching product :${JSON.stringify(matchProduct)}`)
             calb(matchProduct);
           });
       }
}