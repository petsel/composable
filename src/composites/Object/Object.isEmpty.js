

composable("composites.Object_isEmpty", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  var
    env_introspective = require("environment_extended_introspective_emptiness").introspective,

    Object = global.Object
  ;

//Object.isEmptyValue   = env_introspective.isEmptyValue;
  Object.isEmpty        = env_introspective.isEmptyType;
  Object.isUninhabited  = env_introspective.isUninhabitedStructure;

//global.Array.isSparse = env_introspective.isSparseList;

//return Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   201 byte
composable("composites.Object_isEmpty",function(c,d){var a=c("environment_extended_introspective_emptiness").introspective,b=d.Object;b.isEmpty=a.isEmptyType;b.isUninhabited=a.isUninhabitedStructure});


*/
