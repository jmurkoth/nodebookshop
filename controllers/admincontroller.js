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
    Product.findByPk(id).then((matchProd)=>{
       return matchProd.destroy();
    }).then(()=>{
       console.log('Product deleted');
       res.redirect('/admin/products'); 
    }).catch(()=>{
        console.log(`Failed to find product Error : ${err}`);
    });
}
module.exports.getEditProduct=(req,res,next)=>{
     
     let productId=req.params.id;
     console.log(`Request param id :${productId}`);
    Product.findByPk(productId).then((matchProd)=>{
        res.render('admin/edit-product.ejs',{path:'/admin/edit-product',product:matchProd });
    }).catch(()=>{
        console.log(`Failed to find product Error : ${err}`);
    });
}
module.exports.postEditProduct=(req,res,next)=>{
     
    let name =req.body.name;
    let description =req.body.description;
    let price =parseFloat(req.body.price);
    let imageURl =req.body.imageUrl;
    let id =req.body.productId;
    Product.findByPk(id).then((matchProd)=>{
      matchProd.name= name;
      matchProd.description=description;
      matchProd.price=price;
      matchProd.image= imageURl;
      return matchProd.save();
    }).then(()=>{
        res.redirect('/');
    }).catch(()=>{
        console.log(`Failed to find product Error : ${err}`);
    });

  
   
}

module.exports.addProduct=(req, res)=>{
    let name =req.body.name;
    let description =req.body.description;
    let price =parseFloat(req.body.price);
    let imageURl =req.body.imageUrl;
    Product.create({
        name: name,
        description:description,
        image:imageURl,
        price:price
    }).then((p)=>{
        res.redirect('/');
    }).catch(err=>{
        console.log(`Could not create product Error :${err}`);
    });

}
module.exports.getProducts=(req,res)=>{
    Product.findAll().then(products=>{
        res.render('admin/products.ejs',{path:'/admin/products', products:products});
    });
}