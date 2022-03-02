const router = require('express').Router();
const { DATA_ERRS, DATA_VALIDATIONS, GLOBAL_ERRS, ROUTES, VIEWS } = require('../utilities/constants');
const encryption = require('../utilities/encryption');
const userService = require('../services/user');

router.get(ROUTES.LOGIN, (req, res) => {
    res.render(VIEWS.LOGIN, { loginRoute: ROUTES.LOGIN });
});

router.post(ROUTES.LOGIN, async (req, res) => {
    let userModel = req.body;

    await userService
        .getUserByEmailAsync(userModel.email)
        .then(user => {
            if (!user) {
                renderViewWithError(res, userModel, VIEWS.LOGIN, GLOBAL_ERRS.INVALID_USER_DATA);
                return;
            }

            if (!user.authenticate(userModel.password)) {
                renderViewWithError(res, userModel, VIEWS.LOGIN, GLOBAL_ERRS.INVALID_USER_DATA);
                return;
            }

            req.login(user, (err, user) => {
                if (err) {
                    renderViewWithError(res, userModel, VIEWS.LOGIN, err);
                    return;
                }

                res.redirect('/');
            })
        });
});

router.post(ROUTES.LOGOUT, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get(ROUTES.REGISTER, (req, res) => {
    res.render(VIEWS.REGISTER, { registerRoute: ROUTES.REGISTER });
});

router.post(ROUTES.REGISTER, async (req, res) => {
    let userModel = req.body;

    if (!userModel) {
        renderViewWithError(res, userModel, VIEWS.REGISTER, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE)
    }

    if (userModel.email.length < DATA_VALIDATIONS.EMAIL_MIN_LENGTH ||
        userModel.email.length > DATA_VALIDATIONS.EMAIL_MAX_LENGTH) {
        renderViewWithError(res, userModel, VIEWS.REGISTER, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE);
        return;
    }

    if (userModel.password.length < DATA_VALIDATIONS.PASSWORD_MIN_LENGTH ||
        userModel.password.length > DATA_VALIDATIONS.PASSWORD_MAX_LENGTH ||
        userModel.confirmPassword.length < DATA_VALIDATIONS.PASSWORD_MIN_LENGTH ||
        userModel.confirmPassword.length > DATA_VALIDATIONS.PASSWORD_MAX_LENGTH) {
        renderViewWithError(res, userModel, VIEWS.REGISTER, DATA_ERRS.PASSWORD_LEGNTH_VALIDATION_MESSAGE);
        return;
    }

    if (userModel.password !== userModel.confirmPassword) {
        renderViewWithError(res, userModel, VIEWS.REGISTER, GLOBAL_ERRS.PASSWORD_MISSMATCH);
        return;
    }

    userModel.salt = encryption.generateSalt();
    userModel.hashedPassword = encryption.generateHashedPassword(userModel.salt, userModel.password);

    await userService
        .createAsync(userModel.email, userModel.hashedPassword)
        .then(user => {
            req.logIn(user, (err, user) => {
                if (err) {
                    renderViewWithError(res, userModel, VIEWS.REGISTER, err);
                    return;
                }

                res.redirect('/');
            });
        });
});

module.exports = router;

function renderViewWithError(res, userModel, viewPath, errorMessage) {
    res.locals.globalError = errorMessage;
    res.render(viewPath, { user: userModel, loginRoute: ROUTES.LOGIN });
}