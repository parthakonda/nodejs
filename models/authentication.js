const Sequelize = require('sequelize');
const config = require('../config/dev');

const User = config.sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});


module.exports = {
    'User': User
}