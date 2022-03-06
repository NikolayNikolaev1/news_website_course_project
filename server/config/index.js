const expressConfig = require('./express');
const mongooseConfig = require('./database');
const routesConfig = require('./routes');
const passport = require('./passport');
const { RES_ERR_TYPE, VIEWS } = require('../utilities/constants');

module.exports = async (app, config) => {
    await mongooseConfig(config);
    expressConfig(app, config);
    routesConfig(app);
    passport();

    app.use((err, req, res, next) => {
        console.log('Error Handling Middleware called');
        console.log('Path: ', req.path);
        console.error('Error: ', err);

        if (err.type === RES_ERR_TYPE.DATABASE) {
            res.render(VIEWS.ERROR_500);
        }
    });
};