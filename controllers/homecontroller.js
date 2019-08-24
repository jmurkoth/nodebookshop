const express = require('express');

module.exports.getHome=(req, res,next)=>{
    res.render('index.ejs',{ path:'/home'});
}