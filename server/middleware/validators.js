const { DATA, GLOBAL_ERRS, ROUTES, VIEWS } = require('../utilities/constants');
const { renderViewWithError } = require('../utilities/view-handler');

module.exports = {
    userRegister: (req, res, next) => {
        let userModel = req.body;

        if (!userModel.email
            || userModel.email.length < DATA.VALIDATIONS.EMAIL_MIN_LENGTH
            || userModel.email.length > DATA.VALIDATIONS.EMAIL_MAX_LENGTH) {
            return renderViewWithError(
                res,
                userModel,
                ROUTES.REGISTER,
                VIEWS.REGISTER,
                DATA.EMAIL_LENGTH_VALIDATION_MESSAGE);
        }

        if (!userModel.password
            || !userModel.confirmPassword
            || userModel.password.length < DATA.VALIDATIONS.PASSWORD_MIN_LENGTH
            || userModel.password.length > DATA.VALIDATIONS.PASSWORD_MAX_LENGTH
            || userModel.confirmPassword.length < DATA.VALIDATIONS.PASSWORD_MIN_LENGTH
            || userModel.confirmPassword.length > DATA.VALIDATIONS.PASSWORD_MAX_LENGTH) {
            return renderViewWithError(
                res,
                userModel,
                ROUTES.REGISTER,
                VIEWS.REGISTER,
                DATA.PASSWORD_LENGTH_VALIDATION_MESSAGE);
        }

        if (userModel.password !== userModel.confirmPassword) {
            return renderViewWithError(
                res,
                userModel,
                ROUTES.REGISTER,
                VIEWS.REGISTER,
                GLOBAL_ERRS.PASSWORD_MISSMATCH);
        }

        next();
    },
    websiteCreate: (req, res, next) => {
        let websiteModel = req.body;

        if (!websiteModel.name
            || websiteModel.name.length < DATA.VALIDATIONS.WEBSITE_NAME_MIN_LENGTH
            || websiteModel.name.length > DATA.VALIDATIONS.WEBSITE_ID_MAX_LENGTH) {
            return renderViewWithError(
                res,
                websiteModel,
                ROUTES.WEBSITE_CREATE,
                VIEWS.WEBSITE_CREATE,
                DATA.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE);
        }

        if (!websiteModel.id
            || websiteModel.id.length < DATA.VALIDATIONS.WEBSITE_ID_MIN_LENGTH
            || websiteModel.id.length > DATA.VALIDATIONS.WEBSITE_ID_MAX_LENGTH) {
            return renderViewWithError(
                res,
                websiteModel,
                ROUTES.WEBSITE_CREATE,
                VIEWS.WEBSITE_CREATE,
                DATA.WEBSITE_ID_LENGTH_VALIDATION_MESSAGE);
        }

        next();
    }
};