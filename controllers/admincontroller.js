const express = require('express');
const Product = require('../models/Product');


module.exports.getProducts=(req,res,next)=>{
    res.send('products');
}
module.exports.getAddProduct=(req,res,next)=>{
    res.render('admin/add-product.ejs',{path:'/admin/add-product'});
}
module.exports.deleteProduct=(req,res,next)=>{
    let id =req.body.productId;
    console.log(`product to delete : ${id}`);
    
    next();
}
module.exports.getEditProduct=(req,res,next)=>{
     
     let productId=req.params.id;
     console.log(`Request param id :${productId}`);
     Product.getProductById(productId,(matchProd)=>{
        res.render('admin/edit-product.ejs',{path:'/admin/edit-product',product:matchProd });
     });
    
}
module.exports.postEditProduct=(req,res,next)=>{
     
    let name =req.body.name;
    let description =req.body.description;
    let price =req.body.price;
    let imageURl =req.body.imageUrl;
    let id =req.body.productId;
    var prod = new Product (id, name,description,imageURl,price);
    prod.save();
    res.redirect('/');
   
}

module.exports.addProduct=(req, res)=>{
    let name =req.body.name;
    let description =req.body.description;
    let price =req.body.price;
    let imageURl =req.body.imageUrl;
    var prod = new Product ('', name,description,imageURl,price);
    prod.save();
    res.redirect('/');

}
module.exports.getProducts=(req,res)=>{
    Product.getAll((products)=>{
        res.render('admin/products.ejs',{path:'/admin/products', products:products});
    })
    
}