const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const handlebars = require('hbs');
const passport = require('passport')
const path = require('path');
const session = require('express-session');

module.exports = (app, config) => {
    app.set('view engine', 'hbs');
    app.set('views', path.join(config.ROOT_PATH, './server/views/'));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });

    app.use(express.static('public'));
};