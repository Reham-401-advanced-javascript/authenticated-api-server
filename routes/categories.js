// 'use strict';
// const express = require('express');
// const Categories = require('../lib/models/categories/categories-model.js');
// const router = express.Router();

// router.post('/categories', postCategories);
// router.get('/categories', getCategories);
// router.get('/categories/:id', getCategoriesById);
// router.put('/categories/:id', updateCategories);
// router.delete('/categories/:id', deleteCategories);

// // get all products
// function getCategories(req, res, next) {
//   Categories
//     .get()
//     .then((data) =>{
    
//       const count = data.length;
//       const results= data;
           
//       res.status(200).json({count,results});
//     })
//     .catch((err) => next(err.message));
// }

// // get specific product
// function getCategoriesById(req, res, next) {
//   Categories
//     .get(req.params.id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }

// // create new product
// function postCategories(req, res, next) {
//   Categories
//     .create(req.body)
//     .then((data) => res.status(200).json(data))
//     .catch(next);

// }

// // update specific product
// function updateCategories(req, res, next) {
//   Categories
//     .update(req.params.id ,req.body)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }

// // delete specific product
// function deleteCategories(req, res, next) {
//   Categories
//     .delete(req.params.id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }
// module.exports = router;