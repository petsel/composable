

composable("components.Requiring_silent", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Requiring       = require("components.Requiring"),


    SilentTrait,


    isObjectObject  = internalBaseEnvironment.introspective.isObjectObject,


    hook = {},
    requires = (Requiring.call(hook) && hook.requires)
  ;


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


- Simple          -   242 byte
composable("components.Requiring_silent",function(b,e,a){b=b("components.Requiring");var c=a.introspective.isObjectObject;a={};var d=b.call(a)&&a.requires;return function(a){if(c(a)){var b=this;a.requires=function(){d.apply(b,arguments)}}}});


*/
