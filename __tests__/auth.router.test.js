'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

const base64 = require('base-64');



describe('Auth Model',()=>{
  it('POST to /signup to create a new user', ()=>{
    let obj = {'username': 'reham', 'password': '1234'};
    return  mockRequest.post('/signup')
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

    return mockRequest.post('/signin').set({'authorization':header3})
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

    return mockRequest.get('/users').set({'authorization':header3})
      .send(obj)
      .then(data=>{
        // console.log('44444444444444',data.body[0].username);
        // console.log('55555555555555',obj.username);

        expect(data.status).toEqual(200);
        expect(data.body[0].username).toEqual(obj.username);
      });
      
  });
  it('catch error ', ()=>{
    // let obj = {'username': 'reham', 'password': '1234'};
    return  mockRequest.post('/signup')
      .send()
      .then(result=>{
        expect(result.status).toEqual(403);
  
      });
  });

});

describe('testing extar routes',()=>{
 
  it('GET to /read', ()=>{
    let obj = {'username': 'omar', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.get('/read').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            // console.log('55555555555555' ,data);
  
            expect(data.status).toEqual(200);
            expect(data.text).toEqual('OK!!!');

          });

      });
      
  });

  it('GET to /add', ()=>{
    let obj = {'username': 'alia', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.post('/add').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            // console.log('55555555555555' ,data);
  
            expect(data.status).toEqual(200);
            expect(data.text).toEqual('OK!!!');

          });

      });
      
  });
  it('PUT to /change', ()=>{
    let obj = {'username': 'osama', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.put('/change').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            // console.log('55555555555555' ,data);
  
            expect(data.status).toEqual(200);
            expect(data.text).toEqual('OK!!!');

          });

      });
      
  });
  it('delete to /remove', ()=>{
    let obj = {'username': 'monther', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.delete('/remove').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            // console.log('55555555555555' ,data.text,'yyy',data.body);
  
            expect(data.status).toEqual(200);
            expect(data.text).toEqual('OK!!!');

          });

      });
      
  });

  it('500 err + Access Denied!! to delete method for writer', ()=>{
    let obj = {'username': 'ahmad', 'password': '1234','role':'writer'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.delete('/remove').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            // console.log('55555555555555' ,data.text,'yyy',data.body);
  
            expect(data.status).toEqual(500);
            expect(data.body).toEqual({ error: 'Access Denied!!'});

          });

      });
      
  });
  it('hhhhhhhhhhh', ()=>{
    let obj = {'username': 'muhannad', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        console.log('4444444444444',result.body);

        return mockRequest.get('/secret').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            console.log('55555555555555' ,data.body);
  
            expect(data.status).toEqual(200);
            // expect(data.text).toEqual('OK!!!');

          });

      });
      
  });

  it('GET to /secret', ()=>{
    let obj = {'username': 'ali', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        return mockRequest.get('/secret').set({ 'authorization':`Bearer ${result.body.token}`})
          .then(data=>{
            expect(data.status).toEqual(200);
            expect(data.body.username).toEqual(obj.username);

          });

      });
      
  });
 
  it('Invalid auth header ', ()=>{
    let obj = {'username': 'muhannad', 'password': '1234','role':'admin'};
    return  mockRequest.post('/signup')
      .send(obj)
      .then(result=>{
        // console.log('4444444444444',result.body);

        return mockRequest.get('/secret').set({ 'authorization':` ${result.body.token}`})
          .then(data=>{
            // console.log('8888888888' ,data.body);
  
            expect(data.status).toEqual(500);
            expect(data.body).toEqual({error: 'Invalid auth header'});

          });

      });
      
  });
});