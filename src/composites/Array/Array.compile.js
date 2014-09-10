

composable(/*"composites.Array_compile"*/"", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment       = require("environment_extended_introspective_core"),
    array_initialize  = require("components.Enumerable_initializeArray"),


    array_prototype = global.Array.prototype,


    isFunction  = environment.introspective.isFunction,
    isArray     = environment.introspective.isArray,


    compileArray = function (length/*integer*/, defaultValueOrGenerator/*any non function type or a map function*/) {
      var
        thisArr = this,
        arr
      ;
    //if (isArray(thisArr) && (arr = array_initialize(length, defaultValueOrGenerator))) {
      if (isArray(thisArr) && (arr = array_initialize.apply(arr, arguments))) {

        thisArr.length = arr.length;

        arr.forEach(function (entry, idx/*, arr*/) {
          thisArr[idx] = entry;
        });
      }
      return thisArr;
    },

    hook = {}
  ;
  array_initialize.call(hook);
  array_initialize = hook.initializeArray;


  (!isFunction(array_prototype.compile) || (array_prototype.compile.length !== 2)) && (array_prototype.compile = compileArray);


//return Array;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   410 byte
composable("",function(f,h){var a=f("environment_extended_introspective_core"),e=f("components.Enumerable_initializeArray"),b=h.Array.prototype,k=a.introspective.isFunction,l=a.introspective.isArray,a=function(a,b){var c=this,d;l(c)&&(d=e.apply(d,arguments))&&(c.length=d.length,d.forEach(function(a,b){c[b]=a}));return c},g={};e.call(g);e=g.initializeArray;k(b.compile)&&2===b.compile.length||(b.compile=a)});


*/

