const express = require('express');

module.exports.getProducts=(req,res,next)=>{
    res.send('products');
}
module.exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-product.ejs',{path:'/admin/add-product'});
}