const { ROUTES } = require('../utilities/constants');
const { isUserWebsitePublisher } = require('../services/website');
const asyncHandler = require('../utilities/async-handler');

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
    isPublisher: asyncHandler(async (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.redirect('/');
        }

        const domain = req.params.domain;
        const userId = req.user._id;

        await isUserWebsitePublisher(domain, userId)
            .then(result => {
                if (!result) {
                    res.redirect('/');
                }
                else {
                    res.locals.isPublisher = {
                        domain
                    };
                    next();
                }
            })
            .catch(error => {
                error.type = "mongodb";
                next(error);
            });
    }),
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