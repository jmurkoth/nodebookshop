const database = require('../utility/database');
const Sequelize = require('sequelize');

const User = database.define('user',{
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
    email:{type:Sequelize.STRING}
  });

module.exports=User;