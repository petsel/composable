

composable("components.Controllable_adviceTypes_before_after_throwing_finally_around", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Controllable_adviceTypes_before_after_throwing_finally_around" Trait Module.


    env_introspective = internalBaseEnvironment.introspective,


    isFunction = env_introspective.isFunction,
  //isCallable = env_introspective.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationBefore = function (proceed, behavior, target, joinpoint) {          // before
      return function () {
        var args = arguments;

        behavior.call(target, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
        return proceed.apply(target, args);
      };
    },
    makeModificationAfterReturning = function (proceed, behavior, target, joinpoint) {  // after
      return function () {
        var ret, args = arguments;

        ret = proceed.apply(target, args);
        behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);

        return ret;
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // afterFinally
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } finally {
          behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
        }
        return ret;
      };
    },
    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var args = arguments;
        try {
          proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, exc, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
          throw exc;
        }
      };
    },
    makeModificationAround = function (proceed, behavior, target, joinpoint) {          // around
      return function () {
        return behavior.call(target, proceed, behavior, arguments, joinpoint/*provided by and passed only from within aspect oriented systems*/);
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    before = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedAfter = this;
      return ((

      //isCallable(proceedAfter) && isCallable(adviceHandler)
        isFunction(proceedAfter) && isFunction(adviceHandler)
        && makeModificationBefore(proceedAfter, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedAfter);
    },
    after/*Returning*/ = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterReturning(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    afterFinally = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    afterThrowing = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

      //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    around = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedEnclosed = this;
      return ((

      //isCallable(proceedEnclosed) && isCallable(adviceHandler)
        isFunction(proceedEnclosed) && isFunction(adviceHandler)
        && makeModificationAround(proceedEnclosed, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedEnclosed);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_before_after_throwing_finally_around" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Returning*/;
    controllable.afterFinally   = afterFinally;
    controllable.afterThrowing  = afterThrowing;
    controllable.around         = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -  1105 byte
composable("components.Controllable_adviceTypes_before_after_throwing_finally_around",function(v,w,h){var c=h.introspective.isFunction,k=function(a,d,b,c){return function(){var f=arguments;d.call(b,f,c);return a.apply(b,f)}},l=function(a,d,b,c){return function(){var f,e=arguments;f=a.apply(b,e);d.call(b,f,e,c);return f}},m=function(a,d,b,c){return function(){var e,g=arguments;try{e=a.apply(b,g)}finally{d.call(b,e,g,c)}return e}},n=function(a,d,b,e){return function(){var c=arguments;try{a.apply(b,c)}catch(g){throw d.call(b,g,c,e),g;}}},p=function(a,d,b,c){return function(){return d.call(b,a,d,arguments,c)}},e=function(a){return a||void 0!==a&&null!==a?a:null},q=function(a,d,b){return c(this)&&c(a)&&k(this,a,e(d),e(b))||this},r=function(a,d,b){return c(this)&&c(a)&&l(this,a,e(d),e(b))||this},s=function(a,d,b){return c(this)&&c(a)&&m(this,a,e(d),e(b))||this},t=function(a,d,b){return c(this)&&c(a)&&n(this,a,e(d),e(b))||this},u=function(a,d,b){return c(this)&&c(a)&&p(this,a,e(d),e(b))||this};return function(){this.before=q;this.after=r;this.afterFinally=s;this.afterThrowing=t;this.around=u}});


*/
