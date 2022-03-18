const router = require('express').Router();
const { isAuthenticated } = require('../middleware/auth');
const {ROUTES} = require('../utilities/constants');

router.get(ROUTES.ARTICLE_CREATE, isAuthenticated, (req, res) => {

});

module.exports = router;