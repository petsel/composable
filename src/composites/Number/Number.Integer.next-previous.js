

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Integer_next_previous").call(global.Number.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   102 byte
composable("",function(a,b){a("components.Iterable_Integer_next_previous").call(b.Number.prototype)});


*/
