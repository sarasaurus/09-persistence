'use strict';

const logger = require('../lib/logger');
const Tree = require('../model/tree');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routetree(router) {


  router.post('/api/v1/tree', (req, res) => {
    logger.log(logger.INFO, 'TREE-ROUTE: POST /api/v1/tree');

    try {
      const newTree = new Tree(req.body.title, req.body.content);
      storage.create('tree', newTree)
        .then((tree) => {
          response.sendJSON(res, 201, tree);
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `TREE-ROUTE: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);
      return undefined;
    }
    return undefined;
  });// post closing

  router.get('/api/v1/tree', (req, res) => {
    if (!req.url.query.id) {
      logger.log(logger.INFO, '<----TREE-ROUTE: no id GET /api/v1/tree');
      console.log('GET ROUTE no id req IS: ', req.body);
      response.sendText(res, 404, 'Your response requires an id');
      return undefined;
    }
    storage.fetchOne('tree', req.url.query.id)
      .then((item) => {
        console.log('GET ROUTE no id req stringified IS: ', item);
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Fetch One: Resource not Found!');
        return undefined;
      });
    return undefined;
  });// get one closing brackket

  router.get('/api/v1/trees', (req, res) => {

    storage.fetchAll('tree')
      .then((idArray) => {
        // this seems to be working in CLI
        console.log('id Array in router is: ', idArray);
        idArray.forEeach(item => response.sendJSON(res, 200, item));
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Fetch All: Resource not Found!');
        return undefined;
      });
  });
  // closing get all route

  // router.get('/api/v1/tree', (req, res) => {
  //   storage.fetchAll('tree')
  //     .then((all) => {// .then do something on the return, return an array or one?
  //       res.writeHead(200, { 'Content-Type': 'application/json' });
  //       res.write(JSON.stringify(item));
  //       res.end();
  //       return undefined;
  //     })
  //     .catch((err) => {
  //       logger.log(logger.ERROR, err, JSON.stringify(err));
  //       res.writeHead(404, { 'Content-Type': 'text/plain' });
  //       res.write('Resource not found');
  //       res.end();
  //       return undefined;
  //     });
  //   return undefined;
  // });
  router.delete('/api/v1/tree', (req, res) => {
   
    if (!req.url.query.id) {
      logger.log(logger.INFO, '<----TREE-ROUTE: GET /api/v1/tree');
      console.log('GET ROUTE req stringified IS: ', req.url.query);
      response.sendText(res, 400, 'Delete: Valid Request Needed!');
      return undefined;
    }
    storage.del('tree', req.url.query.id)
      .then((item) => {
        response.sendJSON(res, 200, item);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        response.sendText(res, 404, 'Delete: Resource not Found!');
        return undefined;
      });

    return undefined;
  });
};

// compare these routes to storage!