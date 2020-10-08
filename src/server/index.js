const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const helmet = require('helmet');
const logger = require('./lib/logger');

const app = express();

app.use(logger.logRequest);
app.use(helmet());
app.use(serveStatic(path.resolve(__dirname, '../../pubic')));

app.use('/', (req, res) => {
   res.json({message: 'Welcome to Slackt', code: 200});
});

app.use(logger.sendResponse);

app.listen(3000, () => console.log('Server running on port 3000'));