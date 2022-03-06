const express = require('express');

const env = process.env.NODE_ENV || 'development';

const settings = require('./server/config/settings')[env];
const config = require('./server/config');

start();

async function start() {
    const app = express();
    await config(app, settings);

    app.listen(settings.PORT, () => {
        if (env === 'development') {
            console.log(`Appliation started at ${settings.URL}:${settings.PORT}`);
        }
    });
};
