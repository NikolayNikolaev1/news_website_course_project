const { Schema, model } = require('mongoose');
const { DATA_ERRS, DATA_VALIDATIONS } = require('../utilities/constants');

const articleSchema = new Schema({
    title: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        maxlength: [DATA_VALIDATIONS.ARTICLE_TITLE_MAX_LENGTH, DATA_ERRS.ARTICLE_TITLE_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.ARTICLE_TITLE_MIN_LENGTH, DATA_ERRS.ARTICLE_TITLE_LENGTH_VALIDATION_MESSAGE]
    },
    text: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        maxlength: [DATA_VALIDATIONS.ARTICLE_TEXT_MAX_LENGTH, DATA_ERRS.ARTICLE_TEXT_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.ARTICLE_TEXT_MIN_LENGTH, DATA_ERRS.ARTICLE_TEXT_LENGTH_VALIDATION_MESSAGE]
    },
    imageName: {
        type: String,
        default: 'default.png'
    },
    videoUrl: {
        type: String,
    },
    website: {
        type: Schema.Types.ObjectId,
        ref: 'Website',
        required: true
    },
}, { timestamps: { createdAt: 'created_at' } });

const Article = model('Article', articleSchema);

module.exports = Article;