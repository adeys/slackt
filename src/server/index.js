const path = require('path');
const express = require('express');
const helmet = require('helmet');
const logger = require('./lib/logger');
const apiRouter = require('./routes/api');

const STATIC_OPTIONS = {
   maxAge: 31536000000 // One year
};

const app = express();

app.use(logger.logRequest);
app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../../pubic'), STATIC_OPTIONS));

app.use('/api/v1', apiRouter);

app.use(logger.sendResponse);

app.listen(3000, () => console.log('Server running on port 3000'));