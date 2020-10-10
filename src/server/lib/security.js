const crypto = require('crypto');

module.exports = {
    hashPassword: (password) => {
        let salt = crypto.randomBytes(16).toString('hex');

        return {
            salt,
            hash: crypto.pbkdf2Sync(password, salt, 128, 64, 'sha256')
                .toString('hex')
        }
    },
    verifyHash: ({salt, hash}, password) => {
        return hash === crypto.pbkdf2Sync(password, salt, 128, 64, 'sha256')
            .toString('hex');
    },
};