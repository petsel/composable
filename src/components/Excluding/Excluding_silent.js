

composable("components.Excluding_silent", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    environment     = require("environment_extended_introspective_core"),
    Excluding       = require("components.Excluding"),


    SilentTrait,


    isObjectObject  = environment.introspective.isObjectObject,


    hook = {}
  ;
  Excluding.call(hook);


  var excludes = hook.excludes;


  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (isObjectObject(localProxy)) {

    //if (localProxy && (typeof localProxy == "object")) {
      var type = this;

      localProxy.excludes = function (/*methodName:string[, methodName:string[, ...]] | [methodName:string, methodName:string, ...]*/) {
        excludes.apply(type, arguments);
      };
    }
  };


  return SilentTrait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   288 byte
composable("components.Excluding_silent",function(a){var b=a("environment_extended_introspective_core");a=a("components.Excluding");var c=b.introspective.isObjectObject,b={};a.call(b);var d=b.excludes;return function(a){if(c(a)){var b=this;a.excludes=function(){d.apply(b,arguments)}}}});


*/
