const Website = require('../models/Website');
const { GLOBAL_ERRS } = require('../utilities/constants');
const { throwExpectedServiceError } = require('../utilities/error-handler');
const { addWebsite } = require('./user');

async function create(websiteModel) {
    const websiteExists = await this.getWebsiteByDomain(websiteModel.domain);

    if (websiteExists) {
        throwExpectedServiceError((GLOBAL_ERRS.WEBSITE_DOMAIN_EXISTS(websiteModel.domain)));
    }

    const website = new Website({
        name: websiteModel.name,
        domain: websiteModel.domain,
        description: websiteModel.description,
        publisher: websiteModel.publisherId
    });

    addWebsite(websiteModel.publisherId, website);

    await website.save();
    return website;
}

async function deleteByDomain(domain) {
    const deletedCount = Website.deleteOne({ domain: domain });

    if (deletedCount !== 0) {
        throwExpectedServiceError((GLOBAL_ERRS.WEBSITE_NOT_EXISTS));
    }
}

async function getAll() {
    return await Website.find({});
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

async function updateByDomain(domain, websiteModel) {
    const websiteExists = await this.getWebsiteByDomain(websiteModel.domain);

    if (websiteExists) {
        throwExpectedServiceError((GLOBAL_ERRS.WEBSITE_DOMAIN_EXISTS(websiteModel.domain)));
    }

    const website = await getWebsiteByDomain(domain);
    website.name = websiteModel.name;
    website.domain = websiteModel.domain;
    website.description = websiteModel.description

    await website.save();
    return website;
}

module.exports = {
    create,
    deleteByDomain,
    getAll,
    getPublisherWebsiteByDomain,
    getWebsiteByDomain,
    isUserWebsitePublisher,
    updateByDomain
}