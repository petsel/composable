

composable("components.Iterable_Integer_next_previous_StopIteration", function (require, global/*, environment*/) {


  "use strict";


  var
    Trait,


    Factory = require("entities.IterableFactory"),


    Number  = global.Number,
    Math    = global.Math,


    isFinite  = global.isFinite,
    floor     = Math.floor,

    INTEGER_MINIMUM = Math.pow(-2, 53), //  (Math.pow(-2, 53) - 1) === (Math.pow(-2, 53)) // true // (Math.pow(-2, 53) + 1) === (Math.pow(-2, 53)) // false
    INTEGER_MAXIMUM = Math.pow(2, 53),  //  - see [http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html]
                                        //  - via [http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-to#answer-4375743]
    UNDEFINED_VALUE
  ;


  var
    sanitizeInteger = function (type) {

      return (isFinite(type = Number(type)) && (type <= INTEGER_MAXIMUM) && (type >= INTEGER_MINIMUM)) ? floor(type) : UNDEFINED_VALUE;
    },
    nextInteger = function () {
      var
        currInt = sanitizeInteger(this),
        nextInt = (currInt + 1)
      ;
      //  Math.pow(2, 53) === Math.pow(2, 53)     //  true
      //  Math.pow(2, 53) + 1 === Math.pow(2, 53) //  true
      //  Math.pow(2, 53) + 2 === Math.pow(2, 53) //  false

      return ((isFinite(nextInt) && (nextInt !== currInt)) ? nextInt : UNDEFINED_VALUE);
    },
    previousInteger = function () {
      var
        currInt = sanitizeInteger(this),
        prevInt = (currInt - 1)
      ;
      //  Math.pow(-2, 53) === Math.pow(-2, 53)     //  true
      //  Math.pow(-2, 53) - 1 === Math.pow(-2, 53) //  true
      //  Math.pow(-2, 53) - 2 === Math.pow(-2, 53) //  false

      return ((isFinite(prevInt) && (prevInt !== currInt)) ? prevInt : UNDEFINED_VALUE);
    },
    compare = function (a, b) {return (a - b);}
  //compareTo = function (b) {return (this - b);}
  ;


  Trait = Factory.create({                    // By default this implementation of an iterable trait factory does not
                                              // create [Iterable]s that do stop iterations by throwing [StopIteration].
    next                  : nextInteger,      // Invalid calls on [next] or [previous] just return [undefined] thus preventing
    previous              : previousInteger,  // wrapping each of these calls into rather expensive try...catch statements.
    compare               : compare,

  //compare               : compareTo,
    isThrowStopIteration  : true              // if this flag was set to [true] each call on [next] or [previous] needs to be wrapped into a try...catch block.
  });


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   460 byte
composable("components.Iterable_Integer_next_previous_StopIteration",function(g,c){var h=g("entities.IterableFactory"),j=c.Number,d=c.Math,e=c.isFinite,k=d.floor,l=d.pow(-2,53),m=d.pow(2,53),f=function(a){return e(a=j(a))&&a<=m&&a>=l?k(a):void 0};return h.create({next:function(){var a=f(this),b=a+1;return e(b)&&b!==a?b:void 0},previous:function(){var a=f(this),b=a-1;return e(b)&&b!==a?b:void 0},compare:function(a,b){return a-b},isThrowStopIteration:!0})});


*/
