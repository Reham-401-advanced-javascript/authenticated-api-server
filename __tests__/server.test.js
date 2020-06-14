'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const base64 = require('base-64');



// 200 
describe('sever', () => {

  it('should respond with 200 on /api/v1/categories', () => {
    let obj = {'username': 'm', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        return mockRequest.get('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .then((results) => {
            expect(results.status).toBe(200);
          });
      });
    
  });

  //-----------------------------------------------------------------------------------
  // products rout 
  //-----------------------------------------------------------------------------------
  it('should respond to a get request to /api/v1/products', ()=>{
    let obj = {'username': 'may', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };

        return mockRequest.post('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            return mockRequest.get('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
              .then(results => {          
                Object.keys(obj).forEach((key) => {
                  expect(results.body.results[0][key]).toEqual(obj[key]);
                });
              });

          });
      });
      
  });

  it('should respond to a get request to /api/v1/products/id', ()=>{
    let obj = {'username': 'farah', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };

        return mockRequest.post('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .then(results => {
              
               
                Object.keys(obj).forEach((key) => {
                  expect(results.body[0][key]).toEqual(obj[key]);
                });
              });
           
          });

      });
      
  });
  
  it('should respond to a post request to /api/v1/products', ()=>{
    let obj = {'username': 'ma', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);
        let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };

        return mockRequest.post('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(results => {
            console.log('??????????????????????????????????4444444444444',results.body);
    
            // console.log('result ',results.body);
            Object.keys(obj).forEach((key) => {
              expect(results.body[key]).toEqual(obj[key]);
            });
          });

      });
      
  });

  it('should respond to a put request to /api/v1/products/id', ()=>{
    let obj = {'username': 'mai', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };

        return mockRequest.post('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            let updateObj = { category: 'accessories', name: 'qusai', display_name: 'lab-07', description: 'cover this wide headband' };
            return mockRequest.put(`/api/v1/products/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .send(updateObj )
              .then(results => {
              
                Object.keys(updateObj).forEach((key) => {
                  expect(results.body[key]).toEqual(updateObj[key]);
                });
              });
           
          });

      });
      
  });
 
  it('should respond to a delete request to /api/v1/products/id', () => {
    let obj = {'username': 'bv', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
        return mockRequest.post('/api/v1/products').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            // console.log('aaaaaaaaaa data from post',data.body);

            return mockRequest.delete(`/api/v1/products/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .send(obj)
              .then((getdata) => {

                return mockRequest.get(`/api/v1/products/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
                  .then(results => {
                    // console.log('aaaaaaaaaa data from geeeeeeeeeeet',results.body);
                    expect(results.body[0]).toBe();
                  });
              });
          });
      });
      
  });

  //-----------------------------------------------------------------------------------
  // categories routs 
  //-----------------------------------------------------------------------------------
 
  it('should respond to a get request to /api/v1/categories', ()=>{
    let obj = {'username': 'a', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };

        return mockRequest.post('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            return mockRequest.get('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
              .then(results => {          
                Object.keys(obj).forEach((key) => {
                  expect(results.body.results[0][key]).toEqual(obj[key]);
                });
              });

          });
      });
      
  });
  it('should respond to a get request to /api/v1/categories/id', ()=>{
    let obj = {'username': 'g', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };

        return mockRequest.post('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .then(results => {
              
               
                Object.keys(obj).forEach((key) => {
                  expect(results.body[0][key]).toEqual(obj[key]);
                });
              });
           
          });

      });
      
  });
  
  it('should respond to a post request to /api/v1/categories', ()=>{
    let obj = {'username': 'n', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);
        let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };

        return mockRequest.post('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(results => {  
            // console.log('result ',results.body);
            Object.keys(obj).forEach((key) => {
              expect(results.body[key]).toEqual(obj[key]);
            });
          });

      });
      
  }); 

  it('should respond to a put request to /api/v1/categories/id', ()=>{
    let obj = {'username': 'i', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };

        return mockRequest.post('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            let updateObj = { name: 'bags', display_name: 'bags', description: 'big collection of modern bags' };
            return mockRequest.put(`/api/v1/categories/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .send(updateObj )
              .then(results => {
              
                Object.keys(updateObj).forEach((key) => {
                  expect(results.body[key]).toEqual(updateObj[key]);
                });
              });
           
          });

      });
      
  });

  it('should respond to a delete request to /api/v1/categories/1', () => {
    let obj = {'username': 'a', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        let obj = { name: 'accessories', display_name: 'accessories', description: 'big collection of modern accessories' };
        return mockRequest.post('/api/v1/categories').set({ 'authorization':`Bearer ${result.body.token}`})
          .send(obj)
          .then(data => {
            // console.log('aaaaaaaaaa data from post',data.body);

            return mockRequest.delete(`/api/v1/categories/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
              .send(obj)
              .then((getdata) => {

                return mockRequest.get(`/api/v1/categories/${data.body._id}`).set({ 'authorization':`Bearer ${result.body.token}`})
                  .then(results => {
                    // console.log('aaaaaaaaaa data from geeeeeeeeeeet',results.body);
                    expect(results.body[0]).toBe();
                  });
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

describe('Auth Model',()=>{
  it('POST to /signup to create a new user', ()=>{
    let obj = {'username': 'reham', 'password': '1234'};
    return  mockRequest.post('/api/v1/signup')
      .send(obj)
      .then(result=>{
        // console.log('signup',result.body);
        expect(result.status).toEqual(200);
        expect(typeof result.body.token).toEqual('string');

      });
      
  });

  // {
  //   headers:{
  //     "authorization":"Basic m4e321$342"
  //   }
  // }
  it('POST to /signin ', ()=>{
    let obj = {'username': 'reham', 'password': '1234'};
    
    let header={
      headers:{
        'authorization':'reham:1234',
      },
    };
    // let header2=header.headers;
    let header3=base64.encode(header.headers.authorization);
    // console.log('cccccccccccc',header3);

    return mockRequest.post('/api/v1/signin').set({'authorization':header3})
      .send(obj)
      .then(data=>{
        // console.log('nnnnnnnnnnnnn',data.body);
        expect(data.status).toEqual(200);
        expect(typeof data.body.token).toEqual('string');

      });
      
  });
  it('GET to /users ', ()=>{
    let obj = {'username': 'reham', 'password': '1234'};
    
    let header={
      headers:{
        'authorization':'reham:1234',
      },
    };
    // let header2=header.headers;
    let header3=base64.encode(header.headers.authorization);
    // console.log('333333333333',header3);

    return mockRequest.get('/api/v1/users').set({'authorization':header3})
      .send(obj)
      .then(data=>{

        expect(data.status).toEqual(200);
      });
      
  });
  it('catch error ', ()=>{
    // let obj = {'username': 'reham', 'password': '1234'};
    return  mockRequest.post('/api/v1/signup')
      .send()
      .then(result=>{
        expect(result.status).toEqual(403);
  
      });
  });

});