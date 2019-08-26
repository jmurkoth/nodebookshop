const express= require('express');

module.exports.getCart=(req,res)=>{
    res.render('shop/cart.ejs',{path:'/cart'});
}

module.exports.getProducts=(req,res)=>{
    res.render('shop/products.ejs',{path:'/products'});
}

module.exports.getOrders=(req,res)=>{
    res.render('shop/orders.ejs',{path:'/orders'});
}

