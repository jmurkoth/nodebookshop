const Sequelize = require('sequelize');
const sequelize = new Sequelize('nodebook','jmurkoth','jmurkoth',{ host:'localhost', dialect:'mysql'});

module.exports= sequelize;