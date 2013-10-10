

composable("composites.Function_modifiers_adviceTypes_before_after", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Controllable_adviceTypes_before_after").call(global.Function.prototype);

//return global.Function;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   165 byte
composable("composites.Function_modifiers_adviceTypes_before_after",function(a,b){a("components.Controllable_adviceTypes_before_after").call(b.Function.prototype)});


- Simple          -   111 byte
composable("",function(a,b){a("components.Controllable_adviceTypes_before_after").call(b.Function.prototype)});


*/
