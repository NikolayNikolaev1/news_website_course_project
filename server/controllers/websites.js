const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { GLOBAL_ERRS, RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const { isAuthenticated } = require('../middleware/auth');
const { renderViewWithError } = require('../utilities/view-handler');
const { websiteCreate } = require('../middleware/validators');
const websiteService = require('../services/website');

router.get(ROUTES.WEBSITE_CREATE, isAuthenticated, (req, res) => {
    res.render(VIEWS.WEBSITE_CREATE, { route: ROUTES.WEBSITE_CREATE });
});

router.post(ROUTES.WEBSITE_CREATE, isAuthenticated, websiteCreate, asyncHandler(async (req, res, next) => {
    let websiteModel = req.body;
    websiteModel.publisherId = req.user.id;

    await websiteService
        .createAsync(websiteModel.name, websiteModel.id, websiteModel.publisherId)
        .then(website => {
            if (!website) {
                return renderViewWithError(
                    res,
                    websiteModel,
                    ROUTES.WEBSITE_CREATE,
                    VIEWS.WEBSITE_CREATE,
                    GLOBAL_ERRS.WEBSITE_ID_EXISTS);
            }

            // res.locals.globalMessage = 'Created Website Successfully!';
            res.redirect('/');
        })
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });
}));

module.exports = router;