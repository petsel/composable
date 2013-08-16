

composable("components.Iterable_Character_next", function (require, global/*, environment*/) {


  "use strict";


  var
    Trait,


    Factory = require("entities.IterableFactory"),


    String = global.String,


    string_fromCharCode = String.fromCharCode,

    UNDEFINED_VALUE
  ;


  var
    nextCharacter = function () {
      var
        currVal = ("" + this),
        nextVal
      ;
      if (currVal.length == 1) { // this definitely is a character.
        /**
         *  as for >> (currVal === "") << ...
         *  ... there is nothing like a "next" character
         *  that could be a successor of an empty string.
         */
        nextVal = string_fromCharCode(currVal.charCodeAt(0) + 1);
        /*
         *  either "nextVal" gets assigned a valid character ...
         *  ... or assignement of "nextVal" falls back again to the [undefined] value.
         */
        nextVal = ((nextVal !== "") && (nextVal !== currVal)) ? nextVal : UNDEFINED_VALUE;
      }
      return nextVal;
    },
    compare = function (a, b) {return (((a < b) && -1) || ((a > b) && 1) || 0);}
  //compareTo = function (b) {return (((this < b) && -1) || ((this > b) && 1) || 0);}
  ;


  Trait = Factory.create({                      // By default this implementation of an iterable trait factory does not
                                                // create [Iterable]s that do stop iterations by throwing [StopIteration].
    next                  : nextCharacter,      // Invalid calls on [next] or [previous] just return [undefined] thus preventing
  //previous              : previousCharacter,  // wrapping each of these calls into rather expensive try...catch statements.
    compare               : compare

  //compare               : compareTo,
  //isThrowStopIteration  : true                // if this flag was set to [true] each call on [next] or [previous] needs to be wrapped into a try...catch block.
  });


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   297 byte
composable("components.Iterable_Character_next",function(c,d){var e=c("entities.IterableFactory"),f=d.String.fromCharCode;return e.create({next:function(){var b=""+this,a;1==b.length&&(a=f(b.charCodeAt(0)+1),a=""!==a&&a!==b?a:void 0);return a},compare:function(b,a){return b<a&&-1||b>a&&1||0}})});


*/
