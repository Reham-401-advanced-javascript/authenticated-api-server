'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('sever', () => {

  // timestamp test 
  it('should respond a timeStamp ', () => {
    return mockRequest.get('/timeStamp').then(results => {
      expect(results.headers.date).toBeDefined();
    });
  });
});   