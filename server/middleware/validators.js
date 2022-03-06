const { DATA_ERRS, DATA_VALIDATIONS, GLOBAL_ERRS, ROUTES, VIEWS } = require('../utilities/constants');
const { renderViewWithError } = require('../utilities/view-handler');

module.exports = {
    userRegister: (req, res) => {
        let userModel = req.body;

        if (!userModel.email) {
            renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE);
            return;
        }

        if (!userModel.password) {
            renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, DATA_ERRS.PASSWORD_LEGNTH_VALIDATION_MESSAGE);
            return;
        }

        if (userModel.email.length < DATA_VALIDATIONS.EMAIL_MIN_LENGTH ||
            userModel.email.length > DATA_VALIDATIONS.EMAIL_MAX_LENGTH) {
            renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE);
            return;
        }

        if (userModel.password.length < DATA_VALIDATIONS.PASSWORD_MIN_LENGTH ||
            userModel.password.length > DATA_VALIDATIONS.PASSWORD_MAX_LENGTH ||
            userModel.confirmPassword.length < DATA_VALIDATIONS.PASSWORD_MIN_LENGTH ||
            userModel.confirmPassword.length > DATA_VALIDATIONS.PASSWORD_MAX_LENGTH) {
            renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, DATA_ERRS.PASSWORD_LEGNTH_VALIDATION_MESSAGE);
            return;
        }

        if (userModel.password !== userModel.confirmPassword) {
            renderViewWithError(res, userModel, ROUTES.REGISTER, VIEWS.REGISTER, GLOBAL_ERRS.PASSWORD_MISSMATCH);
            return;
        }
    }
};