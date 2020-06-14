'use strict';
/**
 * main route
 * @module Model 
 */

/**
   * Model Constructor
   * @param {object} schema - Mongo Schema
   */

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
 * this function will return specific or all records saved in DB
 * @param {string} _id  
 * @returns {object}
 */
  get(_id) {
    const queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
 * this function will ctreate new record  and save it to DB 
 * @param {string} record  
 * @returns {object}
 */
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }
  /**
 * this function will update specific record from DB
 * @param {string} _id
 * @param {string} record  
 * @returns {object}
 */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }
  /**
 * this function will delete specific record from DB
 * @param {string} _id  
 * @returns {object}
 */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;