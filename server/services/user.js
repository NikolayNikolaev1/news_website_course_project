const User = require('../models/User');

async function createAsync(email, hashedPassword, salt) {
    const user = new User({
        email,
        hashedPassword,
        salt
    });

    await user.save();

    return user;
}

async function getUserByEmailAsync(email) {
    const user = await User.findOne({ email: email });
    return user;
}

module.exports = {
    createAsync,
    getUserByEmailAsync
}