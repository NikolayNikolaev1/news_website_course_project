const adminsController = require('./admins');
const articlesController = require('./articles');
const homeController = require('./home');
const usersController = require('./users');
const websitesController = require('./websites');

module.exports = {
    admins: adminsController,
    articles: articlesController,
    home: homeController,
    users: usersController,
    websites: websitesController
};