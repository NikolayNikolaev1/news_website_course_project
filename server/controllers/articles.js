const router = require('express').Router();
const { isPublisher, isAuthenticated } = require('../middleware/auth');
const { isWebsiteSuspended } = require('../middleware/restriction');
const { articleData, validate } = require('../middleware/validator');
const asyncHandler = require('../utilities/async-handler');
const { ROUTES, VIEWS, RES_ERR_TYPE } = require('../utilities/constants');
const { renderFormError, articleViewModel } = require('../utilities/view-handler');
const articleService = require('../services/article');
const { articleServiceModel } = require('../services/handler');

router.get(
    ROUTES.ARTICLE_CREATE,
    isAuthenticated,
    isPublisher(false),
    (req, res) => {
        res.render(VIEWS.ARTICLE_CREATE);
    });

router.post(
    ROUTES.ARTICLE_CREATE,
    isAuthenticated,
    isPublisher(false),
    articleData(),
    validate(VIEWS.ARTICLE_CREATE),
    asyncHandler(async (req, res, next) => {
        let articleModel = articleServiceModel(req.body);
        const domain = req.params.domain;
        articleModel.websiteDomain = domain;

        await articleService
            .create(articleModel)
            .then(article => res.redirect(`/${domain}/article/${article._id}`))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        websiteModel,
                        VIEWS.ARTICLE_CREATE,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.post(
    ROUTES.ARTICLE_DELETE,
    isAuthenticated,
    isPublisher(false),
    asyncHandler(async (req, res, next) => {
        const domain = req.params.domain;
        const articleId = req.params.id;

        await articleService
            .deleteById(articleId)
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });

        res.redirect(`/${domain}/home`)
    }));

router.get(
    ROUTES.ARTICLE_EDIT,
    isAuthenticated,
    isPublisher(false),
    asyncHandler(async (req, res, next) => {
        const articleId = req.params.id;

        await articleService
            .getArticleById(articleId)
            .then(article => res.render(VIEWS.ARTICLE_EDIT, { model: article }))
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE
                next(error);
            });
    }));

router.post(
    ROUTES.ARTICLE_EDIT,
    isAuthenticated,
    isPublisher(false),
    articleData(),
    validate(VIEWS.ARTICLE_EDIT),
    asyncHandler(async (req, res, next) => {
        const articleId = req.params.id;
        const domain = req.params.domain;
        let articleModel = articleServiceModel(req.body);

        await articleService
            .update(articleId, articleModel)
            .then(article => res.redirect(`/${domain}/article/${article._id}`))
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.get(
    ROUTES.ARTICLE_INDEX,
    isPublisher(true),
    isWebsiteSuspended,
    asyncHandler(async (req, res, next) => {
        const articleId = req.params.id;

        await articleService
            .getArticleById(articleId)
            .then(article => {
                let articleModel = articleViewModel(article);
                res.render(VIEWS.ARTICLE_INDEX, { article: articleModel });
            })
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        websiteModel,
                        VIEWS.ARTICLE_CREATE,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

module.exports = router;