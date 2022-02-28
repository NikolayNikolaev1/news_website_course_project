const auth = require('./auth');
const controllers = require('../controllers');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.use(controllers.users);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    });
};