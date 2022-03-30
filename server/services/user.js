const User = require('../models/User');
const encryption = require('../utilities/encryption');
const { GLOBAL_ERRS } = require('../utilities/constants');
const { throwExpectedServiceError } = require('../utilities/error-handler');

async function addWebsite(userId, website) {
    const user = await User.findById(userId);

    user.websites.push(website);
    await user.save();
}

async function create(email, password) {
    const userExists = await getUserByEmail(email);

    if (userExists) {
        throwExpectedServiceError(GLOBAL_ERRS.EMAIL_EXISTS(email));
    }

    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, password);

    const user = new User({
        email,
        hashedPassword,
        salt
    });

    await user.save();
    return user;
}

async function getAll() {
    return await User.find({});
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
}

async function signup(email, password) {
    const user = await getUserByEmail(email);

    if (!user || !user.authenticate(password)) {
        throwExpectedServiceError(GLOBAL_ERRS.INVALID_USER_DATA);
    }

    return user;
}

module.exports = {
    addWebsite,
    create,
    getAll,
    getUserByEmail,
    signup
}