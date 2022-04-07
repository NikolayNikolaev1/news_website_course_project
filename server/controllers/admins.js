const router = require('express').Router();
const { ROUTES, VIEWS } = require('../utilities/constants');
const { isInRole } = require('../middleware/auth')

router.get(ROUTES.ADMIN_INDEX, isInRole('admin'), (req, res) => {
    res.render(VIEWS.ADMIN_INDEX);
});

module.exports = router;