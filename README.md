
# Persistence with a Vanilla RESTful API
**Author**: Sarah Bixler
**Version**: 1.0.1

## Overview
This application creates a simple RESTful API using bluebird to promisify node.js's asyncronous libraries.

## Requirements
node.js, npm
__developement dependancies include:__
* superagent - to parse url strings
* bluebird - to promisify async fs methods
* jest for testing 
* nodemon to run continuously updating local server
* babel for transpiling and 
* dotenv to manage environmental variables

## HOW TO USE
open two tabs in your CLI
in one type: npm run start
in the other for
* POST--  http POST :3000/api/v1/tree/ title=____ content=______
* GET-- http GET :3000/api/v1/tree/ title==____ content==______
* GET ALL-- http GET :3000/api/v1/trees 
* PUT-- <---- not in existance right now
* DELETE-- http DELETE :3000/api/v1/tree/ title==____ content==______

#### Feature Tasks
* this app builds on a previously completed vanilla REST API
- [x]refactor your routes to be contained in a separate module (ex: `route/resource-route.js`)
- [x] refactor your `res` messages & status codes to be contained in a separate module (ex: `response.js`)
- [x] refactor the `storage.js` module to use file system persistence
- [x] use the `fs` module to create and read the associated data files
- [x] the name of the file should contain the related resource id

## Architecture
This application uses JavaScript with ES6 syntax, node.js, npm, jest, superagent, body-parser, eslint with the airbnb settings and bluebird 

## Change Log
04-30-2018 -- light testing is all passing, but the GET ALL route still needs refactoring if it is to return an array of file data, rather tahn just paths