const express = require('express');
const Product = require('../models/Product');


module.exports.getProducts=(req,res,next)=>{
    res.send('products');
}
module.exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-product.ejs',{path:'/admin/add-product'});
}

module.exports.addProduct=(req, res)=>{
    let name =req.body.name;
    let description =req.body.description;
    let price =req.body.price;
    let imageURl =req.body.imageUrl;
    var prod = new Product ( name,description,imageURl,price);
    prod.save();
    res.redirect('/');

}