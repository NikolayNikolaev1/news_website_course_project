const router = require('express').Router();
const { isPublisher } = require('../middleware/auth');
const { articleData, validate } = require('../middleware/validator');
const asyncHandler = require('../utilities/async-handler');
const { ROUTES, VIEWS, RES_ERR_TYPE } = require('../utilities/constants');
const { renderFormError } = require('../utilities/view-handler');
const articleService = require('../services/article');
const { articleServiceModel } = require('../services/handler');

router.get(ROUTES.ARTICLE_CREATE, isPublisher, (req, res) => {
    res.render(VIEWS.ARTICLE_CREATE);
});

router.post(
    ROUTES.ARTICLE_CREATE,
    isPublisher,
    articleData(),
    validate(VIEWS.ARTICLE_CREATE),
    asyncHandler(async (req, res, next) => {
        let articleModel = articleServiceModel(req.body);
        articleModel.websiteDomain = req.params.domain;

        await articleService
            .create(articleModel)
            .then(article => res.redirect(ROUTES.ARTICLE_DETAILS(articleModel.domain, article._id)))
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
    isPublisher,
    asyncHandler(async (req, res, next) => {
        const articleId = req.params.id;

        await articleService
            .deleteById(articleId)
            .then(res.redirect('/'))
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
            })
    }));

router.get(
    ROUTES.ARTICLE_EDIT,
    isPublisher,
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
    isPublisher,
    articleData(),
    validate(VIEWS.ARTICLE_EDIT),
    asyncHandler(async (req, res, next) => {
        const articleId = req.params.id;
        let articleModel = articleServiceModel(req.body);

        await articleService
            .update(articleId, articleModel)
            .then(article => res.render(VIEWS.ARTICLE_EDIT, { model: article }))
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

module.exports = router;