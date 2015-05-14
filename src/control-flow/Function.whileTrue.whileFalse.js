/**
 *  [Function.whileTrue|whileFalse] is the last JavaScript implementation of Smalltalk inspired
 *  control structures like [Boolean.ifTrue|ifFalse], [Number.times] or [Number.to( ... ).each]
 *  that recently have been committed to refactory.org.
 *
 *  Its right to exist might be more of academic nature. But here it is.
 *
 *  links:
 *
 *    DE: [http://de.wikipedia.org/wiki/Smalltalk-80_(Programmiersprache)#Kontrollstrukturen]
 */


/**
 *  [ "ein Block, der ein boole'sches Objekt zurückgibt" ] whileTrue.
 *  [ "ein Block, der ein boole'sches Objekt zurückgibt" ] whileFalse.
 *  [ "ein Block, der ein boole'sches Objekt zurückgibt" ] whileTrue: [ "Block mit Schleifenrumpf" ].
 *  [ "ein Block, der ein boole'sches Objekt zurückgibt" ] whileFalse: [ "Block mit Schleifenrumpf" ]
 *
 *
 *  Function.prototype.whileFalse = (function () {});
 *
 *  (function () {}).whileTrue();
 *  (function () {}).whileFalse();
 *  (function () {}).whileTrue().ifFalse(function () {});
 *  (function () {}).whileFalse().ifTrue(function () {});
 */


composable("control_flow.Function_whileTrue_whileFalse", function (require, global) {


  "use strict";


  require("environment_extended_introspective_core");


  var
    environment               = require("environment"),

    environment_introspective = environment.introspective,
    environment_helpers       = environment.helpers,


    Array               = global.Array,

    Function            = global.Function,
    function_prototype  = Function.prototype,


    isFunction = environment_introspective.isFunction,

    array_from = (isFunction(Array.from) && Array.from) || environment_helpers.makeArray
  ;


  function_prototype.whileTrue = function (/*fct:Function[, arg01:Object[, arg02:Object]]*/) {
    var
      args          = array_from(arguments),
      fctStatement  = args.shift(0),
      fctCondition  = this
    ;
    if (isFunction(fctStatement) && isFunction(fctCondition)) {

      while (fctCondition.apply(null, args)) {
      //args = fctStatement.apply(null, args);          // this already is sufficient and every browser can deal with it ...
        args = (fctStatement.apply(null, args) || []);  // ... except for msie that at this point, for whatever reason, desires an object.
      }
    }
  //return false; // - nice to have if to be followed by a functional [Boolean.ifFalse] expression.
    return null;  // - but that's what the Smalltalk specification states.
  };


  function_prototype.whileFalse = function (/*fct:Function[, arg01:Object[, arg02:Object]]*/) {
    var
      args          = array_from(arguments),
      fctStatement  = args.shift(0),
      fctCondition  = this
    ;
    if (isFunction(fctStatement) && isFunction(fctCondition)) {

      while (!fctCondition.apply(null, args)) {
      //args = fctStatement.apply(null, args);          // this already is sufficient and every browser can deal with it ...
        args = (fctStatement.apply(null, args) || []);  // ... except for msie that at this point, for whatever reason, desires an object.
      }
    }
  //return false; // - nice to have if to be followed by a functional [Boolean.ifFalse] expression.
    return null;  // - but that's what the Smalltalk specification states.
  };


//return Function;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   513 byte
composable("control_flow.Function_whileTrue_whileFalse",function(d,e){d("environment_extended_introspective_core");var f=d("environment"),l=f.helpers,g=e.Array,h=e.Function.prototype,b=f.introspective.isFunction,k=b(g.from)&&g.from||l.makeArray;h.whileTrue=function(){var a=k(arguments),c=a.shift(0);if(b(c)&&b(this))for(;this.apply(null,a);)a=c.apply(null,a)||[];return null};h.whileFalse=function(){var a=k(arguments),c=a.shift(0);if(b(c)&&b(this))for(;!this.apply(null,a);)a=c.apply(null,a)||[];return null}});


*/





/*

var print = ((typeof print == "function") && print) || function () {
  console.log.call(console, arguments);
};


// 2 simple examples both operating at variables of an outer scope:

var arr = [], maxLength = 9;

print((function () { // "conditional" part

  return (arr.length >= maxLength);

}).whileFalse(function () { // "statement" complement

  arr.push(Math.floor(Math.random() * maxLength));
  print("currLength : " + arr.length + " - arr : " + arr);

}));
print((function () { // "conditional" part

  return (arr.length < maxLength);

}).whileTrue(function () { // "statement" complement

  arr.push(Math.floor(Math.random() * maxLength));
  print("currLength : " + arr.length + " - arr : " + arr);

}));



// more advanced examples - each does provide its conditional start parameters locally to itself and passes them around:

print((function (x, y) { // "conditional" part

  return ((x-y) > 0);

}).whileTrue((function (x, y) { // "statement" complement

  print("x : " + x + " - y : " + y);
  ++y;

  //the current state of all assigned parameters needs to be returned to this "statement"s "conditional" complement as ordered list.
  return [x, y];

}), 5, 2)); // start parameters [x] and [y] for both functions the "conditional" part and its "statement" complement.


print((function (x, y) { // "conditional" part

  return ((x-y) > 0);

}).whileFalse((function (x, y) { // "statement" complement

  print("x : " + x + " - y : " + y);
  ++y;

  //the current state of all assigned parameters needs to be returned to this "statement"s "conditional" complement as ordered list.
  return [x, y];

}), 5, 2)); // start parameters [x] and [y] for both functions the "conditional" part and its "statement" complement.


*/
