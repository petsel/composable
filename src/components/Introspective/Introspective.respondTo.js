

composable("components.Introspective_respondTo", function (require, global, internalBaseEnvironment) {


  "use strict";


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Introspective_respondTo" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,


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
    this.respondTo = function (key/*methodName*/) { // @TODO - merge the final change into other branches of this type detection module.

      return (isString(key) && isCallable(this[key]));
    //return (isString(key) && isCallable(this[key.trim()]));
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   187 byte
composable("components.Introspective_respondTo",function(a,e,b){a=b.introspective;var c=a.isCallable,d=a.isString;return function(){this.respondTo=function(a){return d(a)&&c(this[a])}}});


*/
