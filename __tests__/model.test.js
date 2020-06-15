'use strict';
require('@code-fellows/supergoose');
const Model = require('../lib/models/model.js');
const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },

});
let testModel = mongoose.model('testSchema', testSchema);

let newModelTest = new Model(testModel);



describe('model', () => {
  it('create', () => {
    let testObj = { name: 'reham', description: 'software developer' };

    return newModelTest.create(testObj)
      .then(results => {
        Object.keys(testObj).forEach((key) => {
          expect(results[key]).toEqual(testObj[key]);
        });
      });
  });
  it('get all  ', () => {
    let testObj = { name: 'reham', description: 'software developer' };

    return newModelTest.create(testObj)
      .then(results => {
        return newModelTest.get()
          .then(data => {
            Object.keys(testObj).forEach((key) => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });

      });
  });

  it('get one  ', () => {
    let testObj = { name: 'omar', description: 'software developer' };

    return newModelTest.create(testObj)
      .then(results => {
        return newModelTest.get(results.id)
          .then(data => {
            Object.keys(testObj).forEach((key) => {
              expect(data[0][key]).toEqual(testObj[key]);
            });
          });

      });
  });

  it('update  ', () => {
    let testObj = { name: 'reham', description: 'software developer' };

    return newModelTest.create(testObj)
      .then(results => {
        let testObj2 = { name: 'alia', description: 'software developer' };

        return newModelTest.update(results.id,testObj2)
          .then(data => {
            // console.log('jjjjjjjj',data);
            Object.keys(testObj2).forEach((key) => {
              expect(data[key]).toEqual(testObj2[key]);
            });
          });

      });
  });

  it('delete  ', () => {
    let testObj = { name: 'reham', description: 'software developer' };

    return newModelTest.create(testObj)
      .then(results => {
        return newModelTest.update(results.id)
          .then(data => {
            return newModelTest.get(data.id)
              .then(deletedData=>{
              // console.log('nnnnnnnnnnnnn',deletedData);

                Object.keys(testObj).forEach((key) => {
                  expect(deletedData[key]).toBe();
                });
              });
          });

      });
  });

});