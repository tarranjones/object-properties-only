'use strict';

var isObj = require('is-obj');
var isArray = require('is-array');
var isFunction = require('is-fn');

module.exports = function (obj, writable,enumerable, configurable) {

  writable = typeof writable == 'boolean' ? writable : true;
  enumerable = typeof enumerable == 'boolean' ? enumerable : true;
  configurable = typeof configurable == 'boolean' ? configurable : true;

  var returnVal = function(val){
    return isObj(val) ? removeMethods(val, isArray(val) ? [] : Object.create(null)) : val;
  }
  var removeMethods = function (obj, result) {

    if(isArray(obj)){

      obj.forEach(function(val, key) {
        result[key] = returnVal(val);
      });

    } else {

      // enumerable and non-enumerable
      var keys = Object.getOwnPropertyNames(obj);

      if(isFunction(obj)){
        keys = keys.filter(item => ['length','prototype','name'].indexOf(item) === -1);
      }
      keys.forEach(function (key) {
        Object.defineProperty(result, key, {
          __proto__: null,
          writable: writable,
          enumerable: enumerable,
          configurable: configurable,
          value: returnVal(obj[key])
        });
      });
    }
    return result;
  };
  return isObj(obj) ? (removeMethods(obj, isArray(obj) ? [] : Object.create(null), writable, enumerable, configurable) ) : obj;
};
