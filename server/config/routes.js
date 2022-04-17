const controllers = require('../controllers');
const { VIEWS } = require('../utilities/constants');

module.exports = app => {
    app.use(controllers.admins);
    app.use(controllers.articles);
    app.use(controllers.home);
    app.use(controllers.users);
    app.use(controllers.websites);

    app.get('/:domain/suspended', (req, res) => {
        res.render('errors/suspended');
    });

    app.all('*', (req, res) => {
        res.status(404);
        res.render(VIEWS.ERROR_404);
    });
};