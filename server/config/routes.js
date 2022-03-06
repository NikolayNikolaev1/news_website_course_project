const auth = require('./auth');
const controllers = require('../controllers');
const { VIEWS } = require('../utilities/constants');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.use(controllers.users);

    app.all('*', (req, res) => {
        res.status(404);
        res.render(VIEWS.ERROR_404);
    });
};