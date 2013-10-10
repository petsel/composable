

composable("components.Controllable_adviceTypes_before_after_around", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Controllable_adviceTypes_before_after_around" Trait Module.


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
     *  implementing the "Controllable_adviceTypes_before_after_around" Trait Module.
     */
    var controllable = this;

    controllable.before         = before;
    controllable.after          = after/*Returning*/;
    controllable.around         = around;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   695 byte
composable("components.Controllable_adviceTypes_before_after_around",function(q,r,g){var b=g.introspective.isFunction,h=function(a,e,c,b){return function(){var d=arguments;e.call(c,d,b);return a.apply(c,d)}},k=function(a,e,c,d){return function(){var b,f=arguments;b=a.apply(c,f);e.call(c,b,f,d);return b}},l=function(a,b,c,d){return function(){return b.call(c,a,b,arguments,d)}},d=function(a){return a||void 0!==a&&null!==a?a:null},m=function(a,e,c){return b(this)&&b(a)&&h(this,a,d(e),d(c))||this},n=function(a,e,c){return b(this)&&b(a)&&k(this,a,d(e),d(c))||this},p=function(a,e,c){return b(this)&&b(a)&&l(this,a,d(e),d(c))||this};return function(){this.before=m;this.after=n;this.around=p}});


*/
