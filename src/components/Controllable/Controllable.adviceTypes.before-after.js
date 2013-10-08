

composable("components.Controllable_adviceTypes_before_after", function (require, global, internalBaseEnvironment) {


  "use strict"; // @TODO - merge the final change into other branches of this type detection module.


  /*
   *  all additional functionality this module needs
   *  is covered already by the [internalBaseEnvironment]
   *  of the "composable :: core"
   */


  var
    Trait, // the "Controllable_adviceTypes_before_after" Trait Module.


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
    }
  ;


  Trait = function () {
    /**
     *  implementing the "Controllable_adviceTypes_before_after" Trait Module.
     */
    var controllable = this;

    controllable.before = before;
    controllable.after  = after/*Returning*/;
  };


  return Trait;


});



/*


  [http://closure-compiler.appspot.com/home]


- Simple          -   534 byte
composable("components.Controllable_adviceTypes_before_after",function(n,p,g){var c=g.introspective.isFunction,h=function(a,d,b,c){return function(){var f=arguments;d.call(b,f,c);return a.apply(b,f)}},k=function(a,d,b,c){return function(){var f,e=arguments;f=a.apply(b,e);d.call(b,f,e,c);return f}},e=function(a){return a||void 0!==a&&null!==a?a:null},l=function(a,d,b){return c(this)&&c(a)&&h(this,a,e(d),e(b))||this},m=function(a,d,b){return c(this)&&c(a)&&k(this,a,e(d),e(b))||this};return function(){this.before=l;this.after=m}});


*/
