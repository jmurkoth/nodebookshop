const express =require('express');
const router=express.Router();
const adminController = require('../controllers/admincontroller');

router.get('/add-product',adminController.getAddProduct);
router.post('/add-product',adminController.addProduct);
router.get('/products',adminController.getProducts);
module.exports=router;