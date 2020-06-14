'use strict';
const schema = require('./products-schema.js');
const Model = require('../model.js');

class Product extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Product();