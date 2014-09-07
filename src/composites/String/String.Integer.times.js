

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Integer_times").call(global.String.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    94 byte
composable("",function(a,b){a("components.Iterable_Integer_times").call(b.String.prototype)});


*/
