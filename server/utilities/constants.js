const DATA_VALIDATIONS = {
    ARTICLE_TEXT_MAX_LENGTH: 1000,
    ARTICLE_TEXT_MIN_LENGTH: 50,
    ARTICLE_TITLE_MAX_LENGTH: 100,
    ARTICLE_TITLE_MIN_LENGTH: 10,
    EMAIL_MAX_LENGTH: 320,
    EMAIL_MIN_LENGTH: 3,
    PASSWORD_MAX_LENGTH: 256,
    PASSWORD_MIN_LENGTH: 4,
    WEBSITE_DESCRIPTION_MAX_LENGTH: 300,
    WEBSITE_DESCRIPTION_MIN_LENGTH: 10,
    WEBSITE_DOMAIN_MAX_LENGTH: 10,
    WEBSITE_DOMAIN_MIN_LENGTH: 3,
    WEBSITE_NAME_MAX_LENGTH: 20,
    WEBSITE_NAME_MIN_LENGTH: 4
};

module.exports = Object.freeze({
    DATA_ERRS: {
        REQUIRED_VALIDATION_MESSAGE: '{PATH} is required',
        ARTICLE_TEXT_LENGTH_VALIDATION_MESSAGE:
            `Article text length must be between ${DATA_VALIDATIONS.ARTICLE_TEXT_MIN_LENGTH} and ${DATA_VALIDATIONS.ARTICLE_TEXT_MAX_LENGTH} characters long.`,
        ARTICLE_TITLE_LENGTH_VALIDATION_MESSAGE:
            `Article title length must be between ${DATA_VALIDATIONS.ARTICLE_TITLE_MIN_LENGTH} and ${DATA_VALIDATIONS.ARTICLE_TITLE_MAX_LENGTH} characters long.`,
        EMAIL_LENGTH_VALIDATION_MESSAGE:
            `Email must be between ${DATA_VALIDATIONS.EMAIL_MIN_LENGTH} and ${DATA_VALIDATIONS.EMAIL_MAX_LENGTH} characters.`,
        PASSWORD_LENGTH_VALIDATION_MESSAGE:
            `Password must be between ${DATA_VALIDATIONS.PASSWORD_MIN_LENGTH} and ${DATA_VALIDATIONS.PASSWORD_MAX_LENGTH} characters.`,
        WEBSITE_DESCRIPTION_LENGTH_VALIDATION_MESSAGE:
            `Description must be between ${DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MIN_LENGTH} and ${DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MAX_LENGTH} characters long.`,
        WEBSITE_DOMAIN_LENGTH_VALIDATION_MESSAGE:
            `Name must be between ${DATA_VALIDATIONS.WEBSITE_DOMAIN_MIN_LENGTH} and ${DATA_VALIDATIONS.WEBSITE_DOMAIN_MAX_LENGTH} characters long.`,
        WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE:
            `Name must be between ${DATA_VALIDATIONS.WEBSITE_NAME_MIN_LENGTH} and ${DATA_VALIDATIONS.WEBSITE_NAME_MAX_LENGTH} characters long.`
    },
    DATA_VALIDATIONS,
    GLOBAL_ERRS: {
        ARTICLE_NOT_EXISTS: `Article does not exist.`,
        EMAIL_EXISTS: email => `User with email "${email}" already exists.`,
        INVALID_USER_DATA: 'Invalid user data.',
        PASSWORD_MISSMATCH: 'Passwords do not match.',
        WEBSITE_DOMAIN_EXISTS: domain => `Website domain "${domain}" already exists.`,
        WEBSITE_NOT_EXISTS: `Website does not exist.`
    },
    RES_ERR_TYPE: {
        DATABASE: 'mongodb'
    },
    ROUTES: {
        ADMIN_INDEX: '/admin',
        ARTICLE_CREATE: '/:domain/article/create',
        ARTICLE_DELETE: `/:domain/article/delete/:id`,
        ARTICLE_EDIT: '/:domain/article/edit/:id',
        ARTICLE_INDEX: `/:domain/article/:id`,
        HOME_ABOUT: '/about',
        HOME_INDEX: '/',
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTER: '/register',
        USER_WEBSITES: '/:id/websites',
        WEBSITE_CREATE: '/website/create',
        WEBSITE_DELETE: '/:domain/delete',
        WEBSITE_EDIT: '/:domain/edit',
        WEBSITE_INDEX: '/:domain/home'
    },
    VIEWS: {
        ADMIN_INDEX: 'admins/index',
        ARTICLE_CREATE: 'articles/create',
        ARTICLE_EDIT: 'articles/edit',
        ARTICLE_INDEX: 'articles/index',
        ERROR_404: 'errors/404',
        ERROR_500: 'errors/500',
        HOME_ABOUT: 'home/about',
        HOME: 'home/index',
        LOGIN: 'users/login',
        REGISTER: 'users/register',
        USER_WEBSITES: 'users/websites',
        WEBSITE_CREATE: 'websites/create',
        WEBSITE_EDIT: 'websites/edit',
        WEBSITE_INDEX: 'websites/index'
    }
});