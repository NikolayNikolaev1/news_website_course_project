const User = require('../models/User');

async function createAsync(email, hashedPassword) {
    const user = new User({
        email,
        hashedPassword
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