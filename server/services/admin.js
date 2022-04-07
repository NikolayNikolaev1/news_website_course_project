const Website = require('../models/Website');

async function changeWebsiteRestriction(website, restrict) {
    if (restrict) {
        website.isSuspended = true;
        await website.save();
        return;
    }

    website.isSuspended = false;
    await website.save();
}

module.exports = {
    changeWebsiteRestriction
};