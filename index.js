const express = require('express');

const env = process.env.NODE_ENV || 'development';

const config = require('./server/config')[env];
const dbConfig = require('./server/config/database');
const expressConfig = require('./server/config/express');
const routesConfig = require('./server/config/routes');
require('./server/config/passport')();

start();

async function start() {
    const app = express();

    await dbConfig(config);
    expressConfig(config, app);
    routesConfig(app);

    app.listen(config.PORT, () => {
        if (env === 'development') {
            console.log(`Appliation started at ${config.URL}:${config.PORT}`);
        }
    });
};
