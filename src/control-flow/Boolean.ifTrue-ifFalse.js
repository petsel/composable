/**
 *  [Boolean.ifTrue] / [Boolean.ifFalse] are a fun implementation of [http://en.wikipedia.org/wiki/Smalltalk Smalltalks]
 *  [ifTrue] / [ifFalse] - [http://en.wikipedia.org/wiki/Smalltalk#Control_structures control structure]; it is nothing
 *  one would really desire in JavaScript unless one's looking for an alternative to its native "if ... else" statement
 *  and has deeply fallen in love with using function expressions all along.
 *
 *  links:
 *
 *    EN: [http://en.wikipedia.org/wiki/Smalltalk#Control_structures]
 *    DE: [http://de.wikipedia.org/wiki/Smalltalk-80_(Programmiersprache)#IF-Anweisung]
 */


composable("control_flow.Boolean_ifTrue_ifFalse", function (require, global) {


  "use strict";


  require("environment_extended_introspective_core");


  var
    environment               = require("environment"),
    environment_introspective = environment.introspective,


    Boolean           = global.Boolean,
    boolean_prototype = Boolean.prototype,


    isFunction  = environment_introspective.isFunction,
    baseValueOf = environment_introspective.baseValueOf,

  //getBaseValueOf = function () {
  //  return ((type == null) ? type : expose_internal_value.call(type).valueOf());
  //},
  //expose_internal_value = global.Object.prototype.valueOf,


    getSanitizedTarget = function (target) {
      return (target == null) ? null : target;
    //return ((target != null) && target) || null;
    }
  ;


  boolean_prototype.ifTrue = function (fct, target) {
    var
    //isTrue = this.valueOf()
      isTrue = baseValueOf(this)
    ;
    if (isTrue && isFunction(fct)) {
      fct.call(getSanitizedTarget(target));
    }
    return isTrue;
  };


  boolean_prototype.ifFalse = function (fct, target) {
    var
    //isTrue = this.valueOf()
      isTrue = baseValueOf(this)
    ;
    if (!isTrue && isFunction(fct)) {
      fct.call(getSanitizedTarget(target));
    }
    return isTrue;
  };


//return Boolean;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   360 byte
composable("control_flow.Boolean_ifTrue_ifFalse",function(d,k){d("environment_extended_introspective_core");var e=d("environment").introspective,f=k.Boolean.prototype,g=e.isFunction,h=e.baseValueOf;f.ifTrue=function(a,b){var c=h(this);c&&g(a)&&a.call(null==b?null:b);return c};f.ifFalse=function(a,b){var c=h(this);!c&&g(a)&&a.call(null==b?null:b);return c}});


*/





/*

var print = ((typeof print == "function") && print) || function () {
  console.log.call(console, arguments);
};


print((7 < 6).ifTrue(function () {
  print("(7 < 6) ... is true.");
}).ifFalse(function () {
  print("(7 < 6) ... is false.");
}).ifTrue(function () {
  print("(7 < 6) ... is true.");
}).ifFalse(function () {
  print("(7 < 6) ... is false.");
}));

print((7 > 6).ifTrue(function () {
  print("(7 > 6) ... is true.");
}).ifFalse(function () {
  print("(7 > 6) ... is false.");
}).ifTrue(function () {
  print("(7 > 6) ... is true.");
}).ifFalse(function () {
  print("(7 > 6) ... is false.");
}));

*/
