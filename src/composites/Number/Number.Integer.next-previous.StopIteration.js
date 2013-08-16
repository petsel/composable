

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Integer_next_previous_StopIteration").call(global.Number.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   116 byte
composable("",function(a,b){a("components.Iterable_Integer_next_previous_StopIteration").call(b.Number.prototype)});


*/
