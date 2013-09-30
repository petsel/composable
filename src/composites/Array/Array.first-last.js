

composable(/*"composites.Array_first_last"*/"", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Enumerable_first_last").call(global.Array.prototype);

//return global.Array;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    92 byte
composable("",function(a,b){a("components.Enumerable_first_last").call(b.Array.prototype)});


*/
