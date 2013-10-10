

composable("composites.Function_modifiers_adviceTypes_before_after_around", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Controllable_adviceTypes_before_after_around").call(global.Function.prototype);

//return global.Function;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   179 byte
composable("composites.Function_modifiers_adviceTypes_before_after_around",function(a,b){a("components.Controllable_adviceTypes_before_after_around").call(b.Function.prototype)});


- Simple          -   118 byte
composable("",function(a,b){a("components.Controllable_adviceTypes_before_after_around").call(b.Function.prototype)});


*/
