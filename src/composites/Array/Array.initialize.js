

composable(/*"composites.Array_initialize"*/"", function (require, global, internalBaseEnvironment) {


  "use strict";


//  var
//    array_initialize = require("components.Enumerable_initializeArray"),
//
//
//    Array = global.Array,
//
//
//    isFunction = internalBaseEnvironment.introspective.isFunction,
//
//    hook = {}
//  ;
//  array_initialize.call(hook);
//
//
//  !isFunction(Array.initialize) && (Array.initialize = hook.initializeArray);
//
//
////return Array;
////return Array.initialize;


  var
    Array = global.Array,

    hook = {}
  ;
  require("components.Enumerable_initializeArray").call(hook);

  !internalBaseEnvironment.introspective.isFunction(Array.initialize) && (Array.initialize = hook.initializeArray);

//
////return Array;
////return Array.initialize;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   178 byte
composable("",function(c,a,d){a=a.Array;var b={};c("components.Enumerable_initializeArray").call(b);!d.introspective.isFunction(a.initialize)&&(a.initialize=b.initializeArray)});


- Simple          -   186 byte
composable("",function(b,a,c){b=b("components.Enumerable_initializeArray");a=a.Array;c=c.introspective.isFunction;var d={};b.call(d);!c(a.initialize)&&(a.initialize=d.initializeArray)});


*/
