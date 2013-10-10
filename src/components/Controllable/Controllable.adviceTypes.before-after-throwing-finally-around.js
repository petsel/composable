

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
    makeModificationAfterReturning = function (proceed, behavior, target, joinpoint) {  // after - implemented as afterReturning
      return function () {
        var ret, args = arguments;

        ret = proceed.apply(target, args);
        behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);

        return ret;
      };
    },
    makeModificationAfterThrowing = function (proceed, behavior, target, joinpoint) {   // afterThrowing
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          behavior.call(target, exc, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);
        //throw exc;
        }
        return ret;
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // afterFinally
      return function () {
        var ret, err, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } catch (exc) {
          err = exc;
        } // finally { ... }
        ret = (err || ret);
        behavior.call(target, ret, args, joinpoint/*provided by and passed only from within aspect oriented systems*/);

        return ret;
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
    afterThrowing = function (adviceHandler/*:function*/, target/*:object(optional, but recommended to be applied)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        //isCallable(proceedBefore) && isCallable(adviceHandler)
        isFunction(proceedBefore) && isFunction(adviceHandler)
          && makeModificationAfterThrowing(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

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
    controllable.afterThrowing  = afterThrowing;
    controllable.afterFinally   = afterFinally;
    controllable.around         = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -  1122 byte
composable("components.Controllable_adviceTypes_before_after_throwing_finally_around",function(w,x,h){var d=h.introspective.isFunction,l=function(a,e,c,d){return function(){var f=arguments;e.call(c,f,d);return a.apply(c,f)}},m=function(a,e,c,d){return function(){var f,b=arguments;f=a.apply(c,b);e.call(c,f,b,d);return f}},n=function(a,e,c,d){return function(){var f,b=arguments;try{f=a.apply(c,b)}catch(g){e.call(c,g,b,d)}return f}},p=function(a,e,c,d){return function(){var b,k,g=arguments;try{b=a.apply(c,g)}catch(h){k=h}b=k||b;e.call(c,b,g,d);return b}},q=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},b=function(a){return a||void 0!==a&&null!==a?a:null},r=function(a,e,c){return d(this)&&d(a)&&l(this,a,b(e),b(c))||this},s=function(a,e,c){return d(this)&&d(a)&&m(this,a,b(e),b(c))||this},t=function(a,e,c){return d(this)&&d(a)&&n(this,a,b(e),b(c))||this},u=function(a,e,c){return d(this)&&d(a)&&p(this,a,b(e),b(c))||this},v=function(a,e,c){return d(this)&&d(a)&&q(this,a,b(e),b(c))||this};return function(){this.before=r;this.after=s;this.afterThrowing=t;this.afterFinally=u;this.around=v}});


*/
