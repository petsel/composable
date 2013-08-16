

composable("components.Controllable_adviceTypes_afterReturning_afterThrowing", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Controllable_adviceTypes_afterReturning_afterThrowing" Trait Module.


    isFunction = environment.introspective.isFunction,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationAfterReturning = function (proceed, behavior, target, joinpoint) {  // afterReturning
      return function () {
        var ret, args = arguments;

        ret = proceed.apply(target, args);
        behavior.call(target, args, ret, joinpoint);    // TODO - think about >>behavior.call(target, ret, args, joinpoint);<<

        return ret;
      };
    },
    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var args = arguments;
        try {
          proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, args, exc, joinpoint);  // TODO - think about >>behavior.call(target, exc, args, joinpoint);<<
          throw exc;
        }
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    afterReturning = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterReturning(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    afterThrowing = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_afterReturning_afterThrowing" Trait Module.
     */
    var controllable = this;

    controllable.afterReturning = afterReturning;
    controllable.afterThrowing  = afterThrowing;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   630 byte
composable("components.Controllable_adviceTypes_afterReturning_afterThrowing",function(l,q,m){l("components.Introspective_isFunction_isCallable");var e=m.introspective.isFunction,f=function(b){return!b&&(void 0===b||null===b)?null:b},n=function(b,g,h){var a;if(a=e(this))if(a=e(b)){var j=this,c=f(g),k=f(h);a=function(){var a,d=arguments;a=j.apply(c,d);b.call(c,d,a,k);return a}}return a||this},p=function(b,g,h){var a;if(a=e(this))if(a=e(b)){var j=this,c=f(g),k=f(h);a=function(){var a=arguments;try{j.apply(c,a)}catch(d){throw b.call(c,a,d,k),d;}}}return a||this};return function(){this.afterReturning=n;this.afterThrowing=p}});


*/
