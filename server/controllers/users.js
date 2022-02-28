const router = require('express').Router();
const encryption = require('../utilities/encryption');
const userService = require('../services/user');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    let userModel = req.body;

    await userService
        .getUserByEmailAsync(userModel.email)
        .then(user => {
            if (!user) {
                res.locals.globalError = 'Invalid user data';
                res.render('users/login', { user: userModel });
                return;
            }

            if (!user.authenticate(userModel.password)) {
                res.locals.globalError = 'Invaid user data';
                res.render('users/login', { user: userModel });
                return;
            }

            req.login(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/login', { user: userModel });
                    return;
                }

                res.redirect('/');
            })
        });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    let userModel = req.body;

    if (userModel.password !== userModel.confirmPassword) {
        res.locals.globalError = 'Passwords do not match!';
        res.render('users/register', { user: userModel });
        return;
    }

    userModel.salt = encryption.generateSalt();
    userModel.hashedPassword = encryption.generateHashedPassword(userModel.salt, userModel.password);

    await userService
        .createAsync(userModel.email, userModel.hashedPassword)
        .then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err
                    res.render('users/register', { user: userModel });
                    return;
                }

                res.redirect('/');
            });
        });
});

module.exports = router;