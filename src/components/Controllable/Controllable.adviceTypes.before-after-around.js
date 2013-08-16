

composable("components.Controllable_adviceTypes_before_after_around", function (require, global, environment) {


  "use strict";


  require("components.Introspective_isFunction_isCallable");


  var
    Trait, // the "Controllable_adviceTypes_before_after_around" Trait Module.


    env_introspective = environment.introspective,


    isFunction = env_introspective.isFunction,
    isCallable = env_introspective.isCallable,


    NULL_VALUE = null,
    UNDEFINED_VALUE,


    makeModificationBefore = function (proceed, behavior, target, joinpoint) {          // before
      return function () {
        var args = arguments;

        behavior.call(target, args, joinpoint);
        return proceed.apply(target, args);
      };
    },
    makeModificationAfterFinally = function (proceed, behavior, target, joinpoint) {    // after
      return function () {
        var ret, args = arguments;
        try {
          ret = proceed.apply(target, args);
        } finally {
          behavior.call(target, args, ret, joinpoint);  // TODO - think about >>behavior.call(target, ret, args, joinpoint);<<
        }
        return ret;
      };
    },
    makeModificationAround = function (proceed, behavior, target, joinpoint) {          // around
      return function () {

      //return behavior.call(target, arguments, proceed, behavior, target, joinpoint);
        return behavior.call(target, proceed, behavior, arguments, target, joinpoint);  // TODO - think about >>behavior.call(target, target, proceed, behavior, arguments, joinpoint);<<
      };
    },


    getSanitizedTarget = function (target) {
      return (!target && ((target === UNDEFINED_VALUE) || (target === NULL_VALUE))) ? NULL_VALUE : target;
    },


    before = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedAfter = this;
      return ((

        isFunction(proceedAfter) && isFunction(adviceHandler)
        && makeModificationBefore(proceedAfter, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedAfter);
    },
    after/*Finally*/ = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedBefore = this;
      return ((

        isFunction(proceedBefore) && isFunction(adviceHandler)
        && makeModificationAfterFinally(proceedBefore, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedBefore);
    },
    around = function (adviceHandler/*:function*/, target/*:object(should not be optional)*/, joinpoint/*:Joinpoint(optional)*/) {
      var proceedEnclosed = this;
      return ((

        isCallable(proceedEnclosed) && isFunction(adviceHandler)
        && makeModificationAround(proceedEnclosed, adviceHandler, getSanitizedTarget(target), getSanitizedTarget(joinpoint))

      ) || proceedEnclosed);
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_before_after_around" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Finally*/;
    controllable.around         = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   770 byte
composable("components.Controllable_adviceTypes_before_after_around",function(k,r,l){k("components.Introspective_isFunction_isCallable");k=l.introspective;var e=k.isFunction,m=k.isCallable,c=function(b){return!b&&(void 0===b||null===b)?null:b},n=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a=arguments;b.call(d,a,j);return h.apply(d,a)}}return a||this},p=function(b,f,g){var a;if(a=e(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){var a,c=arguments;try{a=h.apply(d,c)}finally{b.call(d,c,a,j)}return a}}return a||this},q=function(b,f,g){var a;if(a=m(this))if(a=e(b)){var h=this,d=c(f),j=c(g);a=function(){return b.call(d,h,b,arguments,d,j)}}return a||this};return function(){this.before=n;this.after=p;this.around=q}});


*/
