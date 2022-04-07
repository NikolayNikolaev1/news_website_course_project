const asyncHandler = require('../utilities/async-handler');
const { getWebsiteByDomain } = require('../services/website');

module.exports = {
    isWebsiteSuspended: asyncHandler(async (req, res, next) => {
        const websiteDomain = req.params.domain;

        await getWebsiteByDomain(websiteDomain)
            .then(website => {
                res.locals.websiteRestriction = website.isSuspended;

                if (website.isSuspended) {
                    // res.redirect(`/${websiteDomain}/suspended`);
                    res.render('errors/suspended')
                    return;
                }

                next();
            })
            .catch(error => {
                error.type = "mongodb";
                next(error);
            });
    }),
}