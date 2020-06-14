'use strict';
require('@code-fellows/supergoose');
const products = require('../lib/models/products/products-model.js');


describe('product model',()=>{
    
  it('create new product ', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
  
    return products.create(obj)
      .then(results => {
        Object.keys(obj).forEach((key) => {
          expect(results[key]).toEqual(obj[key]);
        });
      });
  });

  it('get all products ', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return products.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        return products.get()
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj).forEach((key) => {
              expect(data[0][key]).toEqual(obj[key]);
            });
          });
      
      });
  });

  it('get specific product ', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return products.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        return products.get(results.id)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj).forEach((key) => {
              expect(data[0][key]).toEqual(obj[key]);
            });
            expect(data[0].id).toEqual(results.id);

          });
      
      });
  });
  it('update specific products ', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };

    return products.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        let obj2 = { category: 'bags', name: 'bags', display_name: 'lab7', description: ' bags' };

        return products.update(results.id,obj2)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj2).forEach((key) => {
              expect(data[key]).toEqual(obj2[key]);
            });
          });
      
      });
  });
  it('delete specific products ', () => {
    let obj = { category: 'accessories', name: 'reham', display_name: 'lab7', description: 'cover this wide headband' };
    return products.create(obj)
      .then(results => {
        return products.delete(results.id)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            return products.get(data.id)
              .then(deletedData=>{
                // console.log('nnnnnnnnnnnnn',deletedData);
  
                Object.keys(obj).forEach((key) => {
                  expect(deletedData[key]).toBe();
                });
              });
            
          });
      
      });
  });
});