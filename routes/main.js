const express = require('express');
const homeController =require('../controllers/homecontroller');
const router = express.Router();


router.use((req,res)=>{
    res.status(404).render('404.ejs',{path:''});
})
module.exports=router;