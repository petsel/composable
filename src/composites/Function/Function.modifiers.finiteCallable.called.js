

composable("composites.Function_modifiers_finiteCallable_called", function (require, global/*, internalBaseEnvironment*/) {

  "use strict";

  require("components.FiniteCallable_called").call(global.Function.prototype);

//return global.Function;

});



/*

  quick test

*/ /*

var fct = (function (msg, called) {console.log((msg + " - callableTimes(3)"), called);}).callableTimes(3);
fct("foo"); // "foo - callableTimes(3)", Object {...}
fct("foo"); // "foo - callableTimes(3)", Object {...}
fct("foo"); // "foo - callableTimes(3)", Object {...}
fct("foo"); // undefined

var fct = (function (msg, called) {console.log((msg + " - callableTwice()"), called);}).callableTwice();
fct("bar"); // "bar - callableTwice()", Object {...}
fct("bar"); // "bar - callableTwice()", Object {...}
fct("bar"); // undefined

var fct = (function (msg, called) {console.log((msg + " - callableOnce()"), called);}).callableOnce();
fct("baz"); // "baz - callableOnce()", Object {...}
fct("baz"); // undefined

*/



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   146 byte
composable("composites.Function_modifiers_finiteCallable_called",function(a,b){a("components.FiniteCallable_called").call(b.Function.prototype)});


- Simple          -    95 byte
composable("",function(a,b){a("components.FiniteCallable_called").call(b.Function.prototype)});



*/
