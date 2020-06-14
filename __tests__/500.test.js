'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

//500 err
describe('sever', () => {
 
  it('should respond with 500 Error ', () => {
    return mockRequest.post('/api/v1/categories')
      .send({})
      .then((data)=>{
        expect(data.status).toBe(500);
      }).catch(e => console.error(e));
  });
   

});