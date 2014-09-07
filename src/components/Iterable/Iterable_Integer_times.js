

composable("components.Iterable_Integer_times", function (require, global/*, internalBaseEnvironment*/) {


  "use strict";


  var
    environment = require("environment_extended_introspective_core"),


    Mixin,


    Number  = global.Number,
    Math    = global.Math,


    isFinite    = global.isFinite,
    isFunction  = environment.introspective.isFunction,
    isUndefined = environment.introspective.isUndefined,

    math_floor  = Math.floor,


  //INTEGER_MINIMUM = Math.pow(-2, 53), //  (Math.pow(-2, 53) - 1) === (Math.pow(-2, 53)) // true // (Math.pow(-2, 53) + 1) === (Math.pow(-2, 53)) // false
    INTEGER_MAXIMUM = Math.pow(2, 53),  //  - see [http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html]
                                        //  - via [http://stackoverflow.com/questions/307179/what-is-javascripts-max-int-whats-the-highest-integer-value-a-number-can-go-to#answer-4375743]
    NULL_VALUE      = null,
    UNDEFINED_VALUE
  ;


  var
    sanitizePositiveInteger = function (type) {

      return (isFinite(type = Number(type)) && ((type = math_floor(type)) <= INTEGER_MAXIMUM) && (type >= 0)) ? type : UNDEFINED_VALUE;
    },
    sanitizeTarget = function (target) {

      return (!target && (target == NULL_VALUE)) ? NULL_VALUE : target;
    },


    integer_times = function (fct, target) {
      var
        idx   = -1,
        times = sanitizePositiveInteger(this)
        ;
      times   = (!isUndefined(times) && isFunction(fct)) ? times : idx;
      target  = sanitizeTarget(target);

      while (++idx < times) {
        fct.call(target, idx, times, fct, target);
      }
    }
  ;


  Mixin = function () {
    var integer = this;

    integer.times = integer_times;
  };


  return Mixin;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   404 byte
composable("components.Iterable_Integer_times",function(h,a){var f=h("environment_extended_introspective_core"),k=a.Number,g=a.Math,l=a.isFinite,m=f.introspective.isFunction,n=f.introspective.isUndefined,p=g.floor,q=g.pow(2,53),r=function(a,b){var e=-1,c,d=this;c=l(d=k(d))&&(d=p(d))<=q&&0<=d?d:void 0;c=!n(c)&&m(a)?c:e;for(b=b||null!=b?b:null;++e<c;)a.call(b,e,c,a,b)};return function(){this.times=r}});


*/
