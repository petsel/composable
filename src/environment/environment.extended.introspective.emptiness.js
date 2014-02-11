

composable("environment_extended_introspective_emptiness", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    /**
     *  make use of and extend the already available base "environment" module
     *  instead of creating again a prototypal copy of [internalBaseEnvironment].
     */
    environment = require("environment"),

    Introspective_type_emptiness = require("components.Introspective_type_emptiness")
  ;
  Introspective_type_emptiness.call(environment.introspective);


  return environment; // return a reference of the most recently extended "environment" module.


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   171 byte
composable("environment_extended_introspective_emptiness",function(a){var b=a("environment");a("components.Introspective_type_emptiness").call(b.introspective);return b});


*/
