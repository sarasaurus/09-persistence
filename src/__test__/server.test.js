'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title AFTER PERSIST', content: 'test content AFTER PERSIST' };
const mockResource2 = { title: 'test title 2', content: 'test content 2' };
const mockBadResource = { title: '', content: '' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

// In this lab, you MUST post first BEFORE you get
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
  });

  describe('GET /api/v1/tree/id=UUID', () => {
    it('should respond with the a previously created tree', () => {
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
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
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
      return superagent.delete(`:${testPort}/api/v1/tree?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual('');
          expect(res.status).toEqual(204);
        });
    });
  });
  describe('GET ALL /api/v1/trees', () => {
    it('should respond with all the trees', () => {
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
      // this is not working
      superagent.post(`:${testPort}/api/v1/tree`)
        .send(mockResource)
        .send(mockResource2);
      return superagent.get(`:${testPort}/api/v1/tree`)
        .then((res) => {
          //console.log('all tree test: ', mockResource.content, mockResource2.content);
          expect(res.body.content).toContain(mockResource.content && mockResource2.content);
          expect(res.status).toEqual(200);
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
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
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
      // console.log(mockId, 'MOCK ID IN GET BLOCK')
      return superagent.get(`:${testPort}/api/v1/tree?id=`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
