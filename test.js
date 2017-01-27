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



// console.log({ version : removeMethods.version})

test(function (t) {

  var functionReplacement = Object.create(null);
  //// obj after
  var objAfter = Object.create(null)
  objAfter.str = 'str';
  var fnc = functionReplacement;
  fnc.a = 'a'
  objAfter.fnc = fnc;
  objAfter.arr = [functionReplacement, [], Object.create(null), 'a', 1, null]
  objAfter.arr[0].function_prop = 'fp';

  var plainobj = Object.create(null)
  plainobj.fn = functionReplacement;
  plainobj.arr = [functionReplacement, [], Object.create(null), 'a', 1, null];
  objAfter.plainobj = plainobj;
  objAfter.dataDescriptor1 = 'dataDescriptor1'
  objAfter.accessorDescriptor1 = 'accessorDescriptor1'

  t.deepEqual(removeMethods(obj, functionReplacement), objAfter)
});

// no replacement
test(function (t) {

  var objAfter = Object.create(null)
  objAfter.str = 'str';
  objAfter.arr = [null, [], Object.create(null), 'a', 1, null]

  var plainobj = Object.create(null)
  plainobj.arr = [null, [], Object.create(null), 'a', 1, null];
  objAfter.plainobj = plainobj;
  objAfter.dataDescriptor1 = 'dataDescriptor1'
  objAfter.accessorDescriptor1 = 'accessorDescriptor1'

  var objjson = JSON.stringify(obj);
  var objparsed = JSON.parse(objjson);
  var objafterjson = JSON.stringify(objAfter);
  t.deepEqual(objjson,objafterjson);

  //JSON.stringify working
  if(true){


  } else {
    //JSON.stringify commented out

    t.deepEqual(removeMethods(obj), objAfter)
    t.deepEqual(removeMethods(obj), objparsed)


  }

});

// null replacement
test(function (t) {

  var functionReplacement =  null;

  var objAfter = Object.create(null)
  objAfter.str = 'str';
  objAfter.fnc = functionReplacement;
  objAfter.arr = [functionReplacement, [], Object.create(null), 'a', 1, null]

  var plainobj = Object.create(null)
  plainobj.fn = functionReplacement;
  plainobj.arr = [functionReplacement, [], Object.create(null), 'a', 1, null];
  objAfter.plainobj = plainobj;
  objAfter.dataDescriptor1 = 'dataDescriptor1'
  objAfter.accessorDescriptor1 = 'accessorDescriptor1'
  t.deepEqual(removeMethods(obj, null), objAfter)

});



//  t.deepEqual(removeMethods(obj), objAfter)
//               |             |     |
// Object{str:"str",arr:[null,[],Object{},"a",1,null],plainobj:Object{arr:[null,#Array#,#Object#,"a",1,null]},"dataDescriptor1":"dataDescriptor1","accessorDescriptor1":"accessorDescriptor1"}
// Object{str:"str",fnc:#function#,arr:[#function#,[],Object{},"a",1,null],plainobj:Object{fn:#function#,arr:[#function#,#Array#,#Object#,"a",1,null]},"dataDescriptor1":"dataDescriptor1","accessorDescriptor1":"accessorDescriptor1"}
// Object{str:"str",arr:[,[],Object{},"a",1,null],plainobj:Object{arr:[,#Array#,#Object#,"a",1,null]},"dataDescriptor1":"dataDescriptor1","accessorDescriptor1":"accessorDescriptor1"}

