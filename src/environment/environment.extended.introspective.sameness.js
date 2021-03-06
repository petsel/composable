

composable("environment_extended_introspective_sameness", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    /**
     *  make use of and extend the already available base "environment" module
     *  instead of creating again a prototypal copy of [internalBaseEnvironment].
     */
    environment = require("environment"),

    Introspective_type_sameness = require("components.Introspective_type_sameness")
  ;
  Introspective_type_sameness.call(environment.introspective);


  return environment; // return a reference of the most recently extended "environment" module.


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   169 byte
composable("environment_extended_introspective_sameness",function(a){var b=a("environment");a("components.Introspective_type_sameness").call(b.introspective);return b});


*/
