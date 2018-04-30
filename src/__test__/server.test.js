'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title', content: 'test content' };
const mockResource2 = { title: 'test title 2', content: 'test content 2' };
const mockBadResource = { title: '', content: '' };
let mockId = null;
// let mockId2 = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/tree', () => {
    it('should respond with status 201 and created a new tree', () => {
      return superagent.post(`:${testPort}/api/v1/tree`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
    it('should create a second tree', () => {
      return superagent.post(`:${testPort}/api/v1/tree`)
        .send(mockResource2)
        .then((res) => {
          // mockId2 = res.body.id;
          expect(res.body.title).toEqual(mockResource2.title);
          expect(res.body.content).toEqual(mockResource2.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/tree/id=UUID', () => {
    it('should respond with the a previously created tree', () => {
      return superagent.get(`:${testPort}/api/v1/tree?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
  
  describe('DELETE /api/v1/tree/id=UUID', () => {
    it('should delete the a previously created tree', () => {
      return superagent.delete(`:${testPort}/api/v1/tree?id=${mockId}`)
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
  });
  describe('GET ALL /api/v1/trees', () => {
    it('should respond with all the trees', () => {
      return superagent.get(`:${testPort}/api/v1/trees`)
        .then((res) => {
          expect(res.status).toEqual(200);
          // expect(res.body.content).toEqual(mockResource.content && mockResource2.content);
        });
    });
  });
});
// -----------------------------------------------------------
// INVALID RESPONSES
// -----------------------------------------------------------
describe('INVALID request to the API', () => {
  describe('POST /api/v1/tree', () => {
    it('should respond with bad request and status 400 if no request body or the body was invalid', () => {
      return superagent.post(`:${testPort}/api/v1/tree?`)
        .send(mockBadResource)
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });

  describe('INVALID GET ID NOT FOUND /api/v1/tree?id=1', () => {
    it('should respond with not found for valid requests with an id thats not found', () => {
      return superagent.get(`:${testPort}/api/v1/tree?id=1`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });
  describe('INVALID GET NO ID /api/v1/tree?id=', () => {
    it('should respond with bad request if no id is provided', () => {
      return superagent.get(`:${testPort}/api/v1/tree?id=`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
