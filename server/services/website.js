const Website = require('../models/Website');
const { GLOBAL_ERRS } = require('../utilities/constants');
const { throwExpectedServiceError } = require('../utilities/error-handler');
const { addWebsite } = require('./user');

async function create(name, domain, publisher) {
    const websiteExists = await this.getWebsiteByDomain(domain);

    if (websiteExists) {
        throwExpectedServiceError((GLOBAL_ERRS.WEBSITE_DOMAIN_EXISTS(domain)));
    }

    const website = new Website({
        name,
        domain,
        publisher
    });

    addWebsite(publisher, website);

    await website.save();
    return website;
}

// Return website for users that are publishers only.
async function getPublisherWebsiteByDomain(domain, publisher) {
    const website = await getWebsiteByDomain(domain);

    if (!website.publisher.equals(publisher)) {
        throw new Error('Current User not authorized to edit this website.');
    }

    return website;
}

async function getWebsiteByDomain(domain) {
    const website = await Website.findOne({ domain: domain });
    return website;
}

async function isUserWebsitePublisher(domain, userId) {
    const website = await getWebsiteByDomain(domain);

    if (website.publisher.equals(userId)) {
        return true;
    }

    return false;
}

async function update(originalDomain, name, domain, currentUser) {
    const website = await getWebsiteByDomain(originalDomain);

    if (!website.publisher.equals(currentUser)) {
        throw new Error('Current User not authorized to edit this website.');
    }

    website.name = name;
    website.id = id;

    await website.save();
    return website;
}

module.exports = {
    create,
    getPublisherWebsiteByDomain,
    getWebsiteByDomain,
    isUserWebsitePublisher,
    update
}