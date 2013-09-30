

composable("composites.Object_respondTo", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Introspective_respondTo").call(global.Object.prototype);

//return global.Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   122 byte  - named module
composable("composites.Object_respondTo",function(a,b){a("components.Introspective_respondTo").call(b.Object.prototype)});


*/
