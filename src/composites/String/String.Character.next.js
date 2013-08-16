

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Character_next").call(global.String.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -    95 byte
composable("",function(a,b){a("components.Iterable_Character_next").call(b.String.prototype)});


*/
