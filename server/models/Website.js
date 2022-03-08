const { Schema, model } = require('mongoose');
const { DATA } = require('../utilities/constants');

const websiteSchema = new Schema({
    id: {
        type: String,
        required: DATA.REQUIRED_VALIDATION_MESSAGE,
        unique: true,
        max: [DATA.VALIDATIONS.WEBSITE_ID_MAX_LENGTH, DATA.WEBSITE_ID_LENGTH_VALIDATION_MESSAGE],
        min: [DATA.VALIDATIONS.WEBSITE_ID_MIN_LENGTH, DATA.WEBSITE_ID_LENGTH_VALIDATION_MESSAGE]
    },
    name: {
        type: String,
        required: DATA.REQUIRED_VALIDATION_MESSAGE,
        max: [DATA.VALIDATIONS.WEBSITE_NAME_MAX_LENGTH, DATA.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE],
        min: [DATA.VALIDATIONS.WEBSITE_NAME_MIN_LENGTH, DATA.WEBSITE_NAME_LENGTH_VALIDATION_MESSAGE]
    },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Website = model('Website', websiteSchema);

module.exports = Website;