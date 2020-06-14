'use strict';
/**
 * main route
 * @module timeStampe
 */

/**
 * this function will return a JSON Formatted timeStampe Response
 * @param {Object} req - request 
 * @param {Object} res -response 
 * @param {Function} next -middleware next()
 */


module.exports= (req,res,next)=>{
  let requestTime = new Date();
  req.timeStamp = requestTime;
  next();
};