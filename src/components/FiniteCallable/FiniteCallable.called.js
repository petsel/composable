

composable("components.FiniteCallable_called", function (require, global, internalBaseEnvironment) {


  "use strict";


  var
    Trait, // the "FiniteCallable_called" Trait Module.


    Number  = global.Number,
    Math    = global.Math,


    noop        = internalBaseEnvironment.methods.noop,
    array_from  = internalBaseEnvironment.helpers.makeArray,
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


    enrichCallableArguments = function (args, fct, count, amount, target) {
      return (
        (args = array_from(args))

        && args.push({callable: fct, count: count, amount: amount, target: target})
        && args
      );
    },


    createCallableTimes = function (amount, target) {
      return (function (fct, count, amount, target, UNDEFINED_VALUE) {
        return function () {

          return (
            (amount > count++)

            ? fct.apply(target, enrichCallableArguments(arguments, fct, count, amount, target))
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


- Simple          -   687 byte
composable("components.FiniteCallable_called",function(b,c,d){var g=c.Number;b=c.Math;var h=d.methods.noop,k=d.helpers.makeArray,l=d.introspective.isFunction,m=c.isFinite,n=b.floor,p=b.pow(-2,53),q=b.pow(2,53),r=function(a){return m(a=g(a))&&(a=n(a))<=q&&a>=p?a:void 0},u=function(a,s,b,t,e){return(a=k(a))&&a.push({callable:s,count:b,amount:t,target:e})&&a},f=function(a,b){return function(a,b,e,c,d){return function(){return e>b++?a.apply(c,u(arguments,a,b,e,c)):d}}(l(this)&&this||h,0,r(a),b||void 0!==b&&null!==b?b:null)},v=function(a){return f.call(this,2,a)},w=function(a){return f.call(this,1,a)};return function(){this.callableTimes=f;this.callableTwice=v;this.callableOnce=w}});


*/
