'use strict';
/**
 * main route
 * @module Route
 */
const express = require('express');
const Categories = require('../lib/models/categories/categories-model.js');
const products = require('../lib/models/products/products-model.js');
const users = require('../src/auth/models/users-model.js');
const bearerAuth = require('../src/auth/middleware/bearer.js');
const permissions = require('../src/auth/middleware/authorize.js');
const basicAuth = require('../src/auth/middleware/basic.js');
const oauth = require('../src/auth/middleware/oauth.js');
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
router.post('/signup',signup);
router.post('/signin', basicAuth,signin);
router.get('/users', basicAuth ,user);
router.get('/oauth', oauth,oauthentication);

router.post('/:model',bearerAuth, permissions('create'), postHandler);
router.get('/:model',bearerAuth, permissions('read'), getAllHandler);
router.get('/:model/:id',bearerAuth, permissions('read'), getOneHandler);
router.put('/:model/:id',bearerAuth, permissions('update'), updateHandler);
router.delete('/:model/:id',bearerAuth, permissions('delete'), deleteHandler);

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

function signup(req,res){
  console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');

  users
    .saveUser(req.body)
    .then((user) => {
      console.log('rrrrrrrrrrrrrbbrrrrrrrrrrrrrrrrrrrrrrrrrrr');

      // console.log('mmmm,mmmm',user);
      const token = users.generateToken(user);
      res.json({ token });
    })
    .catch((err) => res.status(403).send(err.message));
}

function signin (req,res){
  res.json({ token: req.token });
}

async function user(req,res){
  // console.log('bbbbbbbbbbbb',req.body);
  res.json(await users.list());

}
function oauthentication(req,res){
  console.log('ooooooooauth',req.token);
  res.json({ token: req.token  , user:req.user});
}

module.exports = router;