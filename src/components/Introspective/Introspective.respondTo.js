

composable("components.Introspective_respondTo", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Introspective_respondTo" Trait Module.


    env_introspective = environment.introspective,


    isCallable = env_introspective.isCallable,
    isString   = env_introspective.isString
  ;


  Trait = function () {
    /**
     *  implementing the "Introspective_respondTo" Trait Module.
     *
     *  example:
     *
     *  >> var Introspective = require("components.Introspective_respondTo"); <<
     *  assigns the Trait to [Introspective].
     *
     *  >> Introspective.call(global.Object.prototype); <<
     *  then enriches the global Objects prototype by [respondTo].
     */
    this.respondTo = function (methodName) {

      return isCallable(this[(isString(methodName) && methodName/*.trim()*/) || ""]);
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   243 byte
composable("components.Introspective_respondTo",function(a,e,b){a("components.Introspective_isFunction_isCallable");a=b.introspective;var c=a.isCallable,d=a.isString;return function(){this.respondTo=function(a){return c(this[d(a)&&a||""])}}});


*/
