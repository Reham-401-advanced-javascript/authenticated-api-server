'use strict';
/**
 * main route
 * @module 404
 */

/**
 * this function will send a JSON Formatted 404 Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */


module.exports=(req, res, next)=> {
  res.status(404);
  res.statusMessage = 'Resource Not Found';
  res.json({ error: 'not Found' });
};