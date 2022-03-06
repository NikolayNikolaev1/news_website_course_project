module.exports = Object.freeze({
    DATA_ERRS: {
        REQUIRED_VALIDATION_MESSAGE: '{PATH} is required',
        EMAIL_LENGTH_VALIDATION_MESSAGE: 'Email must be between 3 and 320 characters.',
        PASSWORD_LEGNTH_VALIDATION_MESSAGE: 'Password must be between 4 and 256 characters.'
    },
    DATA_VALIDATIONS: {
        EMAIL_MAX_LENGTH: 320,
        EMAIL_MIN_LENGTH: 3,
        PASSWORD_MAX_LENGTH: 256,
        PASSWORD_MIN_LENGTH: 4
    },
    GLOBAL_ERRS: {
        EMAIL_EXISTS: 'Email already in use.',
        INVALID_USER_DATA: 'Invalid user data.',
        PASSWORD_MISSMATCH: 'Passwords do not match.'
    },
    RES_ERR_TYPE: {
        DATABASE: 'mongodb'
    },
    ROUTES: {
        LOGIN: '/login',
        LOGOUT: '/logout',
        REGISTER: '/register',
    },
    VIEWS: {
        ERROR_404: 'errors/404',
        ERROR_500: 'errors/500',
        LOGIN: 'users/login',
        REGISTER: 'users/register'
    }
});