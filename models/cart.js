const fileSave = require('../utility/filesave');
const path =require('path');
const rootDir= require('../utility/path');
const filePath=path.join(rootDir,'data','cart.json');


module.exports = class Cart{
    constructor( cartProducts)
    {
        this.CartProducts = cartProducts;
        this.TotalPrice = Cart.calculateCartTotal(cartProducts);
    }
     
    static addProduct(cartProduct,cb){
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
               cb();
            });
        });
    }
 
    static removeProduct(productId,cb){
        console.log(`Removing product ${productId} from cart`);
        fileSave.readFile(filePath,(data)=> {
            if(data)
            {
                let dataToSave =data.CartProducts.filter(c=> c.product.id!=productId);
                data.CartProducts=dataToSave;
                data.TotalPrice=Cart.calculateCartTotal(dataToSave);
                fileSave.writeFile(filePath,data,()=>{
                    cb();
                 });
            }
          
        });
    }

    static calculateCartTotal(cartProducts){
        
        let total=0;
        cartProducts.forEach(cp => {
            total= total+(cp.product.price*cp.quantity);
        });
       return total;
    }

    static getAllCartItems( cb){
        fileSave.readFile(filePath,(data)=> {
            cb(data);
        });

    }
}