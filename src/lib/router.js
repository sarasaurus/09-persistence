'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const urlParser = require('./url-parser');
const response = require('../lib/response');

const Router = module.exports = function router() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function get(endpoint, callback) {
  // debug(`Router: GET ${endpoint} mounted`)
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function post(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function put(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function del(endpoint, callback) {
  // console.log(`Router: DELETE ${endpoint} mounted`)
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function route() {
  return (req, res) => {
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
      .then(() => {
        // req.method is checking for a string equal to the properties defined under this.routes
        // req.url.pathname ==api/v1/tree
        // req, res == query string after 

        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        } 
        // now go to storage
        response.sendText(res, 404, 'Route Not Found FROM ROUTER');
      })
      .catch((err) => {
        if (err instanceof SyntaxError) {
          response.sendText(res, 404, 'Syntax Error from Router');
        }
        logger.log(logger.ERROR, `${JSON.stringify(err)} in router syntax error catch block`);
        response.sendText(res, 404, 'Final Error catch from Router');
      });
  };
};
