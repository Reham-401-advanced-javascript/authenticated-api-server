'use strict';
require('@code-fellows/supergoose');
const categories = require('../lib/models/categories/categories-model.js');

describe('categories model',()=>{
  it('create new categories ', () => {
    let obj = {  name: 'bags',display_name: 'bags',description: 'big collection of bags' };
    return categories.create(obj)
      .then(results => {
        Object.keys(obj).forEach((key) => {
          expect(results[key]).toEqual(obj[key]);
        });
      });
  });

  it('get all categories ', () => {
    let obj = {  name: 'bags',display_name: 'bags',description: 'big collection of bags' };
    return categories.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        return categories.get()
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj).forEach((key) => {
              expect(data[0][key]).toEqual(obj[key]);
            });
          });
      
      });
  });

  it('get specific categories ', () => {
    let obj = {  name: 'bags',display_name: 'bags',description: 'big collection of bags' };
    return categories.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        return categories.get(results.id)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj).forEach((key) => {
              expect(data[0][key]).toEqual(obj[key]);
            });
            expect(data[0].id).toEqual(results.id);

          });
      
      });
  });
  it('update specific categories ', () => {
    let obj = {  name: 'bags',display_name: 'bags',description: 'big collection of bags' };

    return categories.create(obj)
      .then(results => {
        // console.log('rrrrrrrrrrrrrr',results);
        let obj2 = {  name: 'clothes',display_name: 'clothes',description: 'big collection of clothes' };

        return categories.update(results.id,obj2)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            Object.keys(obj2).forEach((key) => {
              expect(data[key]).toEqual(obj2[key]);
            });
          });
      
      });
  });
  it('delete specific categories ', () => {
    let obj = {  name: 'bags',display_name: 'bags',description: 'big collection of bags' };
    return categories.create(obj)
      .then(results => {
        return categories.delete(results.id)
          .then(data=>{
            // console.log('mmmmmmmmmmmmmmmmmm',data);
            return categories.get(data.id)
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


