'use strict';
//TODO USE BLUSE BIRD

const logger = require('./logger');
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
//const memory = {};

// memory = {
//   'Trees': {
//     '1234.567.89': {
//       'title': 'some title',
//       'content': 'some content',
//     }
//   }
// }

// schema is the type of resource, in this case tree, and it will just be a 'string' saying this is a tree schema
// item is an actual object we'll pass in to post a newly created tree
storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create a new item, schema required'));
  if (!item) return Promise.reject(new Error('Cannot create a new item, item required'));
  const json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Created a new resource');
      return item;
    })
    .catch(err => Promise.reject(err));
};

storage.fetchOne = function fetchOne(schema, id) {
  // takes in a schema(so what directory) and id(what item specifically)
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};

storage.fetchAll = function fetchAll(schema) {
  // first need to know how many items in storage then call for each item?
  // so for each item in memory
  // gather all promises in array, resolve then return
  //can this return an array of promises?
// so: return resolve(array);
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const idArray = Object.keys(memory[schema]);
    console.log(idArray);
    // const all = memory[schema];
    return resolve(idArray);
  // return undefined;
  });

};

storage.update = function update() {

};

storage.delete = function del(schema, id) {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('expected schema name'));
    if (!id) return reject(new Error('expected id'));
    if (!memory[schema]) return reject(new Error('schema not found'));
    const item = memory[schema][id];
    if (!item) {
      return reject(new Error('item not found'));
    } 
    delete memory[schema][id];
    return resolve('deleted');
    // return undefined;
  });
  

};