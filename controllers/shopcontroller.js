const express= require('express');
const Product  = require('../models/Product');
const Cart = require('../models/cart');
const CartProduct = require('../models/CartProduct');
module.exports.getCart=(req,res)=>{
    res.render('shop/cart.ejs',{path:'/cart'});
}

module.exports.getProducts=(req,res)=>{
    Product.getAll((prods)=>{
        res.render('shop/products.ejs',{path:'/products',products:prods});
    })
    
}

module.exports.getOrders=(req,res)=>{
    res.render('shop/orders.ejs',{path:'/orders'});
}

module.exports.getProductDetails=(req,res)=>{
    let productID=req.params.productId;
    Product.getProductById(productID,(prod)=>{
        res.render('shop/product-detail.ejs',{path:'/product-detail', product:prod});
    });
    
}

module.exports.getHome=(req,res)=>{
    Product.getAll((prods)=>{
        res.render('shop/home.ejs',{path:'/home',products:prods});
    })
}

module.exports.postToCart= (req, res)=>{
    let productId= req.body.productId;
    let quantity = req.body.quantity? parseInt(req.body.quantity):1 ;
    Product.getProductById(productId,(prod)=>{
        let cp =new CartProduct(prod,quantity);
        Cart.addProduct(cp);
        res.redirect('/cart');
        });
   
    
}
