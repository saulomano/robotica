'use strict';

var _ = require('lodash');
var compose = require('compose-middleware').compose;

function isPromise(obj){
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

var waitPromise = function(req, res, next){
  if (!req.result){
    return next();
  }

  if (isPromise(req.result)){
    req
      .result
      .then(function(res){
        req.result = res;
        req.statusCode = 200;
        next();
      })
      .catch(function(err){
        req.statusCode = 500;
        req.error = err;
        next();
      });

  } else {
    next();
  }
};

var write = function(req, res, next){
  if (!req.result){
    return next();
  }

  let statusCode = req.statusCode || 200;

  if (statusCode >= 400){
    return res.status(statusCode).json(req.error);
  }

  if (req.result instanceof Array){
    return responseAsArray(req, res, statusCode);
  }
  
  res.setHeader('x-result-type', typeof req.result);
  res.status(statusCode).json(req.result);
};

function responseAsArray(req, res, statusCode){
  var query = req.querymen;
  res.setHeader('x-result-type', 'array');
  res.setHeader('x-result-skip', query.cursor.skip);
  res.setHeader('x-result-limit', query.cursor.limit);
  if (req.totalItems !== undefined){
    res.setHeader('x-result-total', req.totalItems);
  }

  return res.status(statusCode).json(req.result);
}

module.exports = function() {
  return compose([
    waitPromise,
    write
  ]);
};