![cf](https://i.imgur.com/7v5ASc8.png) Lab 09: Vanilla REST API w/ Persistence
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will learn how to save resource data to the file system for a layer of data persistence
* students will learn how to refactor commonly used coding constructs into custom helper modules

## Requirements

## HOW TO USE
open two tabs in your CLI
in one type: npm run start
in the other for
* POST--  http POST :3000/api/v1/tree/ title=____ content=______
* GET-- http GET :3000/api/v1/tree/ title==____ content==______
* GET ALL-- http GET :3000/api/v1/trees <--- need to refactor?
* PUT-- <---- not in existance right now
* DELETE-- http DELETE :3000/api/v1/tree/ title==____ content==______


#### Configuration
* Reference the file structure of [this template](https://github.com/codefellows/seattle-javascript-401d23/tree/master/back-end/00-empty-template) for the configuration files you need and folder structure
* `README.md`
  * your `README.md` should include detailed instructions on how to use your API
  * this should include documentation on how to access your API endpoints

#### Feature Tasks
* continue working on your vanilla REST API
* refactor your routes to be contained in a separate module (ex: `route/resource-route.js`)
* refactor your `res` messages & status codes to be contained in a separate module (ex: `response.js`)
* refactor the `storage.js` module to use file system persistence
  * use the `fs` module to create and read the associated data files
  * the name of the file should contain the related resource id
