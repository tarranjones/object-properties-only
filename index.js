'use strict';

var isObj = require('is-obj');
var isArray = require('is-array');
var isFunction = require('is-fn');
var isPlainObj= require('is-plain-obj');

module.exports = function (obj, methodReplacement, writable, enumerable, configurable) {

  if(typeof methodReplacement == 'undefined'){
    try {
      return isObj(obj) ? JSON.parse(JSON.stringify(obj)) : obj;
    } catch(e){}
  }
  writable = typeof writable == 'boolean' ? writable : true;
  enumerable = typeof enumerable == 'boolean' ? enumerable : true;
  configurable = typeof configurable == 'boolean' ? configurable : true;

  var returnVal = function(val){

    if(isObj(val)){

      if(isFunction(val) ){

        if(typeof methodReplacement == 'undefined'){
          return null;
        }
        if(isPlainObj(methodReplacement)){
          return removeMethods(val, methodReplacement);
        }
        return methodReplacement;
      }
      if(isArray(val)){
        return removeMethods(val, [])
      }
      return removeMethods(val, Object.create(null))
    }
    return val;
  }
  var removeMethods = function (obj, result) {

    if(isArray(obj)){

      obj.forEach(function(val, key) {

        if(!isFunction(obj[key]) || typeof methodReplacement != 'undefined'){
          result[key] = returnVal(val);
        }
      });

    } else {
        // enumerable and non-enumerable
      var keys = Object.getOwnPropertyNames(obj);
      if(isFunction(obj)){
        keys = keys.filter(item => ['length','prototype','name'].indexOf(item) === -1);
      }
      keys.forEach(function (key) {

        if(!isFunction(obj[key]) || typeof methodReplacement != 'undefined'){

          Object.defineProperty(result, key, {
            __proto__: null,
            writable: writable,
            enumerable: enumerable,
            configurable: configurable,
            value: returnVal(obj[key])
          });
        }
      });
    }
    return result;
  };
  return returnVal(obj);
};
module.exports.version = require('./package.json').version;
