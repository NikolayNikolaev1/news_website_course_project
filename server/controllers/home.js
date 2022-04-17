const router = require('express').Router();
const asyncHandler = require('../utilities/async-handler');
const { ROUTES, VIEWS, RES_ERR_TYPE } = require('../utilities/constants');
const { homeViewModel } = require('../utilities/view-handler');
const { getAll } = require('../services/website');

router.get(ROUTES.HOME_ABOUT, (req, res) => {
    res.render(VIEWS.HOME_ABOUT);
});

router.get(ROUTES.HOME_INDEX, asyncHandler(async (req, res, next) => {
    const websites = await getAll()
        .catch(error => {
            error.type = RES_ERR_TYPE.DATABASE
            next(error);
        });

    res.render(VIEWS.HOME, { websites: homeViewModel(websites) });
}));

module.exports = router;