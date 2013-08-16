

composable("environment_extended_introspective_core", function (require/*, global, internalEnvironmentBase*/) {


  "use strict";


  var
    /**
     *  make use of and extend the already available base "environment" module
     *  instead of creating again a prototypal copy of [internalEnvironmentBase].
     */
    environment = require("environment"),

    Introspective_typeDetection_core = require("components.Introspective_typeDetection_core")
  ;
  Introspective_typeDetection_core.call(environment.introspective);


  return environment;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   170 byte
composable("environment_extended_introspective_core",function(a){var b=a("environment");a("components.Introspective_typeDetection_core").call(b.introspective);return b});


*/
