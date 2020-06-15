'use strict';
/**
 * main route
 * @module logger
 */

/**
 * this function will return a JSON Formatted logger Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */

module.exports = (req, res, next) => {
  console.log('Request', req.method, req.path,req.timeStamp);
  next();
};


