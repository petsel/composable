

composable("composites.Function_modifiers_adviceTypes_around", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Controllable_adviceTypes_around").call(global.Function.prototype);

//return global.Function;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   153 byte
composable("composites.Function_modifiers_adviceTypes_around",function(a,b){a("components.Controllable_adviceTypes_around").call(b.Function.prototype)});


- Simple          -   105 byte
composable("",function(a,b){a("components.Controllable_adviceTypes_around").call(b.Function.prototype)});


*/
