const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const { isAuthenticated, isPublisher } = require('../middleware/auth');
const { isWebsiteSuspended } = require('../middleware/restriction');
const { renderFormError, websiteArticlesViewModel, websiteHomeViewModel } = require('../utilities/view-handler');
const { websiteData, validate } = require('../middleware/validator');
const websiteService = require('../services/website');
const { websiteServiceModel } = require('../services/handler');
const { getAllByWebsiteId } = require('../services/article');
const { getUserById } = require('../services/user');

router.get(ROUTES.WEBSITE_CREATE, isAuthenticated, (req, res) => {
    res.render(VIEWS.WEBSITE_CREATE);
});

router.post(
    ROUTES.WEBSITE_CREATE,
    isAuthenticated,
    websiteData(),
    validate(VIEWS.WEBSITE_CREATE),
    asyncHandler(async (req, res, next) => {
        let websiteModel = websiteServiceModel(req.body);
        websiteModel.publisherId = req.user.id;

        await websiteService
            .create(websiteModel)
            .then(website => res.redirect(`/website/${website.domain}`))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        websiteModel,
                        VIEWS.WEBSITE_CREATE,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.post(
    ROUTES.WEBSITE_DELETE,
    isAuthenticated,
    isPublisher(false),
    asyncHandler(async (req, res, next) => {
        const websiteDomain = req.params.domain;

        await websiteService
            .deleteByDomain(websiteDomain)
            .then(res.redirect('/'))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        websiteModel,
                        VIEWS.WEBSITE_CREATE,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.get(
    ROUTES.WEBSITE_EDIT,
    isAuthenticated,
    isPublisher(false),
    asyncHandler(async (req, res, next) => {
        const websiteDomain = req.params.domain;

        await websiteService
            .getWebsiteByDomain(websiteDomain)
            .then(website => res.render(VIEWS.WEBSITE_EDIT, { model: website }))
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.post(
    ROUTES.WEBSITE_EDIT,
    isAuthenticated,
    isPublisher(false),
    websiteData(),
    validate(VIEWS.WEBSITE_EDIT),
    asyncHandler(async (req, res, next) => {
        const domain = req.params.domain;
        let websiteModel = websiteServiceModel(req.body);

        await websiteService
            .updateByDomain(domain, websiteModel)
            .then(website => res.render(VIEWS.WEBSITE_EDIT, { model: website }))
            .catch(error => {
                if (error.isExpected) {
                    return renderFormError(
                        res,
                        websiteModel,
                        VIEWS.WEBSITE_CREATE,
                        error.message);
                }

                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

router.get(
    ROUTES.WEBSITE_INDEX,
    isPublisher(true),
    isWebsiteSuspended,
    asyncHandler(async (req, res, next) => {
        const domain = req.params.domain;

        const website = await websiteService
            .getWebsiteByDomain(domain)
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });

        website.publisher = await getUserById(website.publisher)
        const websiteModel = websiteHomeViewModel(website);
        await getAllByWebsiteId(website._id)
            .then(articles => {
                let articleModels = websiteArticlesViewModel(articles);
                websiteModel.articles = articleModels;
            })
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });


        res.render(VIEWS.WEBSITE_INDEX, { website: websiteModel })
    }));

module.exports = router;