'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);


// 200 
describe('sever', () => {

  it('should respond with 200 on /api/v1/categories', () => {///////////////////////
    return mockRequest.get('/api/v1/categories').then((results) => {
      expect(results.status).toBe(200);
    });
    
  });

  //-----------------------------------------------------------------------------------
  // products rout 
  //-----------------------------------------------------------------------------------

  it('should respond to a get request to /api/v1/products', () => {///////////////////////////
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        // console.log('aaaaaaaaaa data from post',data.body);
        
        return mockRequest.get('/api/v1/products').then(results => {
          
          Object.keys(obj).forEach((key) => {
            expect(results.body.results[0][key]).toEqual(obj[key]);
          });
          // console.log('dddddddd',results.body.results[0]);
          // expect(results.status).toBe(200);
        });
      });
  });

  
  it('should respond to a get request to /api/v1/products/id', () => {/////////////////////
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        // console.log('cccccccccccccccc',data.body);
       
        return mockRequest.get(`/api/v1/products/${data.body._id}`).then(results => {
          // console.log('ccccccccccccccccvvvvvvvvvv',results.body);
          
          Object.keys(obj).forEach((key) => {
            expect(results.body[0][key]).toEqual(obj[key]);
          });
          
        });
      });
    
  });


  it('should respond to a post request to /api/v1/products', () => {////////////////////////
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(results => {
        // console.log('result ',results.body);
        Object.keys(obj).forEach((key) => {
          expect(results.body[key]).toEqual(obj[key]);
        });
      });
  });

  it('should respond to a put request to /api/v1/products/id', () => {////////////////////////////
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
        let updateObj = { category: 'accessories', name: 'qusai', display_name: 'lab-07', description: 'cover this wide headband' };
        // console.log('xxxxxxxxxxxxxxxxxxxxxx post',data.body);
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send(updateObj )
          .then(results => {
          
            Object.keys(updateObj).forEach((key) => {
              expect(results.body[key]).toEqual(updateObj[key]);
            });
          });
      });
  });

  it('should respond to a delete request to /api/v1/products/id', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return mockRequest.post('/api/v1/products')
      .send(obj)
      .then(data => {
      // console.log('aaaaaaaaaa data from post',data.body);

        return mockRequest.delete(`/api/v1/products/${data.body._id}`)
          .send(obj)
          .then((getdata) => {

            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(results => {
              // console.log('aaaaaaaaaa data from geeeeeeeeeeet',results.body);
                expect(results.body[0]).toBe();
              });
          });
      });
      
  });

  //-----------------------------------------------------------------------------------
  // categories routs 
  //-----------------------------------------------------------------------------------
 

  it('should respond to a get request to /api/v1/categories', () => {////////////////
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {    
        return mockRequest.get('/api/v1/categories').then(results => {
          Object.keys(obj).forEach((key) => {
            expect(results.body.results[0][key]).toEqual(obj[key]);
          });
        });
      });
  });

  
  it('should respond to a get request to /api/v1/categories/id', () => {///////////////////
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };

    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
      // console.log('cccccccccccccccc',data.body);
     
        return mockRequest.get(`/api/v1/categories/${data.body._id}`).then(results => {
        // console.log('ccccccccccccccccvvvvvvvvvv',results.body);
        
          Object.keys(obj).forEach((key) => {
            expect(results.body[0][key]).toEqual(obj[key]);
          });
        
        });
      });
    
  });

  it('should respond to a post request to /api/v1/categories', () => {////////////////////
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(results => {
        Object.keys(obj).forEach((key) => {
          expect(results.body[key]).toEqual(obj[key]);
        });
      });
  });

  it('should respond to a put request to /api/v1/categories/id', () => {///////////////////////////////
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        let updateObj = { name: 'bags', display_name: 'bags', description: 'big collection of modern bags' };
        // console.log('xxxxxxxxxxxxxxxxxxxxxx post',data.body);
        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send(updateObj )
          .then(results => {
            
            Object.keys(updateObj).forEach((key) => {
              expect(results.body[key]).toEqual(updateObj[key]);
            });
          });
      });
  });
 
  it('should respond to a delete request to /api/v1/categories/1', () => {
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
    return mockRequest.post('/api/v1/categories')
      .send(obj)
      .then(data => {
        // console.log('aaaaaaaaaa data from post',data.body);

        return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
          .send(obj)
          .then((getdata) => {

            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(results => {
                // console.log('aaaaaaaaaa data from geeeeeeeeeeet',results.body);
                expect(results.body[0]).toBe();
              });
          });
      });
  });

  // ---------------------------------------------
  // err
  // -------------------------------------------
  it('should respond 404 to /api/v1/books', () => {
    let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
    return mockRequest.post('/api/v1/books')
      .send(obj)
      .then(data => {    
        return mockRequest.get('/api/v1/books').then(results => {
          expect(data.status).toBe(500);
          
        });
      });
  });

  
});

