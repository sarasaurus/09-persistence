'use strict';
const logger = require('./logger');

const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

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
      logger.log(logger.ERROR, `${JSON.stringify(err)} in fetchOne storage`);
    });
};

// TODO: the 'files' I get back from storage.fetchall are just id's-- 
// some how I need to call fs.readfile on each one, in order to see their content... 
// ... but I can't figure it out right now

storage.fetchAll = function fetchAll(schema) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  return fs.readdirProm(`${__dirname}/../data/${schema}/`, 'utf8')
    .then((files) => {
      try {
        logger.log(logger.INFO, `FETCHALL in STORAGE, files are: ${files}`);
        // -------------------------------------------------------------------------------
        // attempt #1
        // -------------------------------------------------------------------------------
        // const infoArray = [];
        // for (let i = 0; i <= files.length; i++) {
        //   infoArray.push(fs.readFileAsync(files[i], '', 'utf8'));
        // }
        // return Promise.all(infoArray).then(wtf =>
        //   console.log('WTF is going on with FETCHALL', wtf));
        // -------------------------------------------------------------------------------
        // attempt #2
        // ---------------------------------------------------------------------------------
        // const infoArray = files.map(path => 
        //   fs.readFileProm(`${__dirname}/../data/${schema}/${path}`)
        //     .then((data) => {
        //       try {
        //         const item = JSON.parse(data.toString());
        //         return item;
        //       } catch (err) {
        //         return Promise.reject(err);
        //       }
        //     }));
        return files;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, `${JSON.stringify(err)} in fetchAll, storage`);
    });
};

storage.update = function update() {

};

storage.del = function del(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        logger.log(logger.INFO, `${item} deleted in storage.js`);
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, `${JSON.stringify(err)} delete in storage`);
    });
};
