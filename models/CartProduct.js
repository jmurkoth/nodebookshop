
const Sequelize= require('sequelize');
const database =require('../utility/database');

const CartProduct= database.define('cart_product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
    }

});
module.exports=CartProduct;
