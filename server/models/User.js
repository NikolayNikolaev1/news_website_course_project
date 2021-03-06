const { Schema, model } = require('mongoose');
const encryption = require('../utilities/encryption');
const { DATA_ERRS, DATA_VALIDATIONS } = require('../utilities/constants');

const userSchema = new Schema({
    email: {
        type: String,
        required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE,
        unique: true,
        maxlength: [DATA_VALIDATIONS.EMAIL_MAX_LENGTH, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE],
        minlength: [DATA_VALIDATIONS.EMAIL_MIN_LENGTH, DATA_ERRS.EMAIL_LENGTH_VALIDATION_MESSAGE]
    },
    hashedPassword: { type: String, required: DATA_ERRS.REQUIRED_VALIDATION_MESSAGE },
    salt: String,
    roles: [String],
    websites: [{
        type: Schema.Types.ObjectId,
        ref: 'Website'
    }]
}, { timestamps: { createdAt: 'created_at' } });

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
                roles: ['admin']
            });
        }
    });
};

module.exports = User;
