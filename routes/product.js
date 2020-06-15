// 'use strict';
// const express = require('express');
// const products = require('../lib/models/products/products-model.js');
// const router = express.Router();

// router.post('/products', postProduct);
// router.get('/products', getProduct);
// router.get('/products/:id', getProductById);
// router.put('/products/:id', updateProduct);
// router.delete('/products/:id', deleteProduct);

// // get all products
// function getProduct(req, res, next) {
//   products
//     .get()
//     .then((data) =>{
//       const allProduct = {
//         count: data.length,
//         results: data,
//       };
        
//       res.status(200).json(allProduct);
//     })
//     .catch((err) => next(err.message));
// }

// // get specific product
// function getProductById(req, res, next) {
//   products
//     .get(req.params.id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }

// // create new product
// function postProduct(req, res, next) {
//   products
//     .create(req.body)
//     .then((data) => res.status(200).json(data))
//     .catch(next);

// }

// // update specific product
// function updateProduct(req, res, next) {
//   products
//     .update(req.params.id ,req.body)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }

// // delete specific product
// function deleteProduct(req, res, next) {
//   products
//     .delete(req.params.id)
//     .then((data) => res.status(200).json(data))
//     .catch((err) => next(err.message));
// }
// module.exports = router;