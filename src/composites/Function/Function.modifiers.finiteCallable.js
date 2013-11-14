

composable("composites.Function_modifiers_finiteCallable", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.FiniteCallable").call(global.Function.prototype);

//return global.Function;

});



/*

  quick test

*/ /*

var fct = (function (msg) {console.log(msg + " - callableTimes(3)");}).callableTimes(3);
fct("foo"); // "foo - callableTimes(3)"
fct("foo"); // "foo - callableTimes(3)"
fct("foo"); // "foo - callableTimes(3)"
fct("foo"); // undefined

var fct = (function (msg) {console.log(msg + " - callableTwice()");}).callableTwice();
fct("bar"); // "bar - callableTwice()"
fct("bar"); // "bar - callableTwice()"
fct("bar"); // undefined

var fct = (function (msg) {console.log(msg + " - callableOnce()");}).callableOnce();
fct("baz"); // "baz - callableOnce()"
fct("baz"); // undefined

*/



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   132 byte
composable("composites.Function_modifiers_finiteCallable",function(a,b){a("components.FiniteCallable").call(b.Function.prototype)});


- Simple          -    88 byte
composable("",function(a,b){a("components.FiniteCallable").call(b.Function.prototype)});


*/
