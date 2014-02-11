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


composable("composites.Object_is", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  global.Object.is = require("environment_extended_introspective_sameness").introspective.isSameValue;

//return global.Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   137 byte
composable("composites.Object_is",function(a,b){b.Object.is=a("environment_extended_introspective_sameness").introspective.isSameValue});


*/





/*
(function (Object) {

  var
    isFunction = function (type) {
      return ((typeof type == "function") && (typeof type.call == "function") && (typeof type.apply == "function"));
    },
    isNumberValue = function (type) {
      return (typeof type == "number");
    }
  ;
  if (!isFunction(Object.is)) {

    Object.is = function (typeA, typeB) {
      var isSame;

      if (isNumberValue(typeA) && isNumberValue(typeB)) {
        isSame = (

          ((typeA != typeA) && (typeB != typeB))  // NaN && NaN
          || (

            ((typeA == 0) && (typeB == 0))        // Absolute Zero Value for both sides AND
            ? ((1 / typeA) == (1 / typeB))        // >>(1 / 0) === Infinity<< for both sides OR >>(1 / -0) === -Infinity<< for both sides
            : (typeA == typeB)                    // OR Number Value Comparison Fallback
          )
        );
      } else {
        isSame = (typeA === typeB);               // ELSE [Object.is] Comparison Fallback
      }
      return isSame; // [true | false];
    };
  }

}(Object));
*/



/*


(function (d) {
  var c = d.is;
  if ("function" != typeof c || "function" != typeof c.call || "function" != typeof c.apply) d.is = function (a, b) {
    return "number" == typeof a && "number" == typeof b ? a != a && b != b || (0 == a && 0 == b ? 1 / a == 1 / b : a == b) : a === b
  }
}(Object));


*/



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   223 byte
(function(d){var c=d.is;if("function"!=typeof c||"function"!=typeof c.call||"function"!=typeof c.apply)d.is=function(a,b){return"number"==typeof a&&"number"==typeof b?a!=a&&b!=b||(0==a&&0==b?1/a==1/b:a==b):a===b}}(Object));


*/
