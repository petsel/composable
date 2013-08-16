

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Integer_next").call(global.Number.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    93 byte
composable("",function(a,b){a("components.Iterable_Integer_next").call(b.Number.prototype)});


*/
