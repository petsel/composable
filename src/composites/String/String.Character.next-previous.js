

composable("", function (require, global/*, environment*/) {

  "use strict";

  require("components.Iterable_Character_next_previous").call(global.String.prototype);

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   104 byte
composable("",function(a,b){a("components.Iterable_Character_next_previous").call(b.String.prototype)});


*/
