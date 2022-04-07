const router = require('express').Router();
const { isInRole } = require('../middleware/auth')
const asyncHandler = require('../utilities/async-handler');
const { RES_ERR_TYPE, ROUTES, VIEWS } = require('../utilities/constants');
const adminService = require('../services/admin');
const { getWebsiteByDomain } = require('../services/website');

router.get(ROUTES.ADMIN_INDEX, isInRole('admin'), (req, res) => {
    res.render(VIEWS.ADMIN_INDEX);
});

router.post(
    ROUTES.ADMIN_WEBSITE_SUSPEND,
    isInRole('admin'),
    asyncHandler(async (req, res, next) => {
        await websiteRestritcion(req, res, next, true);
    }));

router.post(
    ROUTES.ADMIN_WEBSITE_UNSUSPEND,
    isInRole('admin'),
    asyncHandler(async (req, res, next) => {
        await websiteRestritcion(req, res, next, false);
    }));

module.exports = router;

// Restrict/unrestrict website based on restriction boolean.
async function websiteRestritcion(req, res, next, restriction) {
    const websiteDomain = req.params.domain;

    const website = await getWebsiteByDomain(websiteDomain)
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });

    await adminService
        .changeWebsiteRestriction(website, restriction)
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE;
            next(error);
        });

    res.redirect('back');
}