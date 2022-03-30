const Article = require('../models/Article');
const { getWebsiteByDomain } = require('./website');
const { throwExpectedServiceError } = require('../utilities/error-handler');
const {GLOBAL_ERRS} = require('../utilities/constants');

async function create(title, text, videoUrl, websiteDomain) {
    const website = getWebsiteByDomain(websiteDomain);

    if (!website) {
        return null;
    }

    const article = new Article({
        title,
        text,
        videoUrl,
        website: website._id
    });

    await article.save();

    await website.articles.push(article)
    await website.save();

    return article;
}

async function deleteById(id) {
    const deletedCount = await Article.deleteOne({ _id: id });

    if (deletedCount !== 0) {
        throwExpectedServiceError(GLOBAL_ERRS.ARTICLE_NOT_EXISTS);
    }
}

async function getAll() {
    return await Article.find({});
}

async function getArticleById(id) {
    const article = await Article.findById(id);

    return article;
}

async function update(id, title, text, videoUrl) {
    const article = await getArticleById(id);

    article.title = title;
    article.text = text;
    article.videoUrl = videoUrl;

    await article.save();
    return article;
}

module.exports = {
    create,
    deleteById,
    getAll,
    getArticleById,
    update
};