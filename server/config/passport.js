const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('../models/User');

module.exports = () => {
    passport.use(new LocalPassport(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            User
                .findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }

                    if (!user.authenticate(password)) {
                        return done(null, false);
                    }

                    return done(null, user);
                });
        }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        User
            .findById(id)
            .then(user => {
                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            });
    });
};