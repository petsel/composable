

composable("composites.Array_isSparse", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  global.Array.isSparse = require("environment_extended_introspective_emptiness").introspective.isSparseList;

//return global.Array;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   149 byte
composable("composites.Array_isSparse",function(a,b){b.Array.isSparse=a("environment_extended_introspective_emptiness").introspective.isSparseList});


*/
