

composable("composites.Object_respondTo_isAssigned", function (require, global/*, environment*/) {

  "use strict";

  var
    object_prototype = global.Object.prototype
  ;
  require("components.Introspective_respondTo").call(object_prototype);
  require("components.Introspective_isAssigned").call(object_prototype);

//return global.Object;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   190 byte  - named module
composable("composites.Object_respondTo_isAssigned",function(a,c){var b=c.Object.prototype;a("components.Introspective_respondTo").call(b);a("components.Introspective_isAssigned").call(b)});


- Simple          -   152 byte  - anonymous module
composable("",function(a,c){var b=c.Object.prototype;a("components.Introspective_respondTo").call(b);a("components.Introspective_isAssigned").call(b)});


*/
