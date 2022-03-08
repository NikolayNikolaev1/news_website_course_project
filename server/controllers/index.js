const homeController = require('./home');
const usersController = require('./users');
const websitesController = require('./websites');

module.exports = {
    home: homeController,
    users: usersController,
    websites: websitesController
};