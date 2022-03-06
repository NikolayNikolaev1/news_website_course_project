const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        ADMIN_EMAIL: 'admin@admin.admin',
        ADMIN_PASSWORD: 'admin',
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/news-website-db',
        PORT: 8000,
        ROOT_PATH: rootPath,
        SESSION_SECRET: 'session-secret',
        URL: 'http://localhost'
    },
    production: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
        PORT: process.env.port,
        ROOT_PATH: rootPath,
        SESSION_SECRET: process.env.SESSION_SECRET_STRING,
        URL: process.env.URL
    }
};