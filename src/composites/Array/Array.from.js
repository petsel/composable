

composable(/*"composites.Array_from"*/"", function (require, global, internalBaseEnvironment) {

  "use strict";

  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */
  !internalBaseEnvironment.introspective.isFunction(global.Array.from) && (global.Array.from = internalBaseEnvironment.helpers.makeArray);

//return global.Array;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   110 byte
composable("",function(c,a,b){!b.introspective.isFunction(a.Array.from)&&(a.Array.from=b.helpers.makeArray)});


*/
