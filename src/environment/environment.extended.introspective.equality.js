

composable("environment_extended_introspective_equality", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    /**
     *  make use of and extend the already available base "environment" module
     *  instead of creating again a prototypal copy of [internalBaseEnvironment].
     */
    environment = require("environment"),

    Introspective_type_equality = require("components.Introspective_type_equality")
  ;
  Introspective_type_equality.call(environment.introspective);


  return environment; // return a reference of the most recently extended "environment" module.


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   169 byte
composable("environment_extended_introspective_equality",function(a){var b=a("environment");a("components.Introspective_type_equality").call(b.introspective);return b});


*/
