'use strict';

const response = module.exports= {};

response.sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));// res.write ONLY TAKES STRING OR BUFFER
  res.end();
  return undefined;
};

response.sendText = (res, status, msg) => {
  // error messages
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.write(msg);
  res.end();
  return undefined;
}
