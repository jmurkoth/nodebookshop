const express = require('express');
const shopController =require('../controllers/shopcontroller');
const router = express.Router();

router.get('/',shopController.getHome);
router.get('/home',shopController.getHome);
router.get('/cart',shopController.getCart);
router.get('/products',shopController.getProducts);
router.get('/orders',shopController.getOrders);


module.exports=router;