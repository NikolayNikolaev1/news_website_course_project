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
    isInRole: (role) => {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.redirect(ROUTES.LOGIN);
            }
        }
    },
    isPublisher: (publicAccess) => {
        // Middlesware for checking if user is publisher of visited website.
        // Allows access to publisher only functionallity such as: Article Create/Edit/Delete, Website Edit/Delete etc...
        // Using for publisher buttons on navigation.
        return asyncHandler(async (req, res, next) => {
            const domain = req.params.domain;
            res.locals.domain = domain;

            if (!req.isAuthenticated()) {
                if (publicAccess) {
                    // Public access allows none authenticated users to visit website/articles.
                    next();
                    return;
                }

                res.redirect('/');
            }

            const userId = req.user._id;

            await isUserWebsitePublisher(domain, userId)
                .then(result => {
                    if (!result) {
                        if (publicAccess) {
                            // Public access allows none publishers to get to page.
                            next();
                            return;
                        }

                        res.redirect('/');
                    }

                    res.locals.isPublisher = true;

                    next();
                    return;
                })
                .catch(error => {
                    error.type = "mongodb";
                    next(error);
                });
        });
    },
}