const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { isAuthenticated, isGuest } = require('../middleware/auth');
const { userRegister, validate } = require('../middleware/validator');
const { renderFormError } = require('../utilities/view-handler');
const { RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const userService = require('../services/user');

router.get(ROUTES.LOGIN, isGuest, (req, res) => {
    res.render(VIEWS.LOGIN, { route: ROUTES.LOGIN });
});

router.post(
    ROUTES.LOGIN,
    isGuest,
    asyncHandler(async (req, res, next) => {
        let userModel = req.body;

        await userService
            .signup(userModel.email, userModel.password)
            .then(user => req.login(user, (err, user) => { res.redirect('/'); }))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        userModel,
                        VIEWS.LOGIN,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.post(ROUTES.LOGOUT, isAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(ROUTES.REGISTER, isGuest, (req, res) => {
    res.render(VIEWS.REGISTER, { route: ROUTES.REGISTER });
});

router.post(
    ROUTES.REGISTER,
    isGuest,
    userRegister(),
    validate(VIEWS.REGISTER),
    asyncHandler(async (req, res, next) => {
        let userModel = req.body;

        await userService
            .create(userModel.email, userModel.password)
            .then(user => req.login(user, (err, user) => { res.redirect('/'); }))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        userModel,
                        VIEWS.REGISTER,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

module.exports = router;