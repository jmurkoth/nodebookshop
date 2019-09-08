const fileSave = require('../utility/filesave');
const path =require('path');
const rootDir= require('../utility/path');
const filePath=path.join(rootDir,'cart.json');
module.exports = class Cart{
    constructor( cartProducts)
    {
        this.CartProducts = cartProducts;
        this.TotalPrice = Cart.calculateCartTotal(cartProducts);
    }
     
    static addProduct(cartProduct){
        console.log(`Adding product ${cartProduct.product.id} quantity ${cartProduct.quantity} to cart`);
        fileSave.readFile(filePath,(data)=> {
            if(data.length===0){data=new Cart([])};
            let existingProd= data.CartProducts.findIndex(c=> c.product.id==cartProduct.product.id);
            // see of it is an existing product if so update 
            if(existingProd>=0)
            {
               data.CartProducts[existingProd].quantity= parseInt(data.CartProducts[existingProd].quantity) + parseInt(cartProduct.quantity);
            }
            else{
            //else add 
            data.CartProducts.push(cartProduct);
            }
            //Calculate the price
            data.TotalPrice=Cart.calculateCartTotal(data.CartProducts);
            fileSave.writeFile(filePath,data,()=>{
                console.log('saved');
            })
        });
    }
 
    removeProduct(cartProduct){

    }
    
    static calculateCartTotal(cartProducts){
        
        let total=0;
        cartProducts.forEach(cp => {
            total= total+(cp.product.price*cp.quantity);
        });
       return total;
    }
}