const express= require('express');
const Product  = require('../models/Product');
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

module.exports.getHome=(req,res)=>{
    Product.getAll((prods)=>{
        res.render('shop/home.ejs',{path:'/home',products:prods});
    })
}

