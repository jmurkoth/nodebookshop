const Sequelize= require('sequelize');
const database =require('../utility/database');

const Cart= database.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    }

});
module.exports=Cart;