const Website = require('../models/Website');

async function createAsync(name, id, publisher) {
    const websiteExists = await getWebsiteByIdAsync(id);

    if (websiteExists) {
        return null;
    }

    const website = new Website({
        name,
        id,
        publisher
    });

    await website.save();
    return website;
}

async function getWebsiteByIdAsync(id) {
    const website = await Website.findOne({ id: id });
    return website;
}

module.exports = {
    createAsync
}