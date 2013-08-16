

composable("composites.Function_isFunction_isCallable", function (require, global/*, environment*/) {

  "use strict";

  require("components.Introspective_isFunction_isCallable").call(global.Function);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   140 byte
composable("composites.Function_isFunction_isCallable",function(a,b){a("components.Introspective_isFunction_isCallable").call(b.Function)});


*/
