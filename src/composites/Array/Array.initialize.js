

composable(/*"composites.Array_initialize"*/"", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    array_initialize = require("components.Enumerable_initializeArray"),


    Array = global.Array,


    isFunction = internalBaseEnvironment.introspective.isFunction
  ;


  !isFunction(Array.initialize) && (Array.initialize = array_initialize.call(Array));


//return Array;
//return Array.initialize;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   159 byte
composable("",function(b,a,c){b=b("components.Enumerable_initializeArray");a=a.Array;c=c.introspective.isFunction;!c(a.initialize)&&(a.initialize=b.call(a))});


*/
