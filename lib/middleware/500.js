'use strict';
/**
 * main route
 * @module 500 
 */

/**
 * this function will send a JSON Formatted 500 Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */


module.exports=(err, req, res, next)=> {
  res.status(500);
  res.statusMessage = 'Server Error :(';
  res.json({ error: err });
};

