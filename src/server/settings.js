module.exports = {
    jwt: {
        secret: 'sHaReD-sEcReT-kEy',
        options: {
            expiresIn: '7d',
            // notBefore: '15s',
            audience: 'http://localhost:3000/api/v1',
            issuer: 'http://localhost:3000',
        }
    }
};