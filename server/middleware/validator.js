const { body, validationResult } = require('express-validator');
const { DATA_ERRS, DATA_VALIDATIONS, GLOBAL_ERRS } = require('../utilities/constants');
const { renderFormError } = require('../utilities/view-handler');

module.exports = {
    articleData: () => {
        return [
            body('title')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.ARTICLE_TITLE_MIN_LENGTH,
                    max: DATA_VALIDATIONS.ARTICLE_TITLE_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.ARTICLE_TITLE_LENGTH_VALIDATION_MESSAGE),
            body('text')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.ARTICLE_TEXT_MIN_LENGTH,
                    max: DATA_VALIDATIONS.ARTICLE_TEXT_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.ARTICLE_TEXT_LENGTH_VALIDATION_MESSAGE)
        ]
    },
    userRegister: () => {
        return [
            body('email')
                .notEmpty()
                .isEmail()
                .isLength({
                    min: DATA_VALIDATIONS.EMAIL_MIN_LENGTH,
                    max: DATA_VALIDATIONS.EMAIL_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE),
            body('password')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.PASSWORD_MIN_LENGTH,
                    max: DATA_VALIDATIONS.PASSWORD_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.PASSWORD_LENGTH_VALIDATION_MESSAGE),
            body('confirmPassword')
                .custom((value, { req }) => value == req.body.password)
                .withMessage(GLOBAL_ERRS.PASSWORD_MISSMATCH)
        ];
    },
    websiteData: () => {
        return [
            body('name')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.WEBSITE_NAME_MIN_LENGTH,
                    max: DATA_VALIDATIONS.WEBSITE_NAME_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE),
            body('domain')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.WEBSITE_DOMAIN_MIN_LENGTH,
                    max: DATA_VALIDATIONS.WEBSITE_DOMAIN_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.WEBSITE_DOMAIN_LENGTH_VALIDATION_MESSAGE),
            body('description')
                .notEmpty()
                .isLength({
                    min: DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MIN_LENGTH,
                    max: DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MAX_LENGTH
                })
                .withMessage(DATA_ERRS.WEBSITE_DESCRIPTION_LENGTH_VALIDATION_MESSAGE)
        ];
    },
    validate: (viewPath) => {
        return (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const extractedErrors = [];
                errors.array().map(err => extractedErrors.push(err.msg));

                return renderFormError(
                    res,
                    req.body,
                    viewPath,
                    extractedErrors[0]);
            }

            next();
        };
    }
};