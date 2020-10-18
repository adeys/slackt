const moduleAlias = require('module-alias');
moduleAlias.addAliases({
   'react': 'preact/compat',
   'react-dom': 'preact/compat'
});

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const WebSocketServer = require('../shared/ws/server');

const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const renderIndex = require('./lib/renderer');
const jwtAuth = require('./lib/jwt-auth');
const chatManager = require('./lib/chat');

const STATIC_OPTIONS = {
   maxAge: 31536000000 // One year
};

const app = express();

// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
app.use(bodyParser.json());

// Static files handlers
app.use('/assets/fonts', express.static(path.resolve(__dirname, '../../public/fonts'), STATIC_OPTIONS));
app.use('/assets', express.static(path.resolve(__dirname, '../../public/build'), STATIC_OPTIONS));

// Route handlers
app.use('/auth', authRouter);
app.use('/api/v1', jwtAuth, apiRouter);
app.use('*', renderIndex);

const server = app.listen(3000, () => console.log('Server running on port 3000'));

// Configure socket connection
const wss = new WebSocketServer(server);

// Bootstrap chat manager
chatManager.bootstrap(wss);

wss.listen(() => console.log('Web Socket server started'));
