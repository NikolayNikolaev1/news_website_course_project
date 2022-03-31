const User = require('../models/User');
const encryption = require('../utilities/encryption');
const { GLOBAL_ERRS } = require('../utilities/constants');
const { throwExpectedServiceError } = require('../utilities/error-handler');

async function addWebsite(userId, website) {
    const user = await User.findById(userId);

    user.websites.push(website);
    await user.save();
}

async function create(userModel) {
    const userExists = await getUserByEmail(userModel.email);

    if (userExists) {
        throwExpectedServiceError(GLOBAL_ERRS.EMAIL_EXISTS(userModel.email));
    }

    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, userModel.password);

    const user = new User({
        email: userModel.email,
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