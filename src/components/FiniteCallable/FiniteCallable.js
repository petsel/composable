

composable("components.FiniteCallable", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait, // the "FiniteCallable" Trait Module.


    Number  = global.Number,
    Math    = global.Math,


    noop        = internalBaseEnvironment.methods.noop,
    isFunction  = internalBaseEnvironment.introspective.isFunction,


    isFinite    = global.isFinite,

    math_floor  = Math.floor,
    math_pow    = Math.pow,

    INTEGER_MINIMUM = math_pow(-2, 53), //  (Math.pow(-2, 53) - 1) === (Math.pow(-2, 53)) // true // (Math.pow(-2, 53) + 1) === (Math.pow(-2, 53)) // false
    INTEGER_MAXIMUM = math_pow(2, 53),  //  - see [http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html]
                                        //  - via [http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-to#answer-4375743]
    NULL_VALUE = null,
    UNDEFINED_VALUE,


    sanitizeInteger = function (type) {

      return (isFinite(type = Number(type)) && ((type = math_floor(type)) <= INTEGER_MAXIMUM) && (type >= INTEGER_MINIMUM)) ? type : UNDEFINED_VALUE;
    },
    sanitizeTarget = function (target) {

      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    createCallableTimes = function (amount, target) {
      return (function (fct, count, amount, target, UNDEFINED_VALUE) {
        return function () {

          return (
            (amount > count++)

            ? fct.apply(target, arguments)
            : UNDEFINED_VALUE
          );
        };
      }(((isFunction(this) && this) || noop), 0, sanitizeInteger(amount), sanitizeTarget(target)));
    },
    createCallableTriply = function (target) {

      return createCallableTimes.call(this, 3, target);
    },
    createCallableTwice = function (target) {

      return createCallableTimes.call(this, 2, target);
    },
    createCallableOnce = function (target) {

      return createCallableTimes.call(this, 1, target);
    }
  ;


  Trait = function () { // Pure Trait.
    var finiteCallable = this;

    finiteCallable.callableTimes  = createCallableTimes;
    finiteCallable.callableTriply = createCallableTriply;
  //finiteCallable.callableThrice = createCallableTriply;
    finiteCallable.callableTwice  = createCallableTwice;
    finiteCallable.callableOnce   = createCallableOnce;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   558 byte
composable("components.FiniteCallable",function(b,c,e){var f=c.Number;b=c.Math;var g=e.methods.noop,h=e.introspective.isFunction,k=c.isFinite,l=b.floor,m=b.pow(-2,53),n=b.pow(2,53),p=function(a){return k(a=f(a))&&(a=l(a))<=n&&a>=m?a:void 0},d=function(a,b){return function(a,b,c,d,e){return function(){return c>b++?a.apply(d,arguments):e}}(h(this)&&this||g,0,p(a),b||void 0!==b&&null!==b?b:null)},q=function(a){return d.call(this,2,a)},r=function(a){return d.call(this,1,a)};return function(){this.callableTimes=d;this.callableTwice=q;this.callableOnce=r}});


*/
