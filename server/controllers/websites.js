const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const { isAuthenticated, isPublisher } = require('../middleware/auth');
const { renderFormError } = require('../utilities/view-handler');
const { websiteData, validate } = require('../middleware/validator');
const websiteService = require('../services/website');

router.get(ROUTES.WEBSITE_CREATE, isAuthenticated, (req, res) => {
    res.render(VIEWS.WEBSITE_CREATE);
});

router.post(
    ROUTES.WEBSITE_CREATE,
    isAuthenticated,
    websiteData(),
    validate(VIEWS.WEBSITE_CREATE),
    asyncHandler(async (req, res, next) => {
        let websiteModel = req.body;
        websiteModel.publisherId = req.user.id;

        await websiteService
            .create(websiteModel.name, websiteModel.domain, websiteModel.publisherId)
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

router.get(
    ROUTES.WEBSITE_EDIT,
    isAuthenticated,
    isPublisher,
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
    isPublisher,
    websiteData(),
    validate(VIEWS.WEBSITE_EDIT),
    asyncHandler(async (req, res, next) => {
        const websiteDomain = req.params.domain;
        const currentUserId = req.user._id;
        let website = req.body;

        await websiteService
            .update(websiteDomain, website.name, website.domain, currentUserId)
            .then(website => res.render(VIEWS.WEBSITE_EDIT, { model: website }))
            .catch(error => {
                error.type = RES_ERR_TYPE.DATABASE;
                next(error);
            });
    }));

module.exports = router;