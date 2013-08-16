

composable("composites.Array_make", function (require, global, environment) {

  "use strict";

  var
    enumerable = {},
    enumerable_to_array = (require("components.Enumerable_toArray").call(enumerable) || enumerable.toArray)
  ;
  global.Array.make = environment.helpers.makeArray = function (listAlike) {

    return enumerable_to_array.call(listAlike);
  };
//return global.Array;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   181 byte
composable("composites.Array_make",function(b,c,d){var a={},e=b("components.Enumerable_toArray").call(a)||a.toArray;c.Array.make=d.helpers.makeArray=function(a){return e.call(a)}});


*/
