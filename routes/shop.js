const express = require('express');
const shopController =require('../controllers/shopcontroller');
const router = express.Router();

router.get('/',shopController.getHome);
router.get('/home',shopController.getHome);
router.post('/cart',shopController.postToCart);
router.get('/cart',shopController.getCart);
router.get('/products',shopController.getProducts);
router.get('/orders',shopController.getOrders);
router.get('/products/:productId',shopController.getProductDetails);
router.post('/delete-cart-item', shopController.deleteCartProduct);


module.exports=router;