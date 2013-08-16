

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Enumerable_first_last").call(global.Array.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    92 byte
composable("",function(a,b){a("components.Enumerable_first_last").call(b.Array.prototype)});


*/
