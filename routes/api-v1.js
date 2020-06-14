'use strict';
/**
 * main route
 * @module Route
 */
const express = require('express');
const Categories = require('../lib/models/categories/categories-model.js');
const products = require('../lib/models/products/products-model.js');
const router = express.Router();
router.param('model', getModel);

/**
 * getModel 
 * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

function getModel(req, res, next) {
  const model = req.params.model;
  switch (model) {
  case 'categories':
    req.model = Categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}
router.post('/:model', postHandler);
router.get('/:model', getAllHandler);
router.get('/:model/:id', getOneHandler);
router.put('/:model/:id', updateHandler);
router.delete('/:model/:id', deleteHandler);

/**
 * postHandler function will create an object for the request data
 * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next() 
 */

function postHandler(req, res, next) {
  req.model
    .create(req.body)
    .then((data) => res.status(200).json(data))
    .catch(next);
}

/**
 * getAllHandler function will get all object saved in database
 * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */
function getAllHandler(req, res, next) {
  req.model
    .get()
    .then((data) => {
      const count = data.length;
      const results = data;
      res.status(200).json({ count, results });
    })
    .catch((err) => next(err.message));
}
/**
 * getOneHandler function will get specific object saved in database
  * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

function getOneHandler(req, res, next) {
  req.model
    .get(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => next(err.message));
}

/**
 * updateHandler function will update specific object saved in database
 * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

function updateHandler(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err.message));
}
/**
 * deleteHandler function will delete specific object saved in database
 * @param {Object} req -request
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

function deleteHandler(req, res, next) {
  req.model
    .delete(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err.message));
}
module.exports = router;