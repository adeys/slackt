const path = require('path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');
const renderIndex = require('./lib/renderer');
const jwtAuth = require('./lib/jwt-auth');

const STATIC_OPTIONS = {
   maxAge: 31536000000 // One year
};

const app = express();

// Middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(helmet());
app.use(bodyParser.json());

// Static files handlers
app.use('/assets/fonts', express.static(path.resolve(__dirname, '../../public/fonts'), STATIC_OPTIONS));
app.use('/assets', express.static(path.resolve(__dirname, '../../public/build'), STATIC_OPTIONS));

// Route handlers
app.use('/api/v1', jwtAuth, apiRouter);
app.use('*', renderIndex);

// Configure socket connection
const io = require('../shared/pocket-io/server')(app);

io.on('connection', (client) => {
   console.log('A new client has joined');

   client.on('new.message', data => {
      client.broadcast.emit('new.message', data);
      client.emit('message.sent');
   });
});

app.listen(3000, () => console.log('Server running on port 3000'));