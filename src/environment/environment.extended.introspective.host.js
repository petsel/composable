

composable("environment_extended_introspective_host", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    /**
     *  make use of and extend the already available base "environment" module
     *  instead of creating again a prototypal copy of [internalBaseEnvironment].
     */
    environment = require("environment")/*,

    Introspective_typeDetection_host = require("components.Introspective_typeDetection_host")
  ;
  Introspective_typeDetection_host.call(environment.introspective)*/;


  return environment; // return a reference of the most recently extended "environment" module.


});
