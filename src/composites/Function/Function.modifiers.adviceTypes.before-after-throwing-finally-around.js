

composable("composites.Function_modifiers_adviceTypes_before_after_throwing_finally_around", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.Controllable_adviceTypes_before_after_throwing_finally_around").call(global.Function.prototype);

//return global.Function;

});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   213 byte
composable("composites.Function_modifiers_adviceTypes_before_after_throwing_finally_around",function(a,b){a("components.Controllable_adviceTypes_before_after_throwing_finally_around").call(b.Function.prototype)});


- Simple          -   135 byte
composable("",function(a,b){a("components.Controllable_adviceTypes_before_after_throwing_finally_around").call(b.Function.prototype)});


*/
