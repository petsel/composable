

composable("components.Introspective_isAssigned", function (require, global, internalBaseEnvironment) {


  "use strict";


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Introspective_isAssigned" Trait Module.


    isString   = internalBaseEnvironment.introspective.isString
  ;


  Trait = function () {
    /**
     *  implementing the "Introspective_isAssigned" Trait Module.
     *
     *  example:
     *
     *  >> var Introspective = require("components.Introspective_isAssigned"); <<
     *  assigns the Trait to [Introspective].
     *
     *  >> Introspective.call(global.Object.prototype); <<
     *  then enriches the global Objects prototype by [respondTo].
     */
    this.isAssigned = function (key/*propertyName*/) { // @TODO - merge the final change into other branches of this type detection module.

      return (isString(key) && (key in this));
    //return (isString(key) && (key.trim() in this));
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   169 byte
composable("components.Introspective_isAssigned",function(d,e,b){var c=b.introspective.isString;return function(){this.isAssigned=function(a){return c(a)&&a in this}}});


*/
