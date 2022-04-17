const { Schema, model } = require('mongoose');
const { DATA_ERRS, DATA_VALIDATIONS } = require('../utilities/constants');

const websiteSchema = new Schema({
    domain: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        unique: true,
        maxlength: [DATA_VALIDATIONS.WEBSITE_DOMAIN_MAX_LENGTH, DATA_ERRS.WEBSITE_DOMAIN_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.WEBSITE_DOMAIN_MIN_LENGTH, DATA_ERRS.WEBSITE_DOMAIN_LENGTH_VALIDATION_MESSAGE]
    },
    name: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        maxlength: [DATA_VALIDATIONS.WEBSITE_NAME_MAX_LENGTH, DATA_ERRS.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.WEBSITE_NAME_MIN_LENGTH, DATA_ERRS.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE]
    },
    description: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        maxlength: [DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MAX_LENGTH, DATA_ERRS.WEBSITE_DOMAIN_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.WEBSITE_DESCRIPTION_MIN_LENGTH, DATA_ERRS.WEBSITE_DESCRIPTION_LENGTH_VALIDATION_MESSAGE]
    },
    isSuspended: {
        type: Boolean,
        require: true
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
}, { timestamps: { createdAt: 'created_at' } });

const Website = model('Website', websiteSchema);

module.exports = Website;