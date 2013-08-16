

composable("composites.Object_isAssigned", function (require, global/*, environment*/) {

  "use strict";

  require("components.Introspective_isAssigned").call(global.Object.prototype);

//return global.Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   124 byte  - named module
composable("composites.Object_isAssigned",function(a,b){a("components.Introspective_isAssigned").call(b.Object.prototype)});


- Simple          -    96 byte  - anonymous module
composable("",function(a,b){a("components.Introspective_isAssigned").call(b.Object.prototype)});


*/
