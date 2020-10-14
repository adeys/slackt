const jwt = require('jsonwebtoken');

const status = require('../helpers/http-statuses');
const jwtConfig = require('../settings').jwt;

const sendUnauthorizedResponse = (res) => {
    res.status(status.HTTP_UNAUTHORIZED)
        .json({
            code: status.HTTP_UNAUTHORIZED,
            message: 'Unauthorized'
        });
};

module.exports = (req, res, next) => {
    if (!req.headers['Authorization']) {
        return sendUnauthorizedResponse(res);
    }

    let token = req.headers['Authorization'].split(' ', 2)[1];

    if (jwt.verify(token, jwtConfig.secret, jwtConfig.options)) {
        return next();
    }

    return sendUnauthorizedResponse(res);
};