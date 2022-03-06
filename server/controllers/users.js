const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { GLOBAL_ERRS, RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const encryption = require('../utilities/encryption');
const { renderViewWithError } = require('../utilities/view-handler');
const userService = require('../services/user');
const validators = require('../middleware/validators');


router.get(ROUTES.LOGIN, (req, res) => {
    res.render(VIEWS.LOGIN, { authRoute: ROUTES.LOGIN });
});

router.post(ROUTES.LOGIN, asyncHandler(async (req, res) => {
    let userModel = req.body;

    await userService
        .getUserByEmailAsync(userModel.email)
        .then(user => {
            if (!user) {
                renderViewWithError(res, userModel, ROUTES.LOGIN, VIEWS.LOGIN, GLOBAL_ERRS.INVALID_USER_DATA);
                return;
            }

            if (!user.authenticate(userModel.password)) {
                renderViewWithError(res, userModel, ROUTES.LOGIN, VIEWS.LOGIN, GLOBAL_ERRS.INVALID_USER_DATA);
                return;
            }

            req.login(user, (err, user) => {
                if (err) {
                    renderViewWithError(res, userModel, ROUTES.LOGIN, VIEWS.LOGIN, err);
                    return;
                }

                res.redirect('/');
            })
        })
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });;
}));

router.post(ROUTES.LOGOUT, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(ROUTES.REGISTER, (req, res) => {
    res.render(VIEWS.REGISTER, { authRoute: ROUTES.REGISTER });
});

router.post(ROUTES.REGISTER, validators.userRegister, asyncHandler(async (req, res, next) => {
    let userModel = req.body;

    userModel.salt = encryption.generateSalt();
    userModel.hashedPassword = encryption.generateHashedPassword(userModel.salt, userModel.password);

    await userService
        .createAsync(userModel.email, userModel.hashedPassword, userModel.salt)
        .then(user => {
            if (!user) {
                renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, GLOBAL_ERRS.EMAIL_EXISTS);
                return;
            }

            req.logIn(user, (err, user) => {
                if (err) {
                    renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, err);
                    return;
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