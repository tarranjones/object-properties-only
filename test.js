'use strict';
var test = require('ava');
var removeMethods = require('./');

var obj = {};
obj.str = 'str';
obj.fnc = function(){};
obj.fnc.a = 'a'
obj.arr = [ function(){}, [], {}, 'a', 1, null]
obj.arr[0].function_prop = 'fp';
obj.plainobj = {
  fn : function(){},
  arr : [function(){},[],{}, 'a', 1, null]
};
Object.defineProperty(obj, 'dataDescriptor1', {
    enumerable: true,
    configurable: false,
    value: 'dataDescriptor1',
    writable: false,
});

Object.defineProperty(obj, 'accessorDescriptor1', {
    enumerable: true,
    configurable: false,
    get: function(){
      return 'accessorDescriptor1';
    }
})

// console.dir(obj)

//// obj after
var objAfter = Object.create(null)
objAfter.str = 'str';
var fnc = Object.create(null);
fnc.a = 'a'
objAfter.fnc = fnc;
objAfter.arr = [Object.create(null), [], Object.create(null), 'a', 1, null]
objAfter.arr[0].function_prop = 'fp';

var plainobj = Object.create(null)
plainobj.fn = Object.create(null);
plainobj.arr = [Object.create(null), [], Object.create(null), 'a', 1, null];
objAfter.plainobj = plainobj;
objAfter.dataDescriptor1 = 'dataDescriptor1'
objAfter.accessorDescriptor1 = 'accessorDescriptor1'


// console.log(objAfter)

console.log(require('util').inspect(obj, {depth:null}))
console.log(require('util').inspect(objAfter, {depth:null}))


test(function (t) {
  t.deepEqual(removeMethods(obj),objAfter)
});
