const express= require('express');
const Product  = require('../models/Product');
const Cart = require('../models/cart');
const CartProduct = require('../models/CartProduct');

//WARNING: SUB OPTIMAL DB CODE
module.exports.getCart=(req,res)=>{
    let cartFromDb;
    
    req.user.getCart().then(cartData=>{
        cartFromDb=cartData;
        return cartData.getProducts();
    })
    .then(products=>{
          // calculate the cart Total;
        let total=0;
        products.forEach(cp => {
            total= total+(cp.price*cp.cart_product.quantity);
        });
          res.render('shop/cart.ejs',{path:'/cart',cartProds:products,cartTotal:total});
    })
    .catch(err=>{
        console.log(`Unable to retrieve the cart ${err}`);
    });
}

module.exports.deleteCartProduct=(req,res)=>{
    let productId= req.body.productId;

    req.user.getCart()
    .then(cartData=>{
        return cartData.getProducts({where :{id:productId}});
    })
    .then(products=>{
        //console.log(products);
        products.forEach(prod=> prod.destroy());
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(`could not delete product from cart ${err}`)
    })
}

module.exports.getProducts=(req,res)=>{
    Product.findAll()
    .then(prods=>{
        res.render('shop/products.ejs',{path:'/products',products:prods});
    });
    
}

module.exports.getOrders=(req,res)=>{
    res.render('shop/orders.ejs',{path:'/orders'});
}

module.exports.getProductDetails=(req,res)=>{
    let productID=req.params.productId;
    Product.findByPk(productID)
    .then((matchProd)=>{
        res.render('shop/product-detail.ejs',{path:'/product-detail', product:matchProd});
     })
     .catch((err)=>{
         console.log(`Failed to find product Error : ${err}`);
     });
}

module.exports.getHome=(req,res)=>{
    Product.findAll().then(prods=>{
        res.render('shop/home.ejs',{path:'/home',products:prods});
    });
    
}

module.exports.postToCart= (req, res)=>{
    let productId= req.body.productId;
    let quantity = req.body.quantity? parseInt(req.body.quantity):1 ;
    let cartFromDb;
    let updatedQuantity=1;
 
    req.user.getCart()
    .then(cartData=>{
        cartFromDb= cartData;
        return cartData.getProducts({where :{id:productId}})
    })
    .then(products=>{
        let product;
        if(products.length>0)
        {
            product=products[0];
        }
        if(product)
        {
            // update the quantity
            //console.log(product);
            updatedQuantity=product.cart_product.quantity +1;
            // return the product
            return product
        }
        return Product.findByPk(productId);
    })
    .then(product =>{
        // add the product back to the cart
       return cartFromDb.addProduct(product,{through:{quantity:updatedQuantity, price:product.price}})
    })
    .then(()=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(`Unable to add product to cart ${err}`);
    })
    
}
