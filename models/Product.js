const database = require('../utility/database');
const Sequelize = require('sequelize');

const Product = database.define('products',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name :{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{type:Sequelize.STRING},
    image :{type:Sequelize.STRING},
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },

});

module.exports=Product