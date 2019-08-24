const express = require('express');
const homeController =require('../controllers/homecontroller');
const router = express.Router();

router.get('/',homeController.getHome);
router.get('/home',homeController.getHome);
router.use((req,res)=>{
    res.status(404).render('404.ejs',{path:''});
})
module.exports=router;