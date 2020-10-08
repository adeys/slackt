const winston = require('winston');
const LOGS_FILE = 'logs/server.log';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'info',
            handleExceptions: true,
            format: winston.format.json(),
            filename: LOGS_FILE
        })
    ]
});

const getResponse = message => ({
    error: true,
    message
});

const logUnauthorizedRequests = req => {
    logger.error(`[${new Date().toUTCString()}] Unauthorized : ${req.originalUrl}`);
};

const logRequest = (req, res, next) => {
    res.on('finish', () => {
        logger.debug(`[${new Date().toUTCString()}] : ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
};

const sendResponse = (err, req, res, next) => {
    if (err && err.name === 'UnauthorizedError') {
        logUnauthorizedRequests(req);
        res.status(401).send(getResponse(err.message));
    } else if (err) {
        logger.error(err.stack);
        res.status(500).send(getResponse(err.message));
    } else {
        next();
    }
};

module.exports = {
    log: logger,
    logRequest,
    sendResponse
};
