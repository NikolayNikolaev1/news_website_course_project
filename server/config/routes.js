const controllers = require('../controllers');
const { VIEWS } = require('../utilities/constants');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);

    app.use(controllers.articles);
    app.use(controllers.users);
    app.use(controllers.websites);

    app.all('*', (req, res) => {
        res.status(404);
        res.render(VIEWS.ERROR_404);
    });
};