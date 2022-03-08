const { ROUTES } = require('../utilities/constants');

module.exports = {
    isAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect(ROUTES.LOGIN);
        }
    },
    isGuest: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/');
        }
    },
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.redirect(ROUTES.LOGIN);
            }
        }
    }
}