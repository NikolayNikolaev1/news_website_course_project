const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { GLOBAL_ERRS, RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const encryption = require('../utilities/encryption');
const { isAuthenticated, isGuest } = require('../middleware/auth');
const { renderViewWithError } = require('../utilities/view-handler');
const { userRegister } = require('../middleware/validators');
const userService = require('../services/user');

router.get(ROUTES.LOGIN, isGuest, (req, res) => {
    res.render(VIEWS.LOGIN, { route: ROUTES.LOGIN });
});

router.post(ROUTES.LOGIN, isGuest, asyncHandler(async (req, res) => {
    let userModel = req.body;

    await userService
        .getUserByEmailAsync(userModel.email)
        .then(user => {
            if (!user) {
                return renderViewWithError(
                    res,
                    userModel,
                    ROUTES.LOGIN,
                    VIEWS.LOGIN, GLOBAL_ERRS.INVALID_USER_DATA);
            }

            if (!user.authenticate(userModel.password)) {
                return renderViewWithError(
                    res,
                    userModel,
                    ROUTES.LOGIN,
                    VIEWS.LOGIN,
                    GLOBAL_ERRS.INVALID_USER_DATA);
            }

            req.login(user, (err, user) => {
                if (err) {
                    return renderViewWithError(
                        res,
                        userModel,
                        ROUTES.LOGIN,
                        VIEWS.LOGIN,
                        err);
                }
                
                res.redirect('/');
            })
        })
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });;
}));

router.post(ROUTES.LOGOUT, isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(ROUTES.REGISTER, isGuest, (req, res) => {
    res.render(VIEWS.REGISTER, { route: ROUTES.REGISTER });
});

router.post(ROUTES.REGISTER, isGuest, userRegister, asyncHandler(async (req, res, next) => {
    let userModel = req.body;

    userModel.salt = encryption.generateSalt();
    userModel.hashedPassword = encryption.generateHashedPassword(userModel.salt, userModel.password);

    await userService
        .createAsync(userModel.email, userModel.hashedPassword, userModel.salt)
        .then(user => {
            if (!user) {
                return renderViewWithError(
                    res,
                    userModel,
                    ROUTES.REGISTER,
                    VIEWS.REGISTER,
                    GLOBAL_ERRS.EMAIL_EXISTS);
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    return renderViewWithError(
                        res,
                        userModel,
                        ROUTES.REGISTER,
                        VIEWS.REGISTER,
                        err);
                }

                res.redirect('/');
            });
        })
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });
}));

module.exports = router;