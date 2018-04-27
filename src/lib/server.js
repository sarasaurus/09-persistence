'use strict';

const http = require('http');

// Router setup (do this first)
const Router = require('./router');

const router = new Router();
require('../routes/tree-route')(router);
// const logger = require('./logger');

// Application setup
// anonymous function gets abstracted away
const app = http.createServer(router.route());

// Server controls
const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);