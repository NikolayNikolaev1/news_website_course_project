module.exports = Object.freeze({
    DATA: {
        REQUIRED_VALIDATION_MESSAGE: '{PATH} is required',
        get PASSWORD_LENGTH_VALIDATION_MESSAGE() {
            return `Password must be between ${this.VALIDATIONS.PASSWORD_MIN_LENGTH} and ${this.VALIDATIONS.PASSWORD_MAX_LENGTH} characters.`;
        },
        get EMAIL_LENGTH_VALIDATION_MESSAGE() {
            return `Email must be between ${this.VALIDATIONS.EMAIL_MIN_LENGTH} and ${this.VALIDATIONS.EMAIL_MAX_LENGTH} characters.`;
        },
        get WEBSITE_ID_LENGTH_VALIDATION_MESSAGE() {
            return `Name must be between ${this.VALIDATIONS.WEBSITE_ID_MIN_LENGTH} and ${this.VALIDATIONS.WEBSITE_ID_MAX_LENGTH} characters long.`;
        },
        get WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE() {
            return `Name must be between ${this.VALIDATIONS.WEBSITE_NAME_MIN_LENGTH} and ${this.VALIDATIONS.WEBSITE_NAME_MAX_LENGTH} characters long.`;
        },
        VALIDATIONS: {
            EMAIL_MAX_LENGTH: 320,
            EMAIL_MIN_LENGTH: 3,
            PASSWORD_MAX_LENGTH: 256,
            PASSWORD_MIN_LENGTH: 4,
            WEBSITE_ID_MAX_LENGTH: 10,
            WEBSITE_ID_MIN_LENGTH: 3,
            WEBSITE_NAME_MAX_LENGTH: 20,
            WEBSITE_NAME_MIN_LENGTH: 4
        },
    },
    GLOBAL_ERRS: {
        EMAIL_EXISTS: 'Email already in use.',
        INVALID_USER_DATA: 'Invalid user data.',
        PASSWORD_MISSMATCH: 'Passwords do not match.',
        WEBSITE_ID_EXISTS: 'Website with this ID already exists.'
    },
    RES_ERR_TYPE: {
        DATABASE: 'mongodb'
    },
    ROUTES: {
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTER: '/register',
        WEBSITE_CREATE: '/website/create'
    },
    VIEWS: {
        ERROR_404: 'errors/404',
        ERROR_500: 'errors/500',
        HOME: 'home/index',
        LOGIN: 'users/login',
        REGISTER: 'users/register',
        WEBSITE_CREATE: 'websites/create'
    }
});