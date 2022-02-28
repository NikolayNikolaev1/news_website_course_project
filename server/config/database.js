const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = config => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;

        db.on('error', err => {
            console.error('connection error: ', err);
            reject(err);
        });

        db.once('open', () => {
            console.log('Database ready');
            resolve();
        });

        User.seedAdminUser(config.ADMIN_EMAIL, config.ADMIN_PASSWORD);
    });
};