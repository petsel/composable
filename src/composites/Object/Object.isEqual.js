

composable("composites.Object_isEqual", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  global.Object.isEqual = require("environment_extended_introspective_equality").introspective.isEqualType;

//return global.Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   147 byte
composable("composites.Object_isEqual",function(a,b){b.Object.isEqual=a("environment_extended_introspective_equality").introspective.isEqualType});


*/
