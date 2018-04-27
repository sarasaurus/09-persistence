'use strict';

const logger = require('../lib/logger');
const tree = require('../model/tree');
const storage = require('../lib/storage');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routetree(router) {
  router.post('/api/v1/tree', (req, res) => {
    logger.log(logger.INFO, 'TREE-ROUTE: POST /api/v1/tree');

    try {
      const newtree = new tree(req.body.title, req.body.content);
      storage.create('tree', newtree)
        .then((tree) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(tree));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `TREE-ROUTE: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/tree', (req, res) => {
   
    if (!req.url.query.id) {
      logger.log(logger.INFO, '<----TREE-ROUTE: GET /api/v1/tree');
      console.log('GET ROUTE req stringified IS: ', req.url.query);
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
      // storage.fetchAll('tree')
      //   .then((idArray) => {
      //     // this seems to be working in CLI
      //     console.log('id Array in router is: ', idArray);
      //     res.writeHead(200, { 'Content-Type': 'application/json' });
      //     res.write(JSON.stringify(idArray));
      //     res.end();
      //     return undefined;
      //   })
      //   .catch((err) => {
      //     logger.log(logger.ERROR, err, JSON.stringify(err));
      //     res.writeHead(404, { 'Content-Type': 'text/plain' });
      //     res.write('Resource not found');
      //     res.end();
      //     return undefined;
      //   });
    }
    storage.fetchOne('tree', req.url.query.id)
      .then((item) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });

    return undefined;
  });// get one closing brackket

  router.get('/api/v1/trees', (req, res) => {

    storage.fetchAll('tree')
      .then((idArray) => {
        // this seems to be working in CLI
        console.log('id Array in router is: ', idArray);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(idArray));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
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
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('Your request requires an id');
      res.end();
      return undefined;
    }
    storage.del('tree', req.url.query.id)
      .then((item) => {
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.write(item);
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });

    return undefined;
  });
};

// compare these routes to storage!