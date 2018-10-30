// Database - Dev
// Database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('testdb', 'test', 'test', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
});

exports.sequelize = sequelize;
