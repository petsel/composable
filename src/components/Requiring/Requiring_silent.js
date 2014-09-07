

composable("components.Requiring_silent", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    environment     = require("environment_extended_introspective_core"),
    Requiring       = require("components.Requiring"),


    SilentTrait,


    isObjectObject  = environment.introspective.isObjectObject,


    hook = {}
  ;
  Requiring.call(hook);


  var requires = hook.requires;


  SilentTrait = function (localProxy) { // Privileged Silent Trait using a Local Proxy (or rather a Mixin?)
    if (isObjectObject(localProxy)) {

    //if (localProxy && (typeof localProxy == "object")) {
      var type = this;

      localProxy.requires = function (/*methodName:string[, methodName:string[, ...]] | [methodName:string, methodName:string, ...]*/) {
        requires.apply(type, arguments);
      };
    }
  };


  return SilentTrait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   288 byte
composable("components.Requiring_silent",function(a){var b=a("environment_extended_introspective_core");a=a("components.Requiring");var c=b.introspective.isObjectObject,b={};a.call(b);var d=b.requires;return function(a){if(c(a)){var b=this;a.requires=function(){d.apply(b,arguments)}}}});


*/
