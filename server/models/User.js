const { Schema, model } = require('mongoose');
const encryption = require('../utilities/encryption');
const { DATA } = require('../utilities/constants');

const userSchema = new Schema({
    email: {
        type: String,
        required: DATA.REQUIRED_VALIDATION_MESSAGE,
        unique: true,
        max: [DATA.VALIDATIONS.EMAIL_MAX_LENGTH, DATA.EMAIL_LENGTH_VALIDATION_MESSAGE],
        min: [DATA.VALIDATIONS.EMAIL_MIN_LENGTH, DATA.EMAIL_LENGTH_VALIDATION_MESSAGE]
    },
    hashedPassword: { type: String, required: DATA.REQUIRED_VALIDATION_MESSAGE },
    salt: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPassword;
    }
});

const User = model('User', userSchema);

User.seedAdminUser = (adminEmail, adminPassword) => {
    User.find({}).then(users => {
        if (users.length === 0) {
            let salt = encryption.generateSalt();
            let hashedPass = encryption.generateHashedPassword(salt, adminPassword);

            User.create({
                email: adminEmail,
                hashedPassword: hashedPass,
                salt: salt,
            });
        }
    });
};

module.exports = User;
