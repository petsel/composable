

composable("components.Introspective_isAssigned", function (require, global, environment) {


  "use strict";


  var
    Trait, // the "Introspective_isAssigned" Trait Module.


    isString   = environment.introspective.isString
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
    this.isAssigned = function (propertyName) {

      return (isString(propertyName) && (propertyName in this));
    };
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   169 byte
composable("components.Introspective_isAssigned",function(d,e,b){var c=b.introspective.isString;return function(){this.isAssigned=function(a){return c(a)&&a in this}}});


*/
