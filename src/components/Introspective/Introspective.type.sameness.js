/**
 *
 *
 *  Mozilla Developer Network :: Sameness in JavaScript - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Sameness]
 *
 *
 *  Mozilla Developer Network :: Object.is() - [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is]
 *
 *
 */


composable("components.Introspective_type_sameness", function (require/*, global, internalBaseEnvironment*/) {


  "use strict";


  var
    environment = require("environment"),


    Trait,


    isNumberValue = environment.introspective.isNumberValue,


    isSameValue = function (typeA, typeB) {
      var issamevalue;

      if (isNumberValue(typeA) && isNumberValue(typeB)) {
        issamevalue = (

          ((typeA != typeA) && (typeB != typeB))  // NaN && NaN
          || (

            ((typeA == 0) && (typeB == 0))        // Absolute Zero Value for both sides AND
            ? ((1 / typeA) == (1 / typeB))        // >>(1 / 0) === Infinity<< for both sides OR >>(1 / -0) === -Infinity<< for both sides
            : (typeA == typeB)                    // OR Number Value Comparison Fallback
          )
        );
      } else {
        issamevalue = (typeA === typeB);          // ELSE [Object.is] Comparison Fallback
      }
      return issamevalue; // [true | false];
    }
  ;


  Trait = function () {

    this.isSameValue = isSameValue;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   235 byte  - named module
composable("components.Introspective_type_sameness",function(d){var c=d("environment").introspective.isNumberValue,e=function(a,b){return c(a)&&c(b)?a!=a&&b!=b||(0==a&&0==b?1/a==1/b:a==b):a===b};return function(){this.isSameValue=e}});


*/
