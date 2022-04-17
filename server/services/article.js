const Article = require('../models/Article');
const { getWebsiteByDomain } = require('./website');
const { throwExpectedServiceError } = require('../utilities/error-handler');
const { GLOBAL_ERRS } = require('../utilities/constants');

async function create(articleModel) {
    const website = await getWebsiteByDomain(articleModel.websiteDomain);

    if (!website) {
        return null;
    }

    const date = new Date();

    const article = new Article({
        title: articleModel.title,
        text: articleModel.text,
        videoUrl: articleModel.videoUrl,
        website: website._id
    });

    await article.save();

    await website.articles.push(article)
    await website.save();

    return article;
}

async function deleteById(id) {
    const deletedCount = await Article.deleteOne({ _id: id });

    // if (deletedCount !== 0) {
    //     throwExpectedServiceError(GLOBAL_ERRS.ARTICLE_NOT_EXISTS);
    // }
}

async function getAll() {
    return await Article.find({});
}

async function getAllByWebsiteId(websiteId) {
    return await Article.find({ website: websiteId });
}

async function getArticleById(id) {
    const article = await Article.findById(id);

    return article;
}

async function update(id, articleModel) {
    const article = await getArticleById(id);

    article.title = articleModel.title;
    article.text = articleModel.text;
    article.videoUrl = articleModel.videoUrl;

    await article.save();
    return article;
}

module.exports = {
    create,
    deleteById,
    getAll,
    getAllByWebsiteId,
    getArticleById,
    update
};